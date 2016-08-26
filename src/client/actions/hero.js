import { marvelUrl } from '../helpers';
import async from 'async';

let cacheOne = { timestamp: {} };

export const CHANGED_VIEW = 'CHANGE_VIEW';
export const MAKE_HEROID = 'MAKE_HEROID';
export const SETCACHE_TIME = 'SETCACHE_TIME';
export const ADDTO_CACHE = 'ADDTO_CACHE';
export const REMOVEFROM_CACHE = 'REMOVEFROM_CACHE';

const vocalDebug = (name) => {
  var beep = document.getElementById(name);
  beep.play();
}

export const makeHero = (results) => {
  return { type: MAKE_HEROID, results }
}

export const manageCache = (results) => {
  return (dispatch, getState) => {
    const { cache } = getState();
    if (cache[results.id]) {
      const check = Date.now();
      if ((check - cache.timestamp[results.id]) > 10000) {
        dispatch(removeFrom_Cache(results.id));
        dispatch(fetchHero(results));
        const { cache } = getState();
      }
      if (cache[results.id].id === parseInt(results.id)) {
        dispatch(makeHero(cache[results.id]));
      }
    } else {
        dispatch(makeHero(results));
      }
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
  vocalDebug('gone');
  return { type: REMOVEFROM_CACHE, id }
};

export const fetchHero = (id) => {
  const method = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log('I need a hero ! heeeero');
  const url = `http://gateway.marvel.com:80/v1/public/characters/${ id }${ marvelUrl() }`;
    return (dispatch) => {
      vocalDebug('gone');
      fetch(url, method)
      .then(res => res.json())
      .then(res => {
        dispatch(manageCache(res.data.results[0]));
        dispatch(addTo_Cache(res.data.results[0]));
        dispatch(setCacheTime(id));
      })
      .catch(err => { if (err) { vocalDebug('nan') } });
  };
};

export const workerOne = (id) => {
  return (dispatch, getState) => {
    const { cache } = getState();
    async.map(cache, (hero, cb) => { if (parseInt(id) === hero.id) { cb(null, { match: true }) } else { cb(null, { match: false }) } }, (err, res) => {
      if (err) {
        console.log('err workerOne->async.map : ', err);
        vocalDebug('mordu');
      }
      if (res[id]) {
        if (res[id].match === true) {
          dispatch(manageCache(cache[id]));
        }
      } else {
        dispatch(fetchHero(id));
      }
    });
  };
}