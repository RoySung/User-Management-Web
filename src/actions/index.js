/* eslint-disable import/newline-after-import */
/* Exports all the actions from a single point.

Allows to import actions like so:

import {action1, action2} from '../actions/'
*/
/* Populated by react-webpack-redux:action */
import modifyUsers from '../actions/modifyUsers.js';
import fetchUsers from '../actions/fetchUsers.js';
const actions = {
  fetchUsers,
  modifyUsers
};
module.exports = actions;
