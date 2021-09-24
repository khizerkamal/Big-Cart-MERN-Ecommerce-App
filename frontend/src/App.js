import { useEffect } from 'react';
import { BrowserRouter as Router,Route } from 'react-router-dom'
import {useDispatch} from 'react-redux'

import './App.css';
import { Body } from './components/Layout/Body/Body';
import Footer from './components/Layout/Footer/Footer';
import Header from './components/Layout/Header/Header';
import ProductDetails from './components/Layout/ProductDetails/ProductDetails';
import SearchResult from './components/Layout/SearchResult/SearchResult';
import { loadUser } from './store/actions/userActions';
import Profile from './components/Layout/User/Profile/Profile';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch])
  return (
    <Router>
        <div className="App">
          <Header />
          <Route path="/" component={Body} exact />
          <Route path="/product/:id" component={ProductDetails} />
          <Route path="/search/:keyword" component={SearchResult} />
          <Route path="/user/me" component={Profile} exact />
          <Footer />
        </div>
    </Router>
  );
}

export default App;
