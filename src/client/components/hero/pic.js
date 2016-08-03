import React from 'react';

const Pic = ({ pic }) => {
  const url = `${ pic.path }.${ pic.extension }`;
  return <img src={ url } height="50" width="50" />;
};

export default Pic;
