import React, {useContext, useState} from 'react';
import './Home.css';


import {AuthContext} from "../helpers/AuthProvider";
import ManagerDashboard from "./ManagerDashborad";
import DirectorDashboard from "./DirectorDashboard";
import AudienceDashboard from "./AudienceDashboard";


const Dashboard = () => {

    const { isLoggedIn } = useContext(AuthContext);



    return (


        <div>{

            isLoggedIn?.type=="database_manager" ?
            <ManagerDashboard/>
                :(isLoggedIn?.type == "director"  ?
                    <DirectorDashboard/>:
                    <AudienceDashboard/>)
        }</div>

    );
};

export default Dashboard;