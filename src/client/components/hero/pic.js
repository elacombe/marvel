import React from 'react';

const Pic = ({ pic }) => {
  const url = `${ pic.path }.${ pic.extension }`;
  return <img src={ url } height="150" width="150" />;
};

export default Pic;
