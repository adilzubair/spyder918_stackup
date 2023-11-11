import HomeWrapper from './pages/home'
import SignupWrapper from './pages/signup';
//import dashboard from './pages/dashboard';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App(){
    return (
        <Router> 
            <Routes> 
                <Route exact path='/' element={< HomeWrapper />}></Route> 
                <Route exact path='/signup' element={< SignupWrapper />}></Route> 
                {/* <Route exact path='/contact' element={< Contact />}></Route>  */}
            </Routes>
        </Router> 

    );
}


export default App;