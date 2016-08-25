import { MAKE_HEROES } from '../actions/fetch';
import { MAKE_HEROID, SETCACHE_TIME, ADDTO_CACHE } from '../actions/hero';
import _ from 'lodash';

const initialState = {
  heroes: {},
  cache: { timestamp: {} },
};

export default function cache(state = initialState, action) {
  switch (action.type) {
  case ADDTO_CACHE:
    return {
      ...state,
    };
  case SETCACHE_TIME:
    return {
        ...state,
              [action.id]: {
                ts: action.ts
              },
    };
  case MAKE_HEROES:
    return {
      ...state,
      heroes: action.heroes,
    };
  case MAKE_HEROID:
    return {
      ...state,
      heroes: action.results,
    };
  default:
    return state;
  };
}
