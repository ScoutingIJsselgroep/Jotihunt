import React from 'react';
import Wrapper from './Wrapper';
import BarLoader from "react-spinners/BarLoader";

      
const LoadingIndicator = () => (
  <div style={{contentAlign: 'center', width: '100%'}}>
    {/* <BarLoader color='#3b3f51' loading={true} size={150} /> */}
  </div>
);

export default LoadingIndicator;
