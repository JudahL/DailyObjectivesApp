import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { turnOffModal } from '../actions/modalActions';
import EditObjectiveModal from './EditObjectiveModal';
import '../componentsCss/Modal.css';


class Modal extends PureComponent {
  constructor() {
    super();

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  // Specify what content to display based on the modal type
  getContentComponent() {
    const { type } = this.props;

    switch (type) {
      case 'Add Objective':
        return <EditObjectiveModal type={type} />;
      case 'Edit Objective':
        return <EditObjectiveModal type={type} />;
      default:
        return null;
    }
  }

  handleOnClick(e) {
    // When the background is clicked: toggle the modal off
    if (e.target.className === 'Modal-background') this.props.turnOffModal();
  }

  render() {
    const { type, isDisplayingModal } = this.props;

    if (isDisplayingModal) {
      return (
        <div className="Modal-background" onClick={this.handleOnClick} role="presentation">
          <div className="Modal-container">
            <h1 className="Modal-title">
              {type}
            </h1>
            {this.getContentComponent()}
          </div>
        </div>
      );
    }

    // if isDisplayingModal is false we shouldn't render anything
    return null;
  }
}

Modal.propTypes = {
  type: PropTypes.string.isRequired,
  isDisplayingModal: PropTypes.bool.isRequired,
  turnOffModal: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    type: state.getIn(['modal', 'type']),
    isDisplayingModal: state.getIn(['modal', 'isDisplayingModal']),
  };
}

export default connect(mapStateToProps, { turnOffModal })(Modal);
