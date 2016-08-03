import _ from 'lodash';
import crypto from 'crypto';
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
  const apiPublic = '298bab46381a6daaaee19aa5c8cafea5';
  const apiPrivate= 'b0223681fced28de0fe97e6b9cd091dd36a5b71d';
  const timeStamp = Date.now();
  const hash = timeStamp + apiPrivate + apiPublic;
  const urlhashed = crypto.createHash('md5').update(hash).digest('hex');
  const url = `http://gateway.marvel.com:80/v1/public/characters?ts=${ timeStamp }&apikey=${ apiPublic }&hash=${ urlhashed }`;
  return (dispatch) => {
    fetch(url, method)
    .then(res => res.json())
    .then(res => dispatch(makeHeroes(res.data.results)))
  };
};
