import React from 'react';
import Wrapper from './Wrapper';
import PuffLoader from "react-spinners/ClipLoader";

      
const LoadingIndicator = () => (
  <PuffLoader color='#3b3f51' loading={true} size={150} />
);

export default LoadingIndicator;
