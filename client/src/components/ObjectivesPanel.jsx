import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ObjectivesListView from './ObjectivesListView';
import { turnOnModal } from '../actions/modalActions';
import '../componentsCss/ObjectivesPanel.css';

class ObjectivesPanel extends PureComponent {
  render() {
    const { turnOnModal: turnOnModalFunc } = this.props;

    return (
      <div className="Objectives-panel-container">
        <div className="ObjectivesPanel-split-container">
          <h2 className="Objectives-panel-title">
            Today
          </h2>
        </div>
        <div className="ObjectivesPanel-split-container">
          <button type="button" className="Objectives-panel-add-button" onClick={() => turnOnModalFunc('Add Objective')}>
            <h1 className="Objectives-panel-add-text">
              +
            </h1>
          </button>
        </div>
        <ObjectivesListView />
      </div>
    );
  }
}

ObjectivesPanel.propTypes = {
  turnOnModal: PropTypes.func.isRequired,
};

export default connect(null, { turnOnModal })(ObjectivesPanel);
