import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LayoutWrapper } from './components/layout/layout';
import { AppProvider } from './context';
import { AuthGuard } from './guards';
import { LoginPage } from './pages/auth';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AuthGuard loginPage={<LoginPage />} authPage={<LayoutWrapper />} />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
