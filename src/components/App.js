import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './App.css';
import localStorageSrv from '../services/localStorage';
import JobsComponent from './jobs/Jobs';
import JobComponent from './jobs/job/Job';
import NavComponent from './nav/Nav';
import AlertComponent from './modals/alert/Alert';
import EditJobComponent from './jobs/edit-job/EditJob';
import EditCredentialModal from './credentials/edit-credential-modal/EditCredentialModal';
import CredentialsComponent from './credentials/Credentials';
import BuildComponent from './jobs/job/build/Build';
import NotFoundComponent from './not-found/NotFound';
import LoginComponent from './login/Login';
import AgentsComponent from './agents/Agents';
import NewAgentModal from './agents/new-agent-modal/NewAgentModal';
import EditAgentModal from './agents/edit-agent-modal/EditAgentModal';
import FilesComponent from './jobs/job/build/files/Files';
// import {showError} from '../helpers/alert';


const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => {
        const accessToken = localStorageSrv.get('accessToken');

        return (
            accessToken ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: {from: props.location}
                }}/>
            )
        )
    }}/>
);

class App extends Component {

    // componentDidMount() {
    //     showError('Opps','asdasdaj andskasd asd');
    // }


    render() {
        return (
            <div className="app-component">
                <Alert stack={true} contentTemplate={AlertComponent}/>
                <div className='routes'>
                    <Switch>
                        <Route exect path="/login" component={LoginComponent}/>
                        <PrivateRoute component={() => (
                            <div>
                                <EditCredentialModal/>
                                <div className="nav-component-container">
                                    <NavComponent/>
                                    <NewAgentModal/>
                                    <EditAgentModal/>
                                </div>
                                <div className="main-content">
                                    <Switch>
                                        <Route exact path="/" render={() => <Redirect to="/jobs"/>}/>
                                        <Route path="/jobs/:id/builds/:buildId/files" component={FilesComponent} />
                                        <Route path="/jobs/:id/builds/:buildId" component={BuildComponent}/>
                                        <Route path="/jobs/:id/edit" component={EditJobComponent}/>
                                        <Route path="/jobs/:id" component={JobComponent}/>
                                        <Route exact path="/jobs" component={JobsComponent}/>
                                        <Route exact path="/credentials" component={CredentialsComponent}/>
                                        <Route exact path="/agents" component={AgentsComponent}/>
                                        <Route component={NotFoundComponent}/>
                                    </Switch>
                                </div>
                            </div>
                        )}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
