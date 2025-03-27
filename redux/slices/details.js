import { createSlice } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";

const initialState = {
  data: null,
  type: "",
  loading: false,
  error: null,
};


const details = createSlice({
  name: "details",
  initialState,
  reducers: {
    getPostsDataRequest: (state, { type, payload }) => {
      state.data = payload;
      state.type = type;
      state.loading = true;
    },
    getPostsDataSuccess: (state, { type, payload }) => {
      state.data = payload;
      state.type = type;
      state.loading = false;
    },
    getPostsDataFailure: (state, { type, payload }) => {
      state.data = payload;
      state.type = type;
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { getPostsDataFailure, getPostsDataRequest, getPostsDataSuccess } =
  details.actions;

export default details.reducer;

const getDetailsApi = async () => {
   return fetch('https://dummyjson.com/users?select=firstName,id,lastName,email')
    .then(response => response.json())
    .then(json => json?.users)
};

function* getDetails() {
  try {
    const response = yield call(getDetailsApi);
    yield put(getPostsDataSuccess(response));
  } catch (err) {
    yield put(
      getPostsDataFailure(err)
    );
  }
}

export function* detailSaga() {
  yield takeLatest(getPostsDataRequest, getDetails);
}
