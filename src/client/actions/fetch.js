import _ from 'lodash';
import { marvelUrl } from '../helpers';
export const MADE_FETCH = 'MADE_FETCH';
export const MAKE_HEROES = 'MAKE_HEROES';

export const madeFetch = (results) => ({ type: MADE_FETCH, results });

export const makeHeroes = (results) => ({
    type: MAKE_HEROES,
    heroes: _.keyBy(results, hero => hero.id),
});

export const fetchHeroes = () => {
  const method = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const url = `http://gateway.marvel.com:80/v1/public/characters${ marvelUrl() }`;
  return (dispatch) => {
    fetch(url, method)
    .then(res => res.json())
    .then(res => dispatch(makeHeroes(res.data.results)))
  };
};
