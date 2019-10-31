import React from 'react';
import ReactDOM from 'react-dom';
import Tfcmon from './tfcmon';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Tfcmon />, div);
  ReactDOM.unmountComponentAtNode(div);
});
