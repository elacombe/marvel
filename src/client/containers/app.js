import React from 'react';
import { connect } from 'react-redux';
import HeroPage from '../components/hero/heropage';
import Links from '../components/hero/links';
import { changeView } from '../actions/hero';

const App = ({ dispatch, heroes, routing, view }) => {
  const onHeroClick = (id) => {
    dispatch(changeView(id));
  };
  console.log(routing);

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

export default connect(state => ({ heroes: state.fetch.heroes, view: state.fetch.view, routing: state.routing.locationBeforeTransitions }))(App);
