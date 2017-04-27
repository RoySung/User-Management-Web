import fetch from 'isomorphic-fetch';
import { FETCH_USERS } from './const';
import modifyUsers from '../actions/modifyUsers.js';

function action(parameter) {
  return dispatch => {
    return fetch('http://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => dispatch(modifyUsers(json)));
  }
}

module.exports = action;
