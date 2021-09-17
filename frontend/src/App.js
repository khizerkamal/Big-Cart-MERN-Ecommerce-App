import './App.css';
import { Body } from './components/Layout/Body/Body';
import Footer from './components/Layout/Footer/Footer';
import Header from './components/Layout/Header/Header';
import ProductDetails from './components/Layout/ProductDetails/ProductDetails';
import { Scrollbars } from 'react-custom-scrollbars';
import {BrowserRouter as Router, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
        <div className="App">
          <Header />
          <Route path="/" component={Body} exact />
          <Route path="/product/:id" component={ProductDetails} />
          <Footer />
        </div>
    </Router>
  );
}

export default App;
