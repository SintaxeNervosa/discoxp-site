import {BrowserRouter, Routes, Route} from "react-router-dom"

import App from './pages/App'
import Login from './pages/login/login'

export default function RouteWeb(){
   return(
     <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Login/>} />
            </Routes>
        </BrowserRouter>
    </>
   )
}