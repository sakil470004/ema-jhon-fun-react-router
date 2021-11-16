import React from 'react'
import { useContext } from 'react'
import { Route, Redirect } from 'react-router'
import { UserContext } from '../../App'


export default function PrivateRoute({ children, ...rest }) {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    return (
        <Route {...rest} render={({ location }) =>
            loggedInUser.email ? (
                children
            ) : (
                <Redirect to={{
                    pathname: "/login",
                    state: { from: location }
                }} />
            )
        } />
    )
}
