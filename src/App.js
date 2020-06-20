import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import * as fetchActions from "./store/actions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const App = () => {
  const dispatch = useDispatch();
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

        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              component="span"
              onClick={handleButtonClick}
            >
              Fetch User
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              component="span"
              onClick={handleThunkButtonClick}
            >
              Fetch User (thunk)
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              component="span"
              onClick={handleSagaButtonClick}
            >
              Fetch User (saga)
            </Button>
          </Grid>
        </Grid>
      </header>
    </div>
  );
};

export default App;
