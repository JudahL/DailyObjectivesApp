import { List } from 'immutable';
import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Objective from './Objective';
import { markObjective, removeObjective, selectObjective } from '../actions/objectivesActions';
import { turnOnModal } from '../actions/modalActions';

class ObjectivesListView extends PureComponent {
  render() {
    const {
      objectives,
      markObjective: markObjectiveFunc,
      removeObjective: removeObjectiveFunc,
      turnOnModal: turnOnModalFunc,
      selectObjective: selectObjectiveFunc,
    } = this.props;

    return objectives.map((objective, index) => (
      <Objective
        key={objective.get('text') + new Date().getMilliseconds()}
        objectiveIndex={index}
        objectiveId={objective.get('_id')}
        text={objective.get('text')}
        colour={objective.get('colour')}
        isChecked={objective.get('isChecked')}
        markObjective={markObjectiveFunc}
        removeObjective={removeObjectiveFunc}
        turnOnModal={turnOnModalFunc}
        selectObjective={selectObjectiveFunc}
      />
    ));
  }
}

ObjectivesListView.propTypes = {
  objectives: PropTypes.instanceOf(List).isRequired,
  markObjective: PropTypes.func.isRequired,
  removeObjective: PropTypes.func.isRequired,
  selectObjective: PropTypes.func.isRequired,
  turnOnModal: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    objectives: state.getIn(['objectives', 'list']),
  };
}

export default connect(
  mapStateToProps,
  {
    markObjective, removeObjective, selectObjective, turnOnModal,
  },
)(ObjectivesListView);
