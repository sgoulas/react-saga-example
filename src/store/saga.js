import { call, put, takeEvery, spawn, select, take } from "redux-saga/effects";
import { getUser } from "../fetchApi/fetchApi.js";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";

// worker, will be started on SAGA_FETCH_USER_INIT

export function* fetchUser(action) {
  const { payload: url } = action;
  try {
    const user = yield call(getUser, url);
    yield put(actions.sagaFetchUserSuccess(user.data));
  } catch (error) {
    yield put(actions.sagaFetchUserFail());
  }
}

// starts fetchUser on each dispatched SAGA_FETCH_USER_INIT

export function* fetchUserSaga() {
  yield takeEvery(actionTypes.SAGA_FETCH_USER_INIT, fetchUser);
}

function* logger(action) {
  const state = yield select();
  console.log("action", action);
  console.log("state after", state);
}

function* watchAndLog() {
  yield takeEvery("*", logger);
}

function* watchFirstThreeFetches() {
  for (let i = 0; i < 3; i++) {
    yield take(actionTypes.SAGA_FETCH_USER_SUCCESS);
  }
  console.log("The three first users where successfully fetched");
}

function* rootSaga() {
  yield spawn(fetchUserSaga);
  yield spawn(watchAndLog);
  yield spawn(watchFirstThreeFetches);
}

export default rootSaga;
