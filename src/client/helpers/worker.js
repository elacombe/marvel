import { MAKE_HEROID } from '../actions/hero';

export default function workerz ({ dispatch, getState }) {
  return (next) =>
  (action) => {
    const console = window.console;
    const state = getState();
    const returnValue = next(action);
    const ts = Date.now();
    switch (action.type) {
      /*case MAKE_HEROES:
        setState({ ...state, heroes: action.heroes });*/
      case MAKE_HEROID:
        dispatch(makeHero(action.results));
      default:
        return returnValue;;
    }
    console.log(`%c action`, `color: #03A9F4`, action);
  };
}
