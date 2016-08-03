import { MADE_FETCH, MAKE_HEROES } from '../actions/fetch';
import { CHANGED_VIEW, MAKE_HEROID } from '../actions/hero';
import _ from 'lodash';

const initialState = {
  heroes: {},
  view: false,
};

export default function fetch(state = initialState, action) {
  switch (action.type) {
  case MADE_FETCH:
    return {
      ...state,
    };
  case MAKE_HEROES:
    return {
      ...state,
      heroes: action.heroes,
      view: false,
    }
  case MAKE_HEROID:
    return {
      ...state,
      heroes: action.results,
      view: !state.view,
    }
  default:
    return state;
  }
}
