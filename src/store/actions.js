import * as actionTypes from "./actionTypes.js";
import { getUser } from "../fetchApi/fetchApi.js";

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

export const thunkFetchUser = (url) => (dispatch) => {
  dispatch(fetchUserIncrementalInit());
  getUser(url)
    .then((response) => {
      const { data } = response;
      dispatch(fetchUserIncrementalSuccess(data));
    })
    .catch((error) => {
      dispatch(fetchUserIncrementalFail());
      console.error(error);
    });
};

export const fetchUserWithTimeoutInit = (payload) => {
  return {
    type: actionTypes.SAGA_FETCH_USER_WITH_TIMEOUT_INIT,
    payload,
  };
};

export const fetchUserTimeoutError = () => {
  return {
    type: actionTypes.SAGA_FETCH_USER_TIMEOUT_ERROR,
  };
};

export const fetchTwoUsersRace = (payload) => {
  return {
    type: actionTypes.SAGA_FETCH_TWO_USERS_RACE,
    payload,
  };
};

export const notifyFirstUserWin = () => {
  return {
    type: actionTypes.FIRST_USER_WINS,
  };
};

export const notifySecondUserWin = () => {
  return {
    type: actionTypes.SECOND_USER_WINS,
  };
};

export const expensiveTaskInit = () => {
  return { type: actionTypes.EXPENSIVE_TASK_INIT };
};

export const expensiveTaskCancel = () => {
  return { type: actionTypes.EXPENSIVE_TASK_CANCEL };
};

export const expensiveTaskCompleted = () => {
  return { type: actionTypes.EXPENSIVE_TASK_COMPLETED };
};

export const expensiveTaskCanceled = () => {
  return { type: actionTypes.EXPENSIVE_TASK_CANCELED };
};
