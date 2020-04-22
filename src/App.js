import React from 'react'
import { useRoutes } from './routes'
import { BrowserRouter } from 'react-router-dom'
import { AuthContext } from './context/auth.context'
import { useAuth } from './hooks/auth.hook'
import { Navbar } from './components/navbar'

import 'materialize-css'

function App() {
    const { token, login, logout, userId } = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)
    return (
        <AuthContext.Provider value={{ token, login, logout, userId, isAuthenticated }}>
            <BrowserRouter>
                {isAuthenticated && <Navbar />}
                <div className="container">
                    {routes}
                </div>
            </BrowserRouter>
        </AuthContext.Provider>

    )
}

export default App
