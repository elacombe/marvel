import React from 'react';
import Links from './links';
import Pic from './pic';
import Title from './title';
import _ from 'lodash';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchHero, workerOne, makeHeroId } from '../../actions/hero';

class HeroDesc extends React.Component {

  componentWillMount() {
    this.props.dispatch(workerOne(this.props.params.id));
  }

  render() {
    const hero = this.props.hero[this.props.params.id];
    if (!this.props.hero[this.props.params.id]) return <div className='herodesc' />;
    const comics = _.map(hero.comics.items, (comic, id) => <li key={ id }>{ comic.name }</li>);
    const series = _.map(hero.series.items, (series, id) => <li key={ id }>{ series.name }</li>);
    const stories = _.map(hero.stories.items, (stories, id) => <li key={ id }>{ stories.name }</li>);
    return (
      <div className='herodesc'>
        <Pic pic={ hero.thumbnail } />
        <Link to='/'>
          <Title title={ hero.name } />
        </Link>
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
  }
};

export default connect(state => ({ hero: state.heroes }))(HeroDesc);
