import crypto from 'crypto';
import { fetchHeroes } from './fetch';
import { marvelUrl } from '../helpers';
import async from 'async';

let cacheOne = { timestamp: {} };

export const CHANGED_VIEW = 'CHANGE_VIEW';
export const MAKE_HEROID = 'MAKE_HEROID';

export const makeHeroId = (results) => {
  if (cacheOne[results]) {
    const check = Date.now();
    if ((check - cacheOne.timestamp[results]) > 10000) {
        cacheOne[results] = null;
        return fetchHero(results);
    }
    if (cacheOne[results].id === parseInt(results)) {
      return { type: MAKE_HEROID, results: { 0: cacheOne[results] } };
    }
  }
  cacheOne[results[0].id] = results[0];
  cacheOne.timestamp[results[0].id] = Date.now();
  return { type: MAKE_HEROID, results };
};

export const fetchHero = (id) => {
  const method = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log('fetchOne');
  const url = `http://gateway.marvel.com:80/v1/public/characters/${ id }${ marvelUrl() }`;
    return (dispatch) => {
      fetch(url, method)
      .then(res => res.json())
      .then(res => dispatch(makeHeroId(res.data.results)))
  };
};

export const workerOne = (makeHeroOne, data, fetchOne) => {
  async.map(cacheOne, (hero, cb) => { if (parseInt(data) === hero.id) { cb(null, { match: true }) } else { cb(null, { match: false }) } }, (err, res) => {
    if (err) {
    }
    if (res[data]) {
      if (res[data].match === true) {
        makeHeroOne(data);
      }
    } else {
      fetchOne(data);
    }
  });
}