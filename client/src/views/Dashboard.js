import React, { useContext } from 'react';
import './Home.css';

import { AuthContext } from '../helpers/AuthProvider';
import ManagerDashboard from './Manager/ManagerDashboard';
import DirectorDashboard from './Director/DirectorDashboard';
import AudienceDashboard from './Audience/AudienceDashboard';

const Dashboard = () => {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <div>
            {isLoggedIn?.type === 'database_manager' ? (
                <ManagerDashboard />
            ) : isLoggedIn?.type === 'director' ? (
                <DirectorDashboard />
            ) : (
                <AudienceDashboard />
            )}
        </div>
    );
};
export default Dashboard;
