import React from 'react';
import Icon from './icon';

const Link = ({ hero, icon, link, name }) => {
  const classname = `link-${ name }-${ hero }`;
  return (
    <span className={ classname }>
      <Icon icon={ icon } />
      - 
      <a href={link}>{ name }</a>
    </span>
  );
};

Link.propTypes = {
  icon: React.PropTypes.string.isRequired,
  link: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
};

export default Link;
