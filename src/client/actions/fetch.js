import _ from 'lodash';
import { marvelUrl } from '../helpers';
import { setCacheTime, addTo_Cache, REMOVEFROM_CACHE } from './hero';
import async from 'async';

export const MAKE_HEROES = 'MAKE_HEROES';

const manageCache = (results) => {
  return (dispatch, getState) => {
    const { cache } = getState();
    if (cache[results.id]) {
      const check = Date.now();
      if ((check - cache.timestamp[results.id]) > 10000) {
        dispatch(removeFrom_Cache(results.id));
        dispatch(fetchHero(results));
        const { cache } = getState();
      }
        dispatch(makeHeroes(_.map(cache, (hero) => {
          if ( hero !== 'timestamp') {
            return hero;
          }
        })));
      } else {
        dispatch(makeHeroes(results));
      }
  };
};

const makeHerHoes = (results) => {
  return { type: MAKE_HEROES, heroes: _.keyBy(results, hero => hero.id) }
};

const makeHeroes = (results) => {
  return (dispatch, getState) => {
    const { cache } = getState();
    if (cache === results) {
      dispatch(makeHerHoes(cache))
    } else {
      dispatch(makeHerHoes(results));
    }
  };
};

const fetchHeroes = () => {
  const method = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log('Late at night I toss and I turn and I dream of what I need');
  const url = `http://gateway.marvel.com:80/v1/public/characters${ marvelUrl() }`;
  return (dispatch) => {
    fetch(url, method)
    .then(res => res.json())
    .then(res => {
      dispatch(manageCache(res.data.results));
      res.data.results.forEach((hero) => dispatch(addTo_Cache(hero)));
      dispatch(setCacheTime(id));
    });
  };
};

Object.size = (obj) => {
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
}

export const workerAll = () => {
  return (dispatch, getState) => {
    const { cache } = getState();
    const size = Object.size(cache);
    console.log('workerall : ', size);
    if (size < 20) {
      dispatch(fetchHeroes());
    } else {
      const check = Date.now();
      async.map(cache.timestamp, (hero, cb) => {
        if ((check - hero.ts) > 10000) {
          cb(null, true);
        }
        else { cb (null, null) }
      }, (err, res) => {
        if (err) {
        }
        console.log(res);
      });
    }
  };
};
