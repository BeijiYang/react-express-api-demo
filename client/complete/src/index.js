import React from 'react';
import { render } from 'react-dom';
// import App from './ui/App';
//
// render(<App />, document.getElementById('root'));
import { renderRoutes } from './routes';

render(renderRoutes(), document.getElementById('root'));
