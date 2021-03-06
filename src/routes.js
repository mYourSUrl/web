import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { LinksPage } from './pages/links-page'
import { CreatePage } from './pages/create-page'
import { DetailPage } from './pages/detail-page'
import { AuthPage } from './pages/auth-page'

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path='/links' exact component={LinksPage} />
                <Route path='/create' exact component={CreatePage} />
                <Route path='/detail/:id' exact component={DetailPage} />
                <Redirect to='/create' />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path='/' exact component={AuthPage} />
            <Redirect to='/' />
        </Switch>
    )
}
