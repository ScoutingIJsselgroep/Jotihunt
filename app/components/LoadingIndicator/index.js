import React from 'react';
import Wrapper from './Wrapper';

import {
  ThreeBounce,
} from 'better-react-spinkit';

const LoadingIndicator = () => (
  <Wrapper>
    <ThreeBounce color='#e59451' size={15} />
  </Wrapper>
);

export default LoadingIndicator;
