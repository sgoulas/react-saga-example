import { put, call } from "redux-saga/effects";
import { fetchUser } from "../store/saga.js";

import * as fetchApi from "../fetchApi/fetchApi";
import * as fetchActions from "../store/actions.js";

describe("fetchApi ", () => {
  const url = "https://jsonplaceholder.typicode.com/todos/1";

  describe("fetchUser suite", () => {
    const fetchIterator = fetchUser(fetchActions.sagaFetchUserInit(url));
    const response = {};
    describe("successfull flow", () => {
      it("should yield an Effect call(Api.fetch, './user')", () => {
        expect(fetchIterator.next().value).toMatchObject(
          call(fetchApi.getUser, url)
        );
      });
      it("should yield a fake response", () => {
        expect(fetchIterator.next(response).value).toMatchObject(response);
      });
      it("should then finish", () => {
        expect(fetchIterator.next().done).toBe(true);
      });
    });

    describe("error handling", () => {
      const error = {};
      const fetchIterator = fetchUser(fetchActions.sagaFetchUserInit(url));
      fetchIterator.next();
      it("should yield an error effect in case of an error", () => {
        expect(fetchIterator.throw(error).value).toMatchObject(
          put(fetchActions.sagaFetchUserFail())
        );
      });
    });
  });
});
