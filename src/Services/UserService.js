// calll
// api and all services

// import axios from "axios";

// // const axios = require ('axios')
// export default class UserService{
//     registerUser(data){
//         const headers = {'Content-Type': 'application/json'};
//         return axios.post('http://fundoonotes.incubation.bridgelabz.com/api/user/userSignUp', data, {headers:{'Content-Type': 'application/json'}})
//     }
    
//     loginUser(data){
//         const headers = {'Content-Type': 'application/json'};
//         return axios.post('http://fundoonotes.incubation.bridgelabz.com/api/user/login', data, {headers:{'Content-Type': 'application/json'}})
//     }
// }

import AxiosService from './AxiosService'

const axios = new AxiosService()

export default class UserService {
    baseUrl = "http://fundoonotes.incubation.bridgelabz.com/api/"

    registerUser(data){
        // const headers = {'Content-Type': 'application/json'};
        // return axios.post('http://fundoonotes.incubation.bridgelabz.com/api/user/userSignUp', data, {headers:{'Content-Type': 'application/json'}})
        return axios.postMethod(`${this.baseUrl}user/userSignUp`, data)
    }

    loginUser(data){
        return axios.postMethod(`${this.baseUrl}user/login`, data)
    }
}