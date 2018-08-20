import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List } from 'immutable';

class StatusOption extends PureComponent {
  // Returns the percentage of completed objectives as a value between 0 and 100
  getPercentage() {
    const { objectives } = this.props;

    const completed = objectives.filter(objective => objective.get('isChecked'));
    const total = objectives.size;

    return (completed.size / total) * 100;
  }

  render() {
    const { title } = this.props;

    return (
      <div className="Status-option-container">
        <h3 className="Status-sub-title">
          {title}
        </h3>
        <div className="Status-fill-container">
          <div
            className="Status-fill"
            style={{ width: `${this.getPercentage()}%` }}
          />
        </div>
      </div>
    );
  }
}

StatusOption.propTypes = {
  objectives: PropTypes.instanceOf(List).isRequired,
  title: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    objectives: state.getIn(['objectives', 'list']),
  };
}

export default connect(mapStateToProps)(StatusOption);
