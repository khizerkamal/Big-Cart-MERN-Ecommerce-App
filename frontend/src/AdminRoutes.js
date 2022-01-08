import React, {useState} from 'react'
import './App.css'
import { Switch,Route,useLocation } from 'react-router-dom'
import Dashboard from './components/AdminPanel/Dashboard/Dashboard';
import Header from './components/AdminPanel/Header/Header';
import Sidebar from './components/AdminPanel/Sidebar/Sidebar';
import AllProducts from './components/AdminPanel/Products/AllProducts/AllProducts';
import ProtectedRoute from './Route/ProtectedRoute';

const AdminRoutes = () => {
    const [ active,setActive ] = useState(false);
    const containerFluid = (inactive) => setActive(inactive);
    return (
        <div>
            <Header />
            <Sidebar onCollapse={containerFluid} />
            <div className={`container ${active ? 'active' : ''}`}>
                <ProtectedRoute isAdmin={true} path="/admin/dashboard" component={Dashboard} exact />
                <ProtectedRoute isAdmin={true} path="/admin/products/all" component={AllProducts} exact/>
            </div>
        </div>
    )
}

export default AdminRoutes
