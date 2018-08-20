import React, { Component } from 'react';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addObjective, updateObjective, removeObjective } from '../actions/objectivesActions';
import { turnOffModal } from '../actions/modalActions';
import ColourPicker from './ColourPicker';


class EditObjectiveModal extends Component {
  constructor() {
    super();

    this.handleAddObjective = this.handleAddObjective.bind(this);
    this.handleEditObjective = this.handleEditObjective.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleColourSelectChange = this.handleColourSelectChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.turnOffModal = this.turnOffModal.bind(this);

    this.state = {
      description: '',
      colour: 'green',
    };
  }

  componentDidMount() {
    const { currentlySelectedObjective, type } = this.props;

    // Provide the selected objective information to the local state
    // if we are editing an existing objective, else reset the state to default
    if (currentlySelectedObjective && type === 'Edit Objective') {
      this.setState({
        description: currentlySelectedObjective.get('text'),
        colour: currentlySelectedObjective.get('colour'),
      });
    } else {
      this.resetState();
    }
  }

  getAddNewButtons() {
    return (
      <div>
        <button type="button" className="Modal-button" modalbuttonrole="submit" onClick={this.handleAddObjective}>
          Add Objective
        </button>
        <button type="button" className="Modal-button" modalbuttonrole="cancel" onClick={this.turnOffModal}>
          Cancel
        </button>
      </div>
    );
  }

  getEditButtons() {
    return (
      <div>
        <button type="button" className="Modal-button" modalbuttonrole="submit" onClick={this.handleEditObjective}>
          Confirm Changes
        </button>
        <button type="button" className="Modal-button" modalbuttonrole="delete" onClick={this.handleDelete}>
          Delete Objective
        </button>
        <button type="button" className="Modal-button" modalbuttonrole="cancel" onClick={this.turnOffModal}>
          Cancel
        </button>
      </div>
    );
  }

  handleAddObjective(e) {
    e.preventDefault();

    const { addObjective: addObjectiveFunc } = this.props;
    const { description, colour: newColour } = this.state;

    // Dispatch 'addObjective' action that will attempt to
    // add a new objective with the given info to the database
    // and returns the new objective to the reducer if successful
    addObjectiveFunc({
      text: description,
      colour: newColour,
      isChecked: false,
    });

    this.turnOffModal();
  }

  handleEditObjective(e) {
    e.preventDefault();

    const {
      updateObjective: updateObjectiveFunc,
      currentlySelectedObjectiveIndex,
      currentlySelectedObjective,
    } = this.props;
    const { description, colour: newColour } = this.state;

    // Dispatch 'updateObjective' action that will attempt to
    // update the specified objective on the database with the provided info
    // and returns the updated objective to the reducer if successful
    updateObjectiveFunc(
      currentlySelectedObjectiveIndex,
      currentlySelectedObjective.get('_id'),
      {
        text: description,
        colour: newColour,
      },
    );

    this.turnOffModal();
  }

  handleColourSelectChange(newColour) {
    this.setState({ colour: newColour });
  }

  handleDescriptionChange(desc) {
    const { value } = desc.target;
    if (value.length <= 40) this.setState({ description: desc.target.value });
  }

  handleDelete() {
    const { removeObjective: removeObjectiveFunc, currentlySelectedObjective } = this.props;
    removeObjectiveFunc(currentlySelectedObjective.get('_id'));
    this.turnOffModal();
  }

  resetState() {
    this.setState({ description: '', colour: 'green' });
  }

  turnOffModal() {
    this.props.turnOffModal();
  }

  render() {
    const { type } = this.props;
    const { description, colour } = this.state;

    return (
      <React.Fragment>
        <h2 className="Modal-subtitle">
          Description
          <p className="Modal-additionalInfo">
            (Max 40 characters)
          </p>
        </h2>
        <input type="text" className="Modal-text-input" value={description} onChange={this.handleDescriptionChange} />
        <h2 className="Modal-subtitle">
          Colour
        </h2>
        <ColourPicker handleColourSelectChange={this.handleColourSelectChange} colour={colour} />
        {/* Display correct button layout depending on if we are editing or adding an objective */}
        {type === 'Edit Objective'
          ? this.getEditButtons()
          : this.getAddNewButtons()
        }
      </React.Fragment>
    );
  }
}

EditObjectiveModal.propTypes = {
  addObjective: PropTypes.func.isRequired,
  updateObjective: PropTypes.func.isRequired,
  removeObjective: PropTypes.func.isRequired,
  turnOffModal: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  currentlySelectedObjective: PropTypes.instanceOf(Map).isRequired,
  currentlySelectedObjectiveIndex: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    currentlySelectedObjective: state.getIn(['objectives', 'list', state.getIn(['objectives', 'currentlySelectedIndex'])]) || Map({}),
    currentlySelectedObjectiveIndex: state.getIn(['objectives', 'currentlySelectedIndex']),
  };
}

export default connect(
  mapStateToProps,
  {
    addObjective,
    updateObjective,
    removeObjective,
    turnOffModal,
  },
)(EditObjectiveModal);
