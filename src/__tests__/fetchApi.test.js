import { fetchUser } from "../store/saga.js";
import * as fetchApi from "../fetchApi/fetchApi";
import { call } from "redux-saga/effects";
import * as fetchActions from "../store/actions.js";

describe("fetchApi tests", () => {
  it("fetchUser should yield an Effect call(Api.fetch, './user')", () => {
    const url = "https://jsonplaceholder.typicode.com/todos/1";
    const action = fetchActions.sagaFetchUserInit(url);

    const iterator = fetchUser(action);
    expect(iterator.next().value).toMatchObject(call(fetchApi.getUser, url));
  });
});
