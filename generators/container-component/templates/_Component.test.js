// @flow
import ReactDOM from 'react-dom';

import <%= componentName %>Container from './<%= componentName %>Container';
import <%= componentName %> from './<%= componentName %>';

it('renders without crashing', () => {
  ReactDOM.render(
    <<%= componentName %>Container>
      <<%= componentName %> />
    </<%= componentName %>Container>,
    document.createElement('div')
  );
});
