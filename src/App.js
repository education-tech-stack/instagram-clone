import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactLoader from './components/loader';
import * as ROUTES from './constants/routes';
import UserContext from './context/user';
import useAuthListener from './hooks/use-auth-listener';

import ProtectedRoute from './helpers/protected-route';

const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/sign-up'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Profile = lazy(() => import('./pages/profile'));
const NotFound = lazy(() => import('./pages/not-found'));

export default function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <footer className="fixed bottom-0 left-0 z-20 w-full p-4 border-t shadow md:flex md:items-center md:justify-between md:p-6 bg-gray-800 border-gray-600">
          <span className="text-sm sm:text-center text-gray-400">
            IMPORTANT: This is a clone Project created by{' '}
            <a href="https://github.com/sameer55chauhan">Sameer Chauhan</a>. No data is being
            collected by this website, other than the SignUp Details. Recommended: to fill the fake
            SignUp details if you want to go through it.
          </span>
        </footer>
        <Suspense fallback={<ReactLoader />}>
          <Switch>
            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.SIGN_UP} component={SignUp} />
            <Route path={ROUTES.PROFILE} component={Profile} />
            <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
              <Dashboard />
            </ProtectedRoute>
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}
