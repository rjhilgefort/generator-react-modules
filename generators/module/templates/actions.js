// @flow
/* eslint-disable import/prefer-default-export */
import * as t from './actionTypes';

export const fun = text => ({
  type: t.FOO,
  payload: { text },
});
