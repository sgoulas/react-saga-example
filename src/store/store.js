import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import fetchUserReducer from "./reducer.js";
import rootSaga from "./saga";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleWare = createSagaMiddleware();

const store = createStore(
  fetchUserReducer,
  composeEnhancers(applyMiddleware(sagaMiddleWare, thunk))
);

sagaMiddleWare.run(rootSaga);

export default store;
