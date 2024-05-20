import { lazy } from 'react';

import {
  createRootRoute,
  createRoute,
  createRouter,
  Navigate,
  Outlet,
} from '@tanstack/react-router';

import ErrorComponent from './ErrorComponent';
import { FullPageLoading } from './FullPageLoading';

const errorComponent = ({ error }: { error: unknown }) => (
  <ErrorComponent
    error={error as Error}
    reset={() => {
      localStorage.clear();
      sessionStorage.clear();
      window.location.reload();
    }}
  />
);
const pendingComponent = () => <FullPageLoading />;

const Layout = lazy(() => import('./Layout'));

const rootRoute = createRootRoute({
  component: () => <Outlet />,
  errorComponent,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <Layout />,
  errorComponent,
  pendingComponent,
});

const restRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '*',
  component: () => <Navigate to='/' />,
  errorComponent,
  pendingComponent,
});

const routeTree = rootRoute.addChildren([indexRoute, restRoute]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
