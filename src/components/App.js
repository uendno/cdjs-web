import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './App.css';
import JobsComponent from './jobs/Jobs';
import JobComponent from './jobs/job/Job';
import NavComponent from './nav/Nav';
import AlertComponent from './alert/Alert';
import EditJobComponent from './jobs/edit-job/EditJob';
import CreateCredentialModal from './edit-credential-modal/EditCredentialModal';
import CredentialsComponent from './credentials/Credentials';
import NotFoundComponent from './not-found/NotFound';

class App extends Component {
    render() {
        return (
            <div className="app-component">
                <Alert stack={true} contentTemplate={AlertComponent}/>
                <CreateCredentialModal/>
                <div className="nav-component-container">
                    <NavComponent/>
                </div>
                <div className="main-content">
                    <Switch>
                        <Route exact path="/" render={() => <Redirect to="/jobs"/>}/>
                        <Route exact path="/jobs/new" component={EditJobComponent}/>
                        <Route path="/jobs/:id" component={JobComponent}/>
                        <Route exact path="/jobs" component={JobsComponent}/>
                        <Route exect path="/credentials" component={CredentialsComponent}/>
                        <Route component={NotFoundComponent}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
