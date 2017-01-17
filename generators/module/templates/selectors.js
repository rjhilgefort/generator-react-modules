// @flow
import { createSelector } from 'reselect';
import { NAME } from './constants';
// import { } from './model';

export const getAll = state => state[NAME];

export const getCounts = createSelector(
  getAll,
  all<%= moduleNameUpperFirst %> => ({
    all: all<%= moduleNameUpperFirst %>.length,
  }),
);
