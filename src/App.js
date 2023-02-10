import React from 'react';
import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import SongsDisplay from './components/SongsDisplay';
import AuthContext from './store/AuthContext';
import { Navigate } from 'react-router-dom'
import Header from './components/Header';
import AddSong from './components/AddSong';


const App = () => {
  const {token} = useContext(AuthContext)
  return (
    <div className ='app'>
    <Header/>
    <Routes>
        <Route index element={token ? <Navigate to='/Home'/> : <Login/>}/>
        <Route path="/Home" element={token ? <AddSong/> : <Navigate to='/'/>} />
        <Route path='songsDisplay/:id' element={token ? <SongsDisplay/> : <Navigate to='/' />}/>
        <Route path='/Songs' element={token ? <Home/> : <Navigate to='/'/>}/>
        <Route to="/Login" />
    </Routes>
    </div>
  );
}

export default App;