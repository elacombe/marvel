import React from 'react';
import { connect } from 'react-redux';
import HeroPage from '../components/hero/heropage';
import Links from '../components/hero/links';
import { changeView } from '../actions/hero';

const App = ({ dispatch, heroes }) => {
  console.log('App-------heroes', heroes);

  const onHeroClick = () => {
    dispatch(changeView());
  };

  const actions = {
    onHeroClick,
  };

  return (
    <div className='app'>
      <h1> App Marvel</h1>
      <HeroPage heroes={ heroes } { ...actions } />
    </div>
  );
};

App.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  links: React.PropTypes.object.isRequired,
  pics: React.PropTypes.object.isRequired,
  titles: React.PropTypes.object.isRequired,
};

export default connect(state => ({ heroes: state.heroes }))(App);
