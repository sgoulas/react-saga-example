import {
  call,
  put,
  takeEvery,
  spawn,
  select,
  take,
  race,
  delay,
} from "redux-saga/effects";
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

export function* fetchUserSaga() {
  yield takeEvery(actionTypes.SAGA_FETCH_USER_INIT, fetchUser);
}

export function* fetchUserWithTimeout(action) {
  const { payload: url } = action;
  try {
    const { user, timeout } = yield race({
      user: yield call(getUser, url),
      timeout: delay(1000),
    });
    if (user) {
      console.log("no timeout");
      yield put(actions.sagaFetchUserSuccess(user.data));
    }
    if (timeout) {
      console.log("timeout");
      yield put(actions.fetchUserTimeoutError());
    }
  } catch (error) {
    yield put(actions.sagaFetchUserFail());
  }
}

export function* fetchUserWithTimeOutSaga() {
  yield takeEvery(
    actionTypes.SAGA_FETCH_USER_WITH_TIMEOUT_INIT,
    fetchUserWithTimeout
  );
}

function* logger(action) {
  const state = yield select();
  console.log("[logger] action", action);
  console.log("[logger] state after", state);
}

function* watchAndLog() {
  yield takeEvery("*", logger);
}

function* watchFirstThreeFetches() {
  for (let i = 0; i < 3; i++) {
    yield take(actionTypes.SAGA_FETCH_USER_SUCCESS);
  }
  console.log(
    "[watchFirstThreeFetches] The three first users where successfully fetched"
  );
}

function* fetchFlow() {
  while (true) {
    yield take(actionTypes.SAGA_FETCH_USER_INIT);
    console.log("[fetchFlow] initialized fetching");
    yield take(actionTypes.SAGA_FETCH_USER_SUCCESS);
    console.log("[fetchFlow] fetching success");
    yield take(actionTypes.SAGA_FETCH_USER_FAIL);
    console.log("[fetchFlow] fetching error");
  }
}

function* fetchTwoUsersRace(action) {
  const { payload } = action;
  const { firstUserUrl } = payload;
  const { secondUserUrl } = payload;

  const { firstUser, secondUser } = yield race({
    firstUser: yield call(getUser, firstUserUrl),
    secondUser: yield call(getUser, secondUserUrl),
  });
  if (firstUser) {
    yield put(actions.notifyFirstUserWin());
    yield put(actions.sagaFetchUserSuccess(firstUser.data));
  }
  if (secondUser) {
    yield put(actions.notifySecondUserWin());
    yield put(actions.sagaFetchUserSuccess(secondUser.data));
  }
}

function* fetchTwoUsersRaceSaga() {
  yield takeEvery(actionTypes.SAGA_FETCH_TWO_USERS_RACE, fetchTwoUsersRace);
}

function* rootSaga() {
  yield spawn(fetchUserSaga);
  yield spawn(fetchUserWithTimeOutSaga);
  yield spawn(watchAndLog);
  yield spawn(watchFirstThreeFetches);
  yield spawn(fetchFlow);
  yield spawn(fetchTwoUsersRaceSaga);
}

export default rootSaga;
