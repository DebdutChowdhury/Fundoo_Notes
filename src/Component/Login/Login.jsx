import React from 'react';
import './Login.css'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar';
import UserService from "../../Services/UserService";
import { createRef } from 'react';

const service = new UserService();
const email = React.createRef();
const pass = React.createRef();
const save = React.createRef();

export default class Login extends React.Component {
    constructor(probs) {
        super(probs);
        this.state = {
            "username": "",
            "password": "",
            "usernameError": false,
            "usernameMsg": "",
            "passwordError": false,
            "passwordErrorMsg": "",
            "showpassword": true,
            "show": false,
            "snackmsg": ""
        }

    }
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ show: false })
    };
    handlechange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value })
    }
    validationCheck = () => {
        this.setState({
            usernameError: false,
            usernameErrorMsg: '',
            passwordError: false,
            passwordErrorMsg: '',
        })
        var valid = true;

        let patter = "^[0-9a-zA-Z]+([.\\-_+][0-9a-zA-Z]+)*@[a-z0-9A-Z]+.[a-z]{2,4}([.][a-zA-Z]{2,})*$";
        let pattern = new RegExp(patter);
        if (!pattern.test(this.state.username)) {
            this.setState({ usernameError: true })
            this.setState({ usernameErrorMsg: "Invalid Gmail address" })
            valid = false;
        }

        if (this.state.username.length == 0) {
            this.setState({ usernameError: true })
            this.setState({ usernameErrorMsg: "Choose Gmail address" })
            valid = false;
        }

        //    let pat = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$";
        //    let patternPwd = new RegExp(pat);
        //    if (!patternPwd.test(this.state.password)) {
        //        this.setState({ passwordError: true })
        //        this.setState({ passwordErrorMsg: "Invalid Password" })
        //        valid = false;
        //    }

        if (this.state.password.length < 8) {
            this.setState({ passwordError: true })
            this.setState({ passwordErrorMsg: "password should be atleast 8 characters" })
            valid = false;
        }

        if (this.state.password.length == 0) {
            this.setState({ passwordError: true })
            this.setState({ passwordErrorMsg: "Enter a password" })
            valid = false;
        }

        return valid;

    }
    handleClick = (e) => {
        this.setState({ showpassword: !this.state.showpassword })

    }
    submit = () => {

        if (this.validationCheck()) {
            this.setState({ show: true })
            let data = {
                "email": this.state.username,
                "password": this.state.password,
                "server": "advance"
            }
            console.log(data);
            service.loginUser(data).then((result) => {
                console.log("Result: ", result);
                localStorage.setItem('Token', result.data.id);
                localStorage.setItem('FirstName', result.data.firstName);
                localStorage.setItem('LastName', result.data.lastName);
                localStorage.setItem('Email', result.data.email);

                localStorage.setItem('userDetails', JSON.stringify(result.data))
                console.log(result.data.id);
                this.setState({ snackmsg: "login successfull" })
                this.setState({ show: true })
                this.props.history.push('/dashboard');
            }).catch((error) => {
                console.log(error);
                this.setState({ snackmsg: "login error" })
                this.setState({ show: true })
            })
        }
        else {
            this.setState({ snackmsg: "Please Enter Valid details" })
            this.setState({ show: true })
        }
    }

    // componentDidMount(){
    //     email.current.focus();
    // }

    emailKeyDown = (e) => {
        if(e.key === "Enter"){
            pass.current.focus();
        }
    }

    passKeyDown = (e) => {
        if(e.key === "Enter"){
            save.current.focus();
        }
    }

    saveKeyDown = (e) => {
        if(e.key === "Enter"){
            this.submit()
        }
    }

    render() {
        console.log(this.props.history);
        return (
            <>

                <div className="fullbody">
                    <div className="loginbody">
                        <div className="topcontent">
                            <div className="fitWidth">
                                <span style={{ color: '#4385F4', fontSize: '20px', fontWeight: 500 }}>G</span>
                                <span style={{ color: '#EA4335', fontSize: '20px', fontWeight: 500 }}>o</span>
                                <span style={{ color: '#FBBD35', fontSize: '20px', fontWeight: 500 }}>o</span>
                                <span style={{ color: '#4385F4', fontSize: '20px', fontWeight: 500 }}>g</span>
                                <span style={{ color: '#4EA853', fontSize: '20px', fontWeight: 500 }}>l</span>
                                <span style={{ color: '#EA4335', fontSize: '20px', fontWeight: 500 }}>e</span>
                            </div>
                            <p className="fonty" > Sign in</p>
                            <div >  Use your Google Account </div>
                            <div className="textfields">
                                <TextField inputRef={email} onKeyDown={this.emailKeyDown} id="outlined-basic" error={this.state.usernameError} helperText={this.state.usernameErrorMsg} className="TFwidth" variant="outlined" name="username" label="Email or phone " size="small" onChange={this.handlechange} margin="dense" />

                                <TextField inputRef={pass} onKeyDown={this.passKeyDown} id="outlined-basic" type={this.state.showpassword ? "password" : "type"} error={this.state.passwordError} helperText={this.state.passwordErrorMsg} variant="outlined" className="TFwidth" name="password" label="Password" size="small" margin="dense" onChange={this.handlechange} />
                                <div className="pas">
                                    <input type="checkbox" id="radio" onClick={this.handleClick} value="Show password" />
                                    <label htmlFor="radio"> Show password</label>
                                </div>
                            </div>

                        </div>
                        <div className="notComp">Not your computer? Use Guest mode to sign in privately.<br></br><a className="link" href="https://support.google.com/chrome/answer/6130773?hl=en-GB" >Learn more</a></div>
                        <div className="forget">Forget password?</div>
                        <div className="createaccount" onClick={() => { this.props.history.push('/') }}>Create Account</div>
                        <div className="inline__button">
                            <Button ref={save} onKeyDown={this.saveKeyDown} variant="outlined" size="small" onClick={this.submit}>Sign in</Button>
                            <Snackbar
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left'
                                }}
                                open={this.state.show}
                                autoHideDuration={1000}
                                onClose={this.handleClose}
                                message={this.state.snackmsg}
                            />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}