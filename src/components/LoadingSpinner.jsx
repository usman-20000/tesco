import React from 'react';
import '../../src/styles/spinner.css'; // This is the custom CSS file for the spinner

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      {/* <div className="spinner"></div> */}
      <img src={require('../Assets/image/progress.gif')} alt="Loading..." className="h-[50px] w-[50px] " />
    </div>
  );
};

export default LoadingSpinner;
