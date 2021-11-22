import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducers from "./reducers/index.js";
import rootSaga from "./sagas/index.js";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware)
  // other store enhancers if any
);

const store = createStore(rootReducers, enhancer);

sagaMiddleware.run(rootSaga);

export default store;
