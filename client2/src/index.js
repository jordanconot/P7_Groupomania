import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../../client/src/styles/index.scss';
import { Provider } from 'react-redux';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { getUsers } from './actions/users.actions';
import { getPosts } from './actions/post.actions';

//DevTool
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch(getUsers());
store.dispatch(getPosts());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
