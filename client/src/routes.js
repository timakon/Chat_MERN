import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {Feed} from "./pages/Feed";
import {Friends} from "./pages/Friends";
import {AuthPage} from "./pages/AuthPage";
export const useRoutes = isAuthenticated =>{
     if(isAuthenticated){
         return(
             <Switch>
                 <Route path="/feed" exact>
                     <Feed />
                 </Route>
                 <Route path="/friends" exact>
                     <Friends />
                 </Route>
                 <Redirect to="/feed" />
             </Switch>
         )
     }
     return (
        <Switch>
            <Route path="/">
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
};
