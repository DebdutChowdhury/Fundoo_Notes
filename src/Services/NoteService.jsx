import axios from 'axios';
import Axios from './AxiosService';

const axiosService = new Axios()

export default class NoteService {
    baseUrl = "http://fundoonotes.incubation.bridgelabz.com/api/"

    addNote = (data, token) => {
        return axiosService.postMethod(`${this.baseUrl}notes/addNotes`, data, {
            headers: {'Authorization': token}
        })
    }

    getNote = (token) => {
        return axiosService.getMethod(`${this.baseUrl}notes/getNotesList`, {
            headers: {'Authorization': token}
        })
    }

    updateNote = (data, token) => {
        return axiosService.postMethod(`${this.baseUrl}notes/updateNotes`, data, {
            headers: {'Authorization': token}
        })
    }
}