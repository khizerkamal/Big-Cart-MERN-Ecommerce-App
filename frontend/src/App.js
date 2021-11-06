import { useEffect } from 'react';
import { BrowserRouter as Router,Route } from 'react-router-dom'
import {useDispatch} from 'react-redux'

import './App.css';
import ToggleSwitch from './ToggleSwitch'
import Footer from './components/Layout/Footer/Footer';
import Header from './components/Layout/Header/Header';
import { loadUser } from './store/actions/userActions';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch])
  return (
    <Router>
        <div className="App">
          <Header />
          <ToggleSwitch/>
          <Footer />
        </div>
    </Router>
  );
}

export default App;
