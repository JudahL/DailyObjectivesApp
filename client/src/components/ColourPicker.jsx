import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ColourPickerOption from './ColourPickerOption';
import '../componentsCss/ColourPicker.css';

// The colour options available in the colour picker
const COLOUR_OPTIONS = ['green', 'purple', 'orange', 'teal'];

class ColourPicker extends PureComponent {
  render() {
    const { colour, handleColourSelectChange } = this.props;

    return (
      <div className="ColourPicker-container">
        {/* Create a colour selection button for each available colour */}
        {COLOUR_OPTIONS.map(c => (
          <ColourPickerOption
            key={c}
            colour={c}
            isSelected={c === colour}
            onColourSelect={() => handleColourSelectChange(c)}
          />
        ))}
      </div>
    );
  }
}

ColourPicker.propTypes = {
  colour: PropTypes.string.isRequired,
  handleColourSelectChange: PropTypes.func.isRequired,
};

export default ColourPicker;
