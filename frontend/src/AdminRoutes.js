import React, {useState} from 'react'
import './App.css'
import { Switch,Route,useLocation } from 'react-router-dom'
import Dashboard from './components/AdminPanel/Dashboard/Dashboard';
import Header from './components/AdminPanel/Header/Header';
import Sidebar from './components/AdminPanel/Sidebar/Sidebar';
import AllProducts from './components/AdminPanel/Products/AllProducts/AllProducts';
import ProtectedRoute from './Route/ProtectedRoute';
import CreateProduct from './components/AdminPanel/Products/CreateProduct/CreateProduct';
import UpdateProduct from './components/AdminPanel/Products/UpdateProduct/UpdateProduct';

const AdminRoutes = () => {
    const [ active,setActive ] = useState(false);
    const containerFluid = (inactive) => setActive(inactive);
    return (
        <div>
            <Header />
            <Sidebar onCollapse={containerFluid} />
            <div className={`container ${active ? 'active' : ''}`}>
                <ProtectedRoute isAdmin={true} path="/admin/dashboard" component={Dashboard} exact />
                <ProtectedRoute isAdmin={true} path="/admin/products" component={AllProducts} exact />
                <ProtectedRoute isAdmin={true} path="/admin/products/create" component={CreateProduct} exact />
                <ProtectedRoute isAdmin={true} path="/admin/products/:id" component={UpdateProduct} exact/>
            </div>
        </div>
    )
}

export default AdminRoutes
