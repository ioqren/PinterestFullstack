import React from 'react';
import LoginFormContainer from './sessions/login_form_container';
import SignupFormContainer from './sessions/signup_form_container';
import SplashContainer from './splash/splash_container';
import EditProfileContainer from './profiles/edit_profile_container';
import CreatePinContainer from './pins/create_pin_container';
import EditPinContainer from './pins/edit_pin_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Redirect } from 'react-router-dom'


const App = () => (
    <Switch>
        <AuthRoute path="/login" component={LoginFormContainer} />
        <AuthRoute path="/signup" component={SignupFormContainer} />
        <ProtectedRoute exact path="/" component={SplashContainer} />
        <ProtectedRoute exact path="/edit" component={EditProfileContainer} />
        <ProtectedRoute exact path="/pin/new" component={CreatePinContainer} />
        <ProtectedRoute path="/pin/:pinId/edit" component={EditPinContainer} />
        <Redirect to="/" />
    </Switch>
);

export default App;