// @flow
import { connect } from 'react-redux';
const R = require('ramda');
const _ = require('lodash');
import actions from '../actions';
import <%= componentName %> from './<%= componentName %>';

const mapStateToProps = () => ({
  ___: false,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  ___: () => R.pipe(
      actions.___,
      dispatch
    )(ownProps),
});

const <%= componentName %>Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(<%= componentName %>);

export default <%= componentName %>Container
