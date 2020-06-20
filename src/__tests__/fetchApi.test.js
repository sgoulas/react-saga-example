import { fetchUser } from "../store/saga.js";
import * as fetchApi from "../fetchApi/fetchApi";
import { put, call } from "redux-saga/effects";
import * as fetchActions from "../store/actions.js";

describe("fetchApi tests", () => {
  const url = "https://jsonplaceholder.typicode.com/todos/1";
  const fetchInit = fetchActions.sagaFetchUserInit(url);
  const iterator = fetchUser(fetchInit);
  const response = {};
  const error = {};

  describe("fetchUser suite", () => {
    it("should yield an Effect call(Api.fetch, './user')", () => {
      expect(iterator.next().value).toMatchObject(call(fetchApi.getUser, url));
    });

    it("should yield a fake response", () => {
      expect(iterator.next(response).value).toMatchObject(response);
    });

    it("should yield an error effect in case of an error", () => {
      expect(iterator.throw(error).value).toMatchObject(
        put(fetchActions.sagaFetchUserFail())
      );
    });
  });
});
