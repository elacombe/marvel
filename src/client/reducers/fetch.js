import { MAKE_HEROES } from '../actions/fetch';
import { MAKE_HEROID, SETCACHE_TIME, ADDTO_CACHE, REMOVEFROM_CACHE } from '../actions/hero';
import _ from 'lodash';

const initialState = {
  heroes: {},
  cache: { timestamp: {} },
};

export default function fetch(state = initialState, action) {
  switch (action.type) {
    case ADDTO_CACHE:
    return {
        ...state,
          cache: {
            ...state.cache,
            [action.results.id]: {
              ...action.results
            }
          }
    };
  case REMOVEFROM_CACHE:
    return {
        ...state,
          cache: {
            ..._.omit(state.cache, action.id)
          }
    };
  case SETCACHE_TIME:
    return {
        ...state,
          cache: {
            ...state.cache,
            timestamp: {
              ...state.cache.timestamp,
              [action.id]: action.ts
            },
          },
    };
  case MAKE_HEROES:
    return {
      ...state,
      heroes: action.heroes,
    }
  case MAKE_HEROID:
    return {
      ...state,
      heroes: { [action.results.id]: action.results},
    }
  default:
    return state;
  }
}
