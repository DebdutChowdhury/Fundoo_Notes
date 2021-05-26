import axios from 'axios';
import Axios from './AxiosService';

const axiosService = new Axios()

export default class NoteService {
    baseUrl = "http://fundoonotes.incubation.bridgelabz.com/api/"

    addNote = (data) => {
        return axiosService.postMethod(`${this.baseUrl}notes/addNotes`, data)
    }

    getNote = () => {
        return axiosService.getMethod(`${this.baseUrl}notes/getNotesList`)
    }
}