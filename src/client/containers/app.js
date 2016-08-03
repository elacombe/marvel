import React from 'react';
import { connect } from 'react-redux';
import HeroPage from '../components/hero/heropage';
import Links from '../components/hero/links';
import { changeView } from '../actions/hero';

const App = ({ dispatch, heroes, view }) => {
  console.log('App-------heroes', heroes);

  const onHeroClick = (id) => {
    dispatch(changeView(id));
  };

  const actions = {
    onHeroClick,
  };

  return (
    <div className='app'>
      <h1> App Marvel</h1>
      <HeroPage heroes={ heroes } view={ view } { ...actions } />
    </div>
  );
};

App.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  heroes: React.PropTypes.object.isRequired,
  view: React.PropTypes.bool.isRequired,
};

export default connect(state => ({ heroes: state.heroes, view: state.view }))(App);
