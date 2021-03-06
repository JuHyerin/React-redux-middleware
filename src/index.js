import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from "react-redux";
import rootReducer, {rootSaga} from "./modules";
import logger from 'redux-logger';
import {composeWithDevTools} from "redux-devtools-extension";
import ReduxThunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';


const customHistory = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(
            ReduxThunk.withExtraArgument({history: customHistory}),
            sagaMiddleware,
            logger
        )
    )
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Router history={customHistory}>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>,
  document.getElementById('root')
);
