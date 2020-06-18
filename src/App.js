import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import * as fetchActions from "./store/actions";

const App = () => {
  const dispatch = useDispatch();
  const fetchedUsers = useSelector((state) => state.users);
  const [userID, setUserID] = useState(1);
  const url = `https://jsonplaceholder.typicode.com/todos/${userID}`;

  const incrementUserID = () => {
    const newUserID = userID === 2 ? 1 : userID + 1;
    setUserID(newUserID);
  };

  const handleButtonClick = () => {
    dispatch(fetchActions.fetchUserIncrementalInit());
    axios
      .get(url)
      .then((response) => {
        const { data } = response;
        dispatch(fetchActions.fetchUserIncrementalSuccess(data));
        incrementUserID();
      })
      .catch((error) => {
        dispatch(fetchActions.fetchUserIncrementalFail());
        console.error(error);
      });
  };

  const handleThunkButtonClick = () => {
    dispatch(fetchActions.thunkFetchUser(url));
    incrementUserID();
  };

  const handleSagaButtonClick = () => {
    dispatch(fetchActions.sagaFetchUserInit(url));
    incrementUserID();
  };

  const usersJSX = fetchedUsers.map((fetchedUser) => (
    <li>{fetchedUser.title}</li>
  ));

  return (
    <div className="App">
      <header className="App-header">
        <p>As a general rule of thumb:</p>
        <div style={{ fontSize: 18 }}>
          <p>
            Thunks are best for complex synchronous logic (especially code that
            needs access to the entire Redux store state), and simple async
            logic (like basic AJAX calls). With the use of async/await, it can
            be reasonable to use thunks for some more complex promise-based
            logic as well.
          </p>
          <br />
          <p>
            Sagas are best for complex async logic and decoupled "background
            thread"-type behavior, especially if you need to listen to
            dispatched actions (which is something that can't be done with
            thunks). They require familiarity with ES6 generator functions and
            redux-saga's "effects" operators.
          </p>
          <br />
          <p>
            Observables solve the same problems as sagas, but rely on RxJS to
            implement async behavior. They require familiarity with the RxJS
            API.
          </p>
        </div>
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={handleButtonClick} type="button">
          Fetch User
        </button>
        <br />
        <button onClick={handleThunkButtonClick} type="button">
          Fetch User (thunk way)
        </button>
        <br />
        <button onClick={handleSagaButtonClick} type="button">
          Fetch User (saga way)
        </button>
        <br />
        {fetchedUsers && <ul>{usersJSX}</ul>}
      </header>
    </div>
  );
};

export default App;
