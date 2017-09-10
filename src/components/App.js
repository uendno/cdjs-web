import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './App.css';
import JobsComponent from './jobs/Jobs';
import NavComponent from './nav/Nav';
import GithubComponent from './github/Github';
import AlertComponent from './alert/Alert';
import CreateJobModalComponent from './create-job-modal/CreateJobModal';

class App extends Component {
    render() {
        return (
            <div className="app-component">
                <Alert  stack={true} contentTemplate={AlertComponent}/>
                <CreateJobModalComponent/>
                <div className="nav-component-container">
                    <NavComponent/>
                </div>
                <div className="main-content">
                    <Switch>
                        <Route exact path="/" component={JobsComponent}/>
                        <Route path="/github" component={GithubComponent}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
