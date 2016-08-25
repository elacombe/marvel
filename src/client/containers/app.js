import React from 'react';
import { connect } from 'react-redux';
import HeroPage from '../components/hero/heropage';
import Links from '../components/hero/links';
import { changeView } from '../actions/hero';

const App = ({ dispatch, heroes }) => {
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
  heroes: React.PropTypes.object.isRequired,
};

export default connect(state => ({ heroes: state.heroes }))(App);
