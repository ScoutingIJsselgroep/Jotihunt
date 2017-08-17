import React from 'react';
import Wrapper from './Wrapper';

import {
  ThreeBounce,
} from 'better-react-spinkit';

const LoadingIndicator = () => (
  <Wrapper>
    <ThreeBounce color='#3b3f51' size={20} />
  </Wrapper>
);

export default LoadingIndicator;
