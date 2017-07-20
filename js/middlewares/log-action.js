export const riba = store => next => action => {
  console.error('action', action);
  return next(action);
};
