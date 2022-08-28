import React, { ReactNode, useContext } from 'react'
import { AppContext, ContextType } from '../context';

export const AuthGuard = ({ loginPage, authPage }: any) => {
  const { context } = useContext(AppContext) as ContextType;

  if (!context.isAuthenticated) {
    return loginPage;
  } else {
    return authPage;
  }
}
