import Dexie from 'dexie';

let db;

export {initDb, db as default};

function initDb() {
  db = new Dexie('MyDatabase');

  db.version(1).stores({
    cache: 'api, value',
    images: 'src, value'
  });

  return db.open()
    .then(() => {
      console.log('Connected to db');
      return db;
    })
    .catch(error => console.error(error));
}
