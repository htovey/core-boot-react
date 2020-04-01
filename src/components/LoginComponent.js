import React, {Component} from 'react';
import LoginFormDialog  from './LoginFormDialog';
import '../styles/App.css';
import fetch from 'node-fetch';
import { MuiThemeProvider } from 'material-ui/styles';
import  base64  from 'base-64';
import { booleanLiteral } from '@babel/types';
import FetchUtil from '../utils/FetchUtil';


class LoginComponent extends Component {
    //1) setup our state using constructor
    
    constructor(props) {
        super(props);
        this.state={
            toggleError: 'false',
            styleClass: 'showMe',
            error: ''
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('LoginComponent componentDidUpdate()');
        if (prevProps.openLogin !== this.props.openLogin) {
           this.setState({openLogin: this.props.openLogin});
        }
    }

    handleError(message) {
        console.log('LoginComponent handleError()');
        if(this.props.openLogin === true) {
            this.setState({ error: message});
        }
    }

    validLogin = (login) => {
        if (!login.username && !login.password) {
            this.handleError('Please enter User Id and Password.');
            return false;
        } else if (!login.username) {
            this.handleError('Please enter a User Id.');    
        } else if (!login.password) {
            this.handleError('Please enter a Password');
        }else {
            //make sure any previous error is cleared
            this.setState({error: ''});
            return true;
        }
    }

    handleClick = (login, event) => {
        if (this.validLogin(login)) {
            event.preventDefault();
            //build login payload
            const loginUrl = "http://104.155.129.244:8080/getNotesForUser";
            //const loginUrl = "http://localhost:8080/getNotesForUser";
            const userToken = "Basic "+base64.encode(login.username+":"+login.password)
            var response = FetchUtil.handleGet(loginUrl, userToken);
            response
            .then(response => response.json())
            .then(json => {
                console.log("LoginComponent handleClick() response");
                this.props.handleSuccess(json, userToken, false);
            })    
            .catch((error) => {
                this.handleError('Login failed. Please try again.');
            });
        }
    } //end handleClick()

    render() {
       
        return (
            <div>       
                <div>     
                <LoginFormDialog 
                    openLogin={this.props.openLogin} 
                    error={this.state.error} 
                    styleClass={this.styleClass} 
                    handleClick={this.handleClick}
                    />
                </div>        
            </div>
        );
    }
}
export default LoginComponent;