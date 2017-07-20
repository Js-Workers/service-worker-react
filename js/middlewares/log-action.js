export const logAction = store => next => action => {
  console.error('action', action);
  console.error('store', store);
  return next(action);
};
