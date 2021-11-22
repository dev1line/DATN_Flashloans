import { all, takeEvery } from "redux-saga/effects";
import { fetchToken, addUser } from "./TokenSaga";
function* rootSaga() {
  yield all([takeEvery("LOGIN", fetchToken), takeEvery("ADD_USER", addUser)]);
}

export default rootSaga;
