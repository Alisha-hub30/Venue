import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import About from './components/About';
import EmailVerify from './components/EmailVerify';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import ResetPassword from './components/ResetPassword';
function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path='/gallery' element={<Gallery/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/email-verify' element={<EmailVerify/>}/>
            <Route path='/reset-password' element={<ResetPassword/>}/>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;