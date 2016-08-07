import crypto from 'crypto';
import { fetchHeroes } from './fetch';
import { marvelUrl } from '../helpers';

export const CHANGED_VIEW = 'CHANGE_VIEW';
export const MAKE_HEROID = 'MAKE_HEROID';

export const changedView = (id) => ({ type: CHANGED_VIEW, id });

export const makeHeroId = (results) => ({ type: MAKE_HEROID, results });

export const changeView = (id) => {
  const method = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const url = `http://gateway.marvel.com:80/v1/public/characters/${ id }${ marvelUrl() }`;
  if (id != 0) {
    return (dispatch) => {
      fetch(url, method)
      .then(res => res.json())
      .then(res => dispatch(makeHeroId(res.data.results)))
      .then(dispatch(changedView(id)));
    };
  };
  return (dispatch) => { dispatch(fetchHeroes()); };
};
