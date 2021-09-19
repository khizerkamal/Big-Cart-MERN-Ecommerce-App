import './App.css';
import { Body } from './components/Layout/Body/Body';
import Footer from './components/Layout/Footer/Footer';
import Header from './components/Layout/Header/Header';
import ProductDetails from './components/Layout/ProductDetails/ProductDetails';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import SearchResult from './components/Layout/SearchResult/SearchResult';

function App() {
  return (
    <Router>
        <div className="App">
          <Header />
          <Route path="/" component={Body} exact />
          <Route path="/product/:id" component={ProductDetails} />
          <Route path="/search/:keyword" component={SearchResult} />
          <Footer />
        </div>
    </Router>
  );
}

export default App;
