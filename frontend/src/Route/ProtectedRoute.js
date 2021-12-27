import React from 'react'
import { Route, Redirect } from 'react-router'
import { useSelector } from 'react-redux'
import {useAlert} from 'react-alert'

const ProtectedRoute = ({component : Component, ...rest}) => {
    const { loading,isAuthenticated } = useSelector(state => state.auth)
    // const alert = useAlert();
    return (
        <div>
            {
                loading === false && (
                    <Route
                        {...rest}
                        render={props => {
                            if (!isAuthenticated) {
                                return <Redirect to="/" />
                            }
                            return <Component {...props} />
                        }}
                    />
                )  
            }
        </div>
    )
}

export default ProtectedRoute
