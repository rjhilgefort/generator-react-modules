// @flow
import ReactDOM from 'react-dom';

import <%= componentName %> from './<%= componentName %>';

it('renders without crashing', () => {
  ReactDOM.render(
    <<%= componentName %> />,
    document.createElement('div')
  );
});
