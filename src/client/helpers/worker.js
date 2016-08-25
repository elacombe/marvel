import React from 'react';
let cache = {};

export const workerz = (data, source) => {
  console.log('workerz data : ', data);
  console.log('workerz source : ', source);
  if (!data) {
    return null;
  }
  if (source === 'one') {
    const id = data.id;
    if (!cache.one.id) {
      cache.one.id = data;
      return data;
    } 
  }
  return data;
}

export const workerOne = (data, fetchOne) => {
  console.log('workerOne----data : ', data);
  if (!data) {
    return null;
  }
  console.log('workerOne----cache.one : ', cache.one);
  const check = _.map(cache.one, (hero) => { if (data === hero.id) { return hero } });
  if (check[0]) {
    return check[0];
  } else {
    fetchOne(data);
  }
}