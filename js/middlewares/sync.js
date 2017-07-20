import { showError } from 'actions/notificatoins';
import { logout } from 'actions/users';
import { setConnectivity } from 'actions/common';
import * as request from 'api/rest';
import db from 'utils/db';

export const dbActions = {
  create: 'put',
  update: 'put',
  remove: 'delete'
};

export const syncMiddleware = store => next => action => {
  // console.error('action', action);

  if (!action.hasOwnProperty('sync')) {
    return next(action);
  }

  return handleSync(action, store);
};

function handleSync(action, { dispatch, getState }) {
  const { api, entity, toServer } = action.sync;

  // console.error('handleSync');
  // console.error('action', action);
  // console.error('api', api);
  // console.error('entity', entity);
  // console.error('toServer', toServer);

  return new Promise((resolve, reject) => {
    if (!request[entity] && !request[entity][api]) {
      reject(`${api} does not exist`);
    }

    request[entity][api](toServer ? toServer(action.payload, getState()) : action.payload)
    .then(data => {
      handleSuccess(data, action, { dispatch, getState });
      resolve(data);
    })
    .catch(error => {
      handleError(action, { dispatch, getState })(error);

      if (isOffline(error)) {
        return resolve();
      }

      return reject();
    });
  });
}

function dbHandler(action, data) {
  const { sync, payload } = action;
  const { entity, api, key } = sync;
  const result = data || payload;
  const item = api === 'remove' ? result[key] : result;

  if (!db[entity]) {
    throw Error(`${entity} does not exist in db`);
  }

  db[entity][dbActions[api]](item);
}

function dispatchHandler(dispatch, action, data) {
  const { type, payload } = action;

  dispatch({
    type,
    payload: data || payload
  });
}

/* Success handler */
function handleSuccess(data, actionCreator, { dispatch, getState }) {
  const fromServer = actionCreator.sync.fromServer;
  const { app } = getState();
  const payload = fromServer ? fromServer(data) : data;

  dbHandler(actionCreator, payload);
  dispatchHandler(dispatch, actionCreator, payload);

  if (!app.isOnline) {
    dispatch(setConnectivity(true));
  }
}

/* Specific error handlers */
const errorHandlers = {
  offline: {
    validators: [isOffline],
    handle: (actionCreator, { dispatch, getState }) => {
      const { payload, sync } = actionCreator;
      const { key, entity, api, syncDb, syncAction, toServer } = sync;
      const uniqueKey = `${entity}_${payload[key]}`;

      dispatch(setConnectivity(false));

      db.sync.get(uniqueKey).then(syncItem => {
        let action = api;

        dbHandler(actionCreator);
        dispatchHandler(dispatch, actionCreator);

        if (syncItem && syncItem.api === 'create' && api === 'update') {
          action = 'create';
        }

        if (api === 'remove' && syncItem && syncItem !== 'remove') {
          db.sync.delete(uniqueKey);
          return;
        }

        db.sync.put({
          api: action,
          syncAction,
          payload: toServer ? toServer(payload, getState()) : payload,
          entity,
          syncDb,
          key,
          id: uniqueKey
        });
      });
    }
  },
  notAuthorized: {
    validators: [isUnuthorized],
    handle: (action, { dispatch }) => {
      logout()(dispatch);
    }
  }
};

/* Error handler */
function handleError(action, store) {
  return error => {
    for (const errorHandler in errorHandlers) {
      const itemHandler = errorHandlers[errorHandler];
      const isInValid = itemHandler.validators.map(validator => validator(error))
        .some(isInvalid => isInvalid);

      if (isInValid) {
        return itemHandler.handle(action, store, error);
      }

      showError(error.message)(store.dispatch);
    }
  };
}

/* Validators */

/* No network connection or server has crashed */
function isOffline({message}) {
  // Server doesn't properly handles 500
  return message === 'Failed to fetch';
}

/* Is not authorized user */
function isUnuthorized({status}) {
  return status && parseInt(status, 10) === 401;
}
