import './App.css';
import { Body } from './components/Layout/Body/Body';
import Footer from './components/Layout/Footer/Footer';
import Header from './components/Layout/Header/Header';
import {BrowserRouter as Router, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Route path="/" component={Body} exact/>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
