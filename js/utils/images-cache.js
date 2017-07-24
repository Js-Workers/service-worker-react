import db from '../db';

export const saveImgToCache = event => {
  const {target} = event;
  const {width, height} = target;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = width;
  canvas.height = height;

  ctx.drawImage(event.target, 0, 0, width, height);
  db.images.put({src: target.src, body: canvas.toDataURL('image/png')});
};

export const getImgFromCache = event => {
  const {target} = event;

  db.images.toArray()
  .then(items => {
    const result = items.find(item => item.src === target.src);

    target.src = result.body;
  })
};
