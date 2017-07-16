import { SHOW_LOADER, HIDE_LOADER } from '../constants/loader';

export {
  showLoader,
  hideLoader,
  showTemporary
};

function showLoader() {
  return {
    type: SHOW_LOADER,
    payload: true
  };
}

function hideLoader() {
  return {
    type: HIDE_LOADER,
    payload: false
  };
}

function showTemporary() {
  return dispatch => {
    dispatch(showLoader());
    const interval = setInterval(() => {
      dispatch(hideLoader());
      clearInterval(interval);
    }, 2000);
  };
}
