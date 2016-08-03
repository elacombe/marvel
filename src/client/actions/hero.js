import crypto from 'crypto';
import { fetchHeroes } from './fetch';

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
  const apiPublic = '298bab46381a6daaaee19aa5c8cafea5';
  const apiPrivate= 'b0223681fced28de0fe97e6b9cd091dd36a5b71d';
  const timeStamp = Date.now();
  const hash = timeStamp + apiPrivate + apiPublic;
  const urlhashed = crypto.createHash('md5').update(hash).digest('hex');
  const url = `http://gateway.marvel.com:80/v1/public/characters/${ id }?ts=${ timeStamp }&apikey=${ apiPublic }&hash=${ urlhashed }`;
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
