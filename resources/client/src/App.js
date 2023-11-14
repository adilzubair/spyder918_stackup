import HomeWrapper from './pages/home'
import SignupWrapper from './pages/signup';
import Dashboard from './pages/dashboard';

//import dashboard from './pages/dashboard';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App(){
    return (
        <Router> 
            <Routes> 
                <Route exact path='/' element={< HomeWrapper />}></Route> 
                <Route exact path='/signup' element={< SignupWrapper />}></Route> 
                <Route exact path='/dashboard' element={< Dashboard />}></Route>  
            </Routes>
        </Router> 

    );
}


export default App;