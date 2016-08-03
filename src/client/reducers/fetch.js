import { MADE_FETCH, MAKE_HEROES } from '../actions/fetch';
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
  default:
    return state;
  }
}
