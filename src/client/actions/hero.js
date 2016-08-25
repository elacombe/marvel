import { marvelUrl } from '../helpers';
import async from 'async';

let cacheOne = { timestamp: {} };

export const CHANGED_VIEW = 'CHANGE_VIEW';
export const MAKE_HEROID = 'MAKE_HEROID';
export const SETCACHE_TIME = 'SETCACHE_TIME';
export const ADDTO_CACHE = 'ADDTO_CACHE';
export const REMOVEFROM_CACHE = 'REMOVEFROM_CACHE';

export const makeHero = (results) => {
  return { type: MAKE_HEROID, results }
}
export const makeHeroId = (results) => {
  console.log('make hero id res = ', results.id);
  return (dispatch, getState) => {
    const { cache } = getState();
    console.log(cache);
    if (cache[results.id]) {
      const check = Date.now();
      if ((check - cache.timestamp[results.id]) > 10000) {
        dispatch(removeFrom_Cache(results.id));
        dispatch(fetchHero(results));
      }
      if (cache[results.id].id === parseInt(results.id)) {
        dispatch(makeHero(cache[results.id]));
      }
    }
    dispatch(makeHero(results));
  };
};

export const setCacheTime = (id) => {
  const ts = Date.now();
  return { type: SETCACHE_TIME, id, ts};
};

export const addTo_Cache = (results) => {
  return { type: ADDTO_CACHE, results }
};

export const removeFrom_Cache = (id) => {
  return { type: REMOVEFROM_CACHE, id }
};

export const fetchHero = (id) => {
  const method = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log('fetchHero----fetchOne');
  const url = `http://gateway.marvel.com:80/v1/public/characters/${ id }${ marvelUrl() }`;
    return (dispatch) => {
      fetch(url, method)
      .then(res => res.json())
      .then(res => {
        dispatch(makeHeroId(res.data.results[0]));
        dispatch(addTo_Cache(res.data.results[0]));
        dispatch(setCacheTime(id));
      });
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
  };
}