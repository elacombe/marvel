import _ from 'lodash';
import { marvelUrl } from '../helpers';
import async from 'async';

let cacheAll = {};

export const MADE_FETCH = 'MADE_FETCH';
export const MAKE_HEROES = 'MAKE_HEROES';

export const madeFetch = (results) => ({ type: MADE_FETCH, results });

export const makeHeroes = (results) => {
  if (cacheAll === results) {
    return { type: MAKE_HEROES, heroes: _.keyBy(cacheAll, hero => hero.id) };
  } else {
    cacheAll = results;
    return {
      type: MAKE_HEROES,
      heroes: _.keyBy(results, hero => hero.id),
    }
  }
};

export const fetchHeroes = () => {
  const method = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log('fetchAll');
  const url = `http://gateway.marvel.com:80/v1/public/characters${ marvelUrl() }`;
  return (dispatch) => {
    fetch(url, method)
    .then(res => res.json())
    .then(res => dispatch(makeHeroes(res.data.results)))
  };
};

export const workerAll = (makeHeroAll, fetchAll) => {
  if (cacheAll[0]) {
    makeHeroAll(cacheAll);
  } else {
      console.log('workerAll----fetchAll');
      fetchAll();
    }
};
