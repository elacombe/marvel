import React from 'react';
import Links from './links';
import Pic from './pic';
import Title from './title';

const HeroBox = ({ hero, links, pic, ...actions }) => {
  console.log('HeroBox----hero : ', hero);
  console.log('HeroBox----link : ', links);
  console.log('HeroBox----pic : ', pic);
  const classname = `HeroBox-${ hero.name }`;

  const handleClick = () => {
    actions.onHeroClick(hero.id);
  };

  return (
    <div className='herobox' onClick={ handleClick }>
      <Title title={ hero.name } />
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