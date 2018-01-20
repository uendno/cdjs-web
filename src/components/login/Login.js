import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FormControl, FormGroup, ControlLabel, Button, HelpBlock} from 'react-bootstrap';
import './Login.css';
import logo from '../../assets/images/logo.png';
import {login} from "../../actions/auth";

class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: null,
            password: null,
            help: null
        }
    }

    render() {
        const {email, password, help} = this.state;

        return (
            <div className='login-component'>
                <div className='login-form'>
                    <img className='logo' src={logo}/>
                    <FormGroup controlId='email'>
                        <ControlLabel>Email</ControlLabel>
                        <FormControl type='email'
                                     id="email"
                                     value={email || ""}
                                     onChange={(event) => {
                                         this.setState({
                                             email: event.target.value
                                         })
                                     }}/>
                    </FormGroup>
                    <FormGroup controlId='password'>
                        <ControlLabel>Password</ControlLabel>
                        <FormControl type='password' value={password || ""} onChange={(event) => {
                            this.setState({
                                password: event.target.value
                            })
                        }}/>
                    </FormGroup>
                    {help && <HelpBlock>{help}</HelpBlock>}
                    <Button bsClass='btn btn-success login-button' onClick={this._submit.bind(this)}>Login</Button>
                </div>
            </div>
        )
    }

    async _submit() {
        const {login, history} = this.props;
        const {email, password} = this.state;
        const result = await login(email, password);

        if (result) {
            history.replace('/');
        }
    }
}

export default connect(null, {
    login
})(Login);