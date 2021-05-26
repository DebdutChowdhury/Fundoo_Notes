import axios from 'axios'

export default class AxiosService {
    postMethod = (url, data) => {
        return axios.post(url, data)
    }

    getMethod = (url) => {
        return axios.get(url)
    }

}