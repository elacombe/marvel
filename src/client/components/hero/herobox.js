import React from 'react';
import Links from './links';
import Pic from './pic';
import Title from './title';
import { Link } from 'react-router';

const HeroBox = ({ hero, links, pic }) => {
  const linkto = `/hero/${hero.id}`;

  return (
    <div className='herobox'>
    <Link to={ linkto }>
      <Title title={ hero.name } />
    </Link>
      <Pic pic={ pic } />
      <Links hero={ hero.name } links={ links } />
    </div>
  );
};

HeroBox.propTypes = {
  hero: React.PropTypes.object.isRequired,
  links: React.PropTypes.array.isRequired,
  pic: React.PropTypes.object.isRequired,
};

export default HeroBox;
