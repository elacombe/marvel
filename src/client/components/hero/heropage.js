import React from 'react';
import _ from 'lodash';
import HeroBox from './herobox';

const HeroPage = ({ heroes, ...actions }) => {
  console.log('HeroPage----heroes : ', heroes);
  const data = _.map(heroes, (hero, id) =>
  <HeroBox
    hero={ hero.name }
    key={ id }
    links={ hero.urls }
    pic= { hero.thumbnail }
    title ={ hero.description }
    { ...actions }
    />
  );
  return (
    <div className='heropage'>
      { data }
    </div>
  );
};

HeroPage.propTypes = {
  heroes: React.PropTypes.object.isRequired,
};

export default HeroPage;
