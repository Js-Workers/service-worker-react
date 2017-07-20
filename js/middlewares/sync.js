export const sync = store => next => action => {
  if (!action.hasOwnProperty('sync')) {
    return next(action);
  }

  return handleSync(action, store, next);
};

function handleSync(action, store, next) {
  console.error('do something if action has "sync" property', store);

  return next(action);
}
