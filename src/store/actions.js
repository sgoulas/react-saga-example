import * as actionTypes from "./actionTypes.js";
import axios from "axios";

export const fetchUserIncrementalInit = () => {
  return {
    type: actionTypes.FETCH_USER_INCREMENTAL_INIT,
  };
};

export const fetchUserIncrementalSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_USER_INCREMENTAL_SUCCESS,
    payload,
  };
};

export const fetchUserIncrementalFail = () => {
  return {
    type: actionTypes.FETCH_USER_INCREMENTAL_FAIL,
  };
};

export const sagaFetchUserInit = (payload) => {
  return {
    type: actionTypes.SAGA_FETCH_USER_INIT,
    payload,
  };
};

export const sagaFetchUserSuccess = (payload) => {
  return {
    type: actionTypes.SAGA_FETCH_USER_SUCCESS,
    payload,
  };
};

export const sagaFetchUserFail = () => {
  return {
    type: actionTypes.SAGA_FETCH_USER_FAIL,
  };
};

export const thunkFetchUser = (url) => {
  return (dispatch) => {
    dispatch(fetchUserIncrementalInit());
    axios
      .get(url)
      .then((response) => {
        const { data } = response;
        dispatch(fetchUserIncrementalSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchUserIncrementalFail());
        console.error(error);
      });
  };
};
