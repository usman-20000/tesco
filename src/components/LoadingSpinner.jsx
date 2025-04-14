import React from 'react';
import '../../src/styles/spinner.css'; // This is the custom CSS file for the spinner
import { Spinner } from 'react-activity';

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      {/* <div className="spinner"></div> */}
      <Spinner color="#000" size={32} speed={1} animating={true} />
    </div>
  );
};

export default LoadingSpinner;
