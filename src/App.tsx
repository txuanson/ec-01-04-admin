import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { LayoutWrapper } from './components/layout/layout';

function App() {
  return (
    <BrowserRouter>

      <LayoutWrapper />
    </BrowserRouter>
  );
}

export default App;
