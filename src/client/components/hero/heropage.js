import React from 'react';
import _ from 'lodash';
import HeroBox from './herobox';
import HeroDesc from './herodesc';
import { connect } from 'react-redux';
import { push } from 'redux-router';
import { fetchHeroes, makeHeroes, workerAll } from '../../actions/fetch';

class HeroPage extends React.Component {

  componentWillMount() {
    workerAll(this.props.makeHeroAll, this.props.fetchAll);
  }
  
  render() {
    const data = _.map(this.props.heroes, (hero, id) =>
      <HeroBox
        hero={ hero }
        key={ id }
        links={ hero.urls }
        pic={ hero.thumbnail }
      />
    );
    return (
      <div className='heropage'>
        { data }
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => ({
  fetchAll: () => {
    dispatch(fetchHeroes());
  },
  makeHeroAll: (results) => {
    dispatch(makeHeroes(results));
  }
});

export default connect(state => ({ heroes: state.heroes }), mapDispatchToProps)(HeroPage);
