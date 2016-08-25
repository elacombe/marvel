import { MADE_FETCH, MAKE_HEROES } from '../actions/fetch';
import { MAKE_HEROID } from '../actions/hero';
import _ from 'lodash';

const initialState = {
  heroes: {},
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
    }
  case MAKE_HEROID:
    return {
      heroes: action.results,
    }
  default:
    return state;
  }
}
