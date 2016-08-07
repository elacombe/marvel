import React from 'react';
import Links from './links';
import Pic from './pic';
import Title from './title';
import _ from 'lodash';

const HeroDesc = ({ hero, ...actions }) => {
  console.log(hero);
  const handleClick = () => {
    actions.onHeroClick(0);
  };

  const comics = _.map(hero.comics.items, (comic, id) => <li key={ id }>{ comic.name }</li>);
  const series = _.map(hero.series.items, (series, id) => <li key={ id }>{ series.name }</li>);
  const stories = _.map(hero.stories.items, (stories, id) => <li key={ id }>{ stories.name }</li>);

  return (
    <div className='herodesc' onClick={ handleClick }>
      <Pic pic={ hero.thumbnail } />
      <Title title={ hero.name } />
      <Title title={ hero.description } />
      <span>Comics</span>
      <ul>
      { comics }
      </ul>
      <span>Series</span>
      <ul>
      { series }
      </ul>
      <span>Stories</span>
      <ul>
      { stories }
      </ul>
    </div>
  );
};

HeroDesc.propTypes = {
  hero: React.PropTypes.object.isRequired,
};

export default HeroDesc;
