import * as actionTypes from "./actionTypes.js";
import { cloneDeep } from "lodash";
import { expensiveTaskCancel } from "./actions.js";

const updateObject = (oldObject, updatedObject) => {
  return {
    ...oldObject,
    ...updatedObject,
  };
};

const initialState = {
  isLoading: false,
  users: [],
  isExpensiveTaskRunning: false,
};

// NORMAL

const getUsersInit = (state) => {
  const newState = { ...state };
  newState.isLoading = true;

  return updateObject(state, newState);
};

const getUsersSuccess = (state, payload) => {
  const newState = cloneDeep(state);
  newState.users = newState.users.concat([payload]);
  newState.isLoading = false;

  return updateObject(state, newState);
};

const getUsersFail = (state) => {
  const newState = cloneDeep(state);
  newState.isLoading = false;
  newState.users = [];

  return updateObject(state, newState);
};

// SAGA

const sagaGetUsersInit = (state) => {
  const newState = { ...state };
  newState.isLoading = true;

  return updateObject(state, newState);
};

const sagaGetUsersSuccess = (state, payload) => {
  const newState = cloneDeep(state);
  newState.users = newState.users.concat([payload]);
  newState.isLoading = false;

  return updateObject(state, newState);
};

const sagaGetUsersFail = (state) => {
  const newState = cloneDeep(state);
  newState.isLoading = false;
  newState.users = [];

  return updateObject(state, newState);
};

const expensiveTaskInit = (state) => {
  return updateObject(state, { isExpensiveTaskRunning: true });
};

const expensiveTaskStop = (state) => {
  return updateObject(state, { isExpensiveTaskRunning: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_INCREMENTAL_INIT:
      return getUsersInit(state);
    case actionTypes.FETCH_USER_INCREMENTAL_SUCCESS:
      return getUsersSuccess(state, action.payload);
    case actionTypes.FETCH_USER_INCREMENTAL_FAIL:
      return getUsersFail(state);

    case actionTypes.SAGA_FETCH_USER_INIT:
      return sagaGetUsersInit(state);
    case actionTypes.SAGA_FETCH_USER_SUCCESS:
      return sagaGetUsersSuccess(state, action.payload);
    case actionTypes.SAGA_FETCH_USER_FAIL:
      return sagaGetUsersFail();

    case actionTypes.EXPENSIVE_TASK_INIT:
      return expensiveTaskInit(state);
    case actionTypes.EXPENSIVE_TASK_COMPLETED:
      return expensiveTaskStop(state);
    case actionTypes.EXPENSIVE_TASK_CANCEL:
      return expensiveTaskStop(state);

    default:
      return state;
  }
};

export default reducer;
