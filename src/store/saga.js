import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";

// worker, will be started on SAGA_FETCH_USER_INIT

function* fetchUser(action) {
  const { payload: url } = action;
  try {
    const user = yield call(axios.get, url);
    yield put(actions.sagaFetchUserSuccess(user.data));
  } catch (error) {
    yield put(actions.sagaFetchUserFail());
  }
}

// starts fetchUser on each dispatched SAGA_FETCH_USER_INIT

function* fetchUserSaga() {
  yield takeEvery(actionTypes.SAGA_FETCH_USER_INIT, fetchUser);
}

export default fetchUserSaga;
