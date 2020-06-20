import { call, put, takeEvery, spawn } from "redux-saga/effects";
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

function* rootSaga() {
  yield spawn(fetchUserSaga);
}

export default rootSaga;
