import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';

/**
 * Displays a button that is responsible for setting a specific colour in a colour picker
 * and showing whether or not that colour is currently selected
 */
class ColourPickerOption extends PureComponent {
  // converts isSelected into a string to be appended
  // to the end of the colour parent div that controls
  // whether or not the colour is currently selected
  formatIsSelected() {
    const { isSelected } = this.props;
    return isSelected ? 'selected' : 'notSelected';
  }

  render() {
    const { onColourSelect, colour } = this.props;
    const isSelected = this.formatIsSelected();

    return (
      <button
        type="button"
        className="ColourPicker-button"
        onClick={onColourSelect}
      >
        <div className={`ColourPicker-${isSelected}`}>
          <div className="ColourPicker-colour" colour={colour} />
        </div>
      </button>
    );
  }
} // `Add-colour-${colour}`

ColourPickerOption.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  onColourSelect: PropTypes.func.isRequired,
  colour: PropTypes.string.isRequired,
};

export default ColourPickerOption;
