import React from 'react';

const ColorToggle = () => {
  const toggleSlider = (e) => {
    const toggle = e.currentTarget.firstChild;
    toggle.classList.toggle('slider-on');
    
    if (toggle.classList.contains('slider-on')) {
      document.documentElement.style.setProperty('--primaryBackground', '#FFFFFF');
      document.documentElement.style.setProperty('--accent1', '#1F1F1F');
      document.documentElement.style.setProperty('--primaryText', '#1F1F1F');
      document.documentElement.style.setProperty('--secondaryBackground', '#FFFFFF');
      document.documentElement.style.setProperty('--accent2', '#60D5F0');
    } else {
      document.documentElement.style.removeProperty('--primaryBackground');
      document.documentElement.style.removeProperty('--accent1');
      document.documentElement.style.removeProperty('--primaryText');
      document.documentElement.style.removeProperty('--secondaryBackground');
      document.documentElement.style.removeProperty('--accent2');
    }
  }

  return (
    <div className="slider-container">
      <span className="slider-icon">{'\u263E'}</span>
      <div className="slider" onClick={toggleSlider}>
        <div className="slider-toggle"></div>
      </div>
      <span className="slider-icon">{'\u263C'}</span>
    </div>
  );
};

export default ColorToggle;
