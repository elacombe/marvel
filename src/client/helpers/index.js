import crypto from 'crypto';

export const marvelUrl = () => {
  const apiPublic = '298bab46381a6daaaee19aa5c8cafea5';
  const apiPrivate= 'b0223681fced28de0fe97e6b9cd091dd36a5b71d';
  const timeStamp = Date.now();
  const hash = timeStamp + apiPrivate + apiPublic;
  const urlhashed = crypto.createHash('md5').update(hash).digest('hex');
  return `?ts=${timeStamp}&apikey=${apiPublic}&hash=${urlhashed}`;
};