import { all } from "redux-saga/effects";
import { detailSaga } from "./slices/details";


const rootSaga = function* () {
  yield all([
    detailSaga()
  ]);
};

export default rootSaga;