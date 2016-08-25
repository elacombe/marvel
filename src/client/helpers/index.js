import crypto from 'crypto';

export const marvelUrl = () => {
  const apiPublic = '2a1fa8e58afe69d776a0ec7ed409c791';
  const apiPrivate= '0bdbfdab2e33ec304f4cb7825243178cadbdf43e';
  const timeStamp = Date.now();
  const hash = timeStamp + apiPrivate + apiPublic;
  const urlhashed = crypto.createHash('md5').update(hash).digest('hex');
  return `?ts=${timeStamp}&apikey=${apiPublic}&hash=${urlhashed}`;
};
