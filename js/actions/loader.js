import { SHOW_LOADER, HIDE_LOADER } from '../constants/loader';

export {
  showLoader,
  hideLoader
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
