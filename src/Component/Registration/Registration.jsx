import React from 'react';
import './Registration.css'
import logo from '../Assets/googleimg.svg'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Snackbar from "@material-ui/core/Snackbar";
import { Slide } from '@material-ui/core';
import UserServices from "../../Services/UserService";
import MuiAlert from '@material-ui/lab/Alert';

const service = new UserServices();
const fname = React.createRef();
const lname = React.createRef();
const email = React.createRef();
const pass = React.createRef();
const cpass = React.createRef();
const save = React.createRef();

export default class Registration extends React.Component {

    constructor(probs) {
        super(probs)
        this.state = {
            firstname: "",
            lastname: "",
            username: "",
            password: "",
            confirmpassword: "",
            firstnameError: "",
            lastnameError: "",
            usernameError: "",
            passwordError: "",
            confirmpasswordError: "",
            firstnameErrorMsg: "",
            lastnameErrorMsg: "",
            usernameErrorMsg: "you can use numbers,letters and periods",
            passwordErrorMsg: "",
            confirmpasswordErrorMsg: "",
            showpassword: true,
            show: false,
            snackmsg: ""
        };
    }
    handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value })
    }
    handleClick = (e) => {
        this.setState({ showpassword: !this.state.showpassword })

    }
  

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ show: false })
    };
    
    validationCheck = () => {
        this.setState({
            firstnameError: false,
            firstnameErrorMsg: '',
            lastnameError: false,
            lastnameErrorMsg: '',
            usernameError: false,
            usernameErrorMsg: '',
            passwordError: false,
            passwordErrorMsg: '',
            confirmpasswordError: false,
            confirmpasswordErrorMsg: ''
        })
        var valid = true;

        let fnamePat = "[A-Z]{1}[a-z]*";
        let fnamePattern = new RegExp(fnamePat);
        if (!fnamePattern.test(this.state.firstname)) {
            this.setState({ firstnameError: true })
            this.setState({ firstnameErrorMsg: "Invalid first name" })
            valid = false;
        }

        if (this.state.firstname.length == 0) {
            this.setState({ firstnameError: true })
            this.setState({ firstnameErrorMsg: "Enter first name " })
            valid = false;
        }

        let lnamePat = "[A-Z]+([ '-][a-zA-Z]+)*";
        let lnamePattern = new RegExp(lnamePat);
        if (!lnamePattern.test(this.state.firstname)) {
            this.setState({ lastnameError: true })
            this.setState({ lastnameErrorMsg: "Invalid last name" })
            valid = false;
        }

        if (this.state.firstname.length == 0 && this.state.lastname.length == 0) {
            this.setState({ firstnameError: true })
            this.setState({ lastnameError: true })
            this.setState({ firstnameErrorMsg: "Enter first name, lastname" })
            valid = false;
        }


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

        // let pwdpatter = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$";
        // let pwdPattern = new RegExp(pwdpatter);
        // if (!pwdPattern.test(this.state.username)) {
        //     this.setState({ passwordError: true })
        //     this.setState({ passwordErrorMsg: "Invalid Password" })
        //     valid = false;
        // }

        if (this.state.password.length != 0 && this.state.password != this.state.confirmpassword) {
            this.setState({ passwordError: true })
            this.setState({ passwordErrorMsg: "password didn't match " })
            valid = false;
        }
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
    submit = () => {

        if (this.validationCheck()) {
            this.setState({ show: true })
            let data = {
                "firstName": this.state.firstname,
                "lastName": this.state.lastname,
                "email": this.state.username,
                "service": "advance",
                "password": this.state.password
            }
            console.log(data);
            service.registerUser(data).then((result) => {
                console.log(result);
                this.setState({ snackmsg: "Registrationn succeccfull" })
                this.setState({ show: true })
                this.props.history.push('/login');
            })
            .catch((e)=>{console.log(e);
                this.setState({ snackmsg: "Registration error" })
                this.setState({ show: true })
            });
        }

        else {
            this.setState({ snackmsg: "Please enter valid input" })
            this.setState({ show: true })
        }

    }
    
    componentDidMount(){
        fname.current.focus()
    }

    fnameKeyDown = (e) => {
        if(e.key === "Enter"){
            lname.current.focus();
        }
    }

    lnameKeyDown = (e) => {
        if(e.key === "Enter"){
            email.current.focus();
        }
    }

    emailKeyDown = (e) => {
        if(e.key === "Enter"){
            pass.current.focus()
        }
    }

    passKeyDown = (e) => {
        if(e.key === "Enter"){
            cpass.current.focus()
        }
    }

    confKeyDown = (e) => {
        if(e.key === "Enter"){
            save.current.focus()
        }
    }

    saveKeyDown = (e) => {
        if(e.key === "Enter"){
            this.submit()
        }
    }

    render(){
        return (
            <>
            <div className="fullbody">
                <div className="registerbody">
                    <div className="innerbody">
                        <div className="form">
                            <div className="google">
                                <span id="f">G</span><span id="o1">o</span><span id="o2">o</span>
                                <span id="d">g</span><span id="o3">le</span>
                            </div>
                            <div className="create">Create your Google Account</div>
                            <div className="inputs">
                                <div className="inline">
                                    <TextField inputRef={fname} onKeyDown={this.fnameKeyDown} id="outlined-basic" className="fn" variant="outlined" name="firstname" label="First name" onChange={this.handleChange}
                                    error={this.state.firstnameError} size="small" margin="dense" helperText={this.state.firstnameErrorMsg}/>

                                    <TextField inputRef={lname} onKeyDown={this.lnameKeyDown} id="outlined-basic" className="fn space" variant="outlined" name="lastname" onChange={this.handleChange}
                                    error={this.state.lastnameError} label="Last name" size="small" margin="dense" helperText={this.state.lastnameErrorMsg}/>
                                </div>
                                <div>
                                    <TextField inputRef={email} onKeyDown={this.emailKeyDown} id="outlined-basic" variant="outlined" name="username" fullWidth label="Username" onChange={this.handleChange}
                                        error={this.state.usernameError} size="small" margin="dense" helperText={this.state.usernameErrorMsg}/>  <br />
                                </div>
                                <a href="#"> Use my current email address instead </a>
                                <div className="inline">
                                    <TextField inputRef={pass} onKeyDown={this.passKeyDown} id="outlined-basic" className="fn" type={this.state.showpassword ? "password" : "type"} variant="outlined" name="password" label="Password" size="small" margin="dense" onChange={this.handleChange}
                                        error={this.state.passwordError} helperText={this.state.passwordErrorMsg}/>

                                    <TextField inputRef={cpass} onKeyDown={this.confKeyDown} id="outlined-basic" className="fn space" type={this.state.showpassword ? "password" : "type"} variant="outlined" onChange={this.handleChange} error={this.state.confirmpasswordError} name="confirmpassword" label="Confirm Password" size="small" margin="dense" helperText={this.state.confirmpasswordErrorMsg}/>
                                </div>
                                <span>Use 8 or more characters with a mix of letters, numbers & symbols</span>
                                <div>
                                    <input type="checkbox" id="radio" onClick={this.handleClick} value="Show password" />
                                    <label htmlFor="radio"> Show password</label>
                                </div>
                                <div className="inline__buttons">
                                    <Link to="/login">Sign in instead</Link>
                                    <Button ref={save} onKeyDown={this.saveKeyDown} variant="outlined" onClick={this.submit} size="small">Submit</Button>
                                    <Snackbar
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        TransitionComponent={Slide}
                                        open={this.state.show}
                                        autoHideDuration={1000}
                                        onClose={this.handleClose}
                                        message={this.state.snackmsg}
                                    />
                                    {/* <Alert onClose={this.handleClose} severity="success">
                                      This is a success message!
                                     </Alert>
                                    </Snackbar> */}
                                </div>
                            </div>                            
                            
                        </div>
                        <div className="image">
                            <img src="https://ssl.gstatic.com/accounts/signup/glif/account.svg" alt="" width="244" height="244"/>
                            <p className="para">One account. All of Google<br></br> working for you.</p>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}