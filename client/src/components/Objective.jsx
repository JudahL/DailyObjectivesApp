import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import '../componentsCss/Objective.css';

class Objective extends PureComponent {
  constructor() {
    super();

    this.handleToggleCompleted = this.handleToggleCompleted.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleToggleCompleted() {
    const {
      isChecked,
      markObjective,
      objectiveIndex,
      objectiveId,
    } = this.props;

    if (isChecked !== null) {
      markObjective(objectiveIndex, objectiveId, !isChecked);
    } else {
      markObjective(objectiveIndex, objectiveId, true);
    }
  }

  handleRemove() {
    const { removeObjective, objectiveId } = this.props;
    removeObjective(objectiveId);
  }

  handleOnClick(e) {
    e.preventDefault();

    if (e.target.className === 'Objective-container'
      || e.target.className === 'Objective-title') {
      const { turnOnModal, selectObjective, objectiveIndex } = this.props;
      turnOnModal('Edit Objective');
      selectObjective(objectiveIndex);
    }
  }

  render() {
    const { colour, text, isChecked } = this.props;

    return (
      <div className="Objective">
        <div className="Objective-container" onClick={this.handleOnClick} role="button">
          <div className="Objective-colour" colour={colour} />
          <h3 className="Objective-title">
            {text}
          </h3>
          <div className="Objective-completed-container">
            <button type="button" className="Objective-completed-button" onClick={this.handleToggleCompleted}>
              <div className="Objective-completed-check" colour={isChecked ? colour : 'lightGrey'} />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Objective.propTypes = {
  objectiveIndex: PropTypes.number.isRequired,
  objectiveId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  colour: PropTypes.string.isRequired,
  markObjective: PropTypes.func.isRequired,
  removeObjective: PropTypes.func.isRequired,
  selectObjective: PropTypes.func.isRequired,
  turnOnModal: PropTypes.func.isRequired,
};

export default Objective;
