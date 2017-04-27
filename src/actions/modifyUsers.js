import { MODIFY_USERS } from './const';

function action(parameter) {
  return { type: MODIFY_USERS, parameter };
}

module.exports = action;
