import logo from './logo.svg';
import './App.css';
import {Routes,Route} from 'react-router-dom'
import {NavLink} from 'react-router-dom'
import Userlistitem from './components/userlistitem/Userlistitem';
import Messenger from './components/messenger/Messenger';
import Register from './components/Register/Register';
import AuthState from './components/context/AuthState';
import Login from './components/login/Login';

function App() {
  const navLinkStyles=({isActive})=>{
    return {
      backgroundColor:'red',
      // textDecoration:'none',
      zIndex:"20"
    }
  }
  return (
    <div>
      <AuthState>
      <Routes>
        <Route path="/login" element={<Login/>}  />
        <Route path="/register" element={<Register/>}  />
        <Route path="/" element={<Messenger/>} />
      </Routes>
      </AuthState>
      
    </div>
  );
}

export default App;
