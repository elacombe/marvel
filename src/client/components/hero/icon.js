import React from 'react';

const Icon = ({ icon }) => {
  return (
    <span className='icon'>{ icon }</span>
  );
};

Icon.propTypes = {
  icon: React.PropTypes.string.isRequired,
};

export default Icon;
