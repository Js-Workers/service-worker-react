import db from '../db';

export const sync = store => next => action => {
  if (!action.hasOwnProperty('sync')) {
    return next(action);
  }

  return handleSync(action, store, next);
};

function handleSync(action, store, next) {
  const {sync} = action;

  return db.cache.toArray()
    .then(items => {
      const result = items.find(item => item.api === sync.api);

      return next({...action, payload: {movies: result.results}});
    })
    .catch(() => next(action))
}
