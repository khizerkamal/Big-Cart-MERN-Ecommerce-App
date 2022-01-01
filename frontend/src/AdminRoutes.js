import React from 'react'
import { Switch,Route,useLocation } from 'react-router-dom'
import Dashboard from './components/AdminPanel/Dashboard/Dashboard';
import ProtectedRoute from './Route/ProtectedRoute';

const AdminRoutes = () => {
    return (
        <div>
            <Switch>
                <ProtectedRoute path="/dashboard" component={Dashboard} exact/>
            </Switch>
        </div>
    )
}

export default AdminRoutes
