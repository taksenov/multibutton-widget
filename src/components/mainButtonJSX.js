import React from 'react';
import PropTypes from 'prop-types';

import './widget.scss';

function MainButton(props) {
  const { left, image, handleToggleOpen, backgroundColor, altText } = props;

  return (
    <div
      className="buttonDock"
      style={{
        justifyContent: `flex-${left ? 'start' : 'end'}`
      }}
    >
      <div
        className="buttonWrapper"
        onClick={handleToggleOpen}
        style={{
          backgroundColor: `${backgroundColor}`
        }}
      >
        <img src={image} alt={altText} width={50} height={50} />
      </div>
    </div>
  );
}

MainButton.propTypes = {
  left: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
  handleToggleOpen: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired
};

export default MainButton;
