import React from 'react';
import Links from './links';
import Pic from './pic';
import Title from './title';

const HeroBox = ({ hero, links, pic, title }) => {
  console.log('HeroBox----hero : ', hero);
  console.log('HeroBox----link : ', links);
  console.log('HeroBox----pic : ', pic);
  console.log('HeroBox----title : ', title);
  const classname = `HeroBox-${ hero }`;

  return (
    <div className='herobox'>
      <Title title={ hero } />
      <Pic pic={ pic } />
      <Links hero={ hero } links={ links } />
    </div>
  );
};

HeroBox.propTypes = {
  hero: React.PropTypes.string.isRequired,
  links: React.PropTypes.object.isRequired,
  pic: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
};

export default HeroBox;