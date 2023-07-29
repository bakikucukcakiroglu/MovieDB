import { Navigate, Outlet} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthProvider';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isLoggedIn } = useContext(AuthContext);

    if (!isLoggedIn) {
        // Redirect to login page
        return <Navigate to="/login"/>;
    }

    return <Outlet /> ;
};

export { PrivateRoute };
