import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({
  isAuthenticated,
  component: Component,
  path,
  redirectedTo,
}) => (
  <Route
    path={path}
    render={({ location }) => {
      if (isAuthenticated) {
        return <Component />;
      } else {
        return <Redirect to={{ redirectedTo, state: { from: location } }} />;
      }
    }}
  />
);

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  redirectedTo: PropTypes.string.isRequired,
};

export default ProtectedRoute;
