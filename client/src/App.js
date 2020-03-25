import React from 'react';
import './App.css';
import Head from './component/Head';
import Bisection from './component/Bisection';
import FalsePosition from './component/FalsePosition';
import OnePoint from './component/OnePoint';
import NewtonRaphson from './component/NewtonRaphson';
import Secant from './component/Secant';
import {Route,Switch} from "react-router-dom";

function App() {
  return (
    <div className="App">

      <React.Fragment>
        <Switch>
            <Route exact path="/" component={Head}/>
            <Route exact path="/Bisection" component={Bisection}/>
            <Route exact path="/FalsePosition" component={FalsePosition}/>
            <Route exact path="/OnePoint" component={OnePoint}/>
            <Route exact path="/NewtonRaphson" component={NewtonRaphson}/>
            <Route exact path="/Secant" component={Secant}/>
          </Switch>
       </React.Fragment>
     

    </div>
  );
}

export default App;
