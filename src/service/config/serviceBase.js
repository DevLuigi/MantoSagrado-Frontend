import axios from 'axios'
import Cookies from "js-cookie";
import { API_URL, Errors } from './config'

export default class ServiceBase {
    constructor(mainPath) {
        this.api = axios.create({
            baseURL: `${API_URL}${mainPath}`
        });
    }

    getTokenClient() {
        let logged = Cookies.get('user-logged-client');
        if (logged) {
            let cookie = JSON.parse(logged);
            return cookie.token;
        } else {
            return '';
        }
    }

    getTokenAdmin() {
        let logged = Cookies.get('user-logged');
        if (logged) {
            let cookie = JSON.parse(logged);
            return cookie.token;
        } else {
            return '';
        }
    }

    getUserAdmin() {
        let logged = Cookies.get('user-logged-admin');
        if (logged) {
            let cookie = JSON.parse(logged);
            return cookie;
        } else {
            return {};
        }
    }

    getUserClient() {
        let logged = Cookies.get('user-logged-client');
        if (logged) {
            let cookie = JSON.parse(logged);
            return cookie;
        } else {
            return {};
        }
    }

    async get(path) {
        try {
            let r = await this.api.get(path);
            return this.handleResponse(r);
        } catch (e) {
            return this.handleError(e);
        }
    }    

    async post(path, body) {
        try {
            let r = await this.api.post(path, body);
            return this.handleResponse(r);
        } catch (e) {
            return this.handleError(e);
        }
    }

    async postImage(path, body) {
        try {
            let r = await this.api.post(path, body, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            return this.handleResponse(r);
        } catch (e) {
            return this.handleError(e);
        }
    }

    async put(path, body) {
        try {
            let r = await this.api.put(path, body);
            return this.handleResponse(r);
        } catch (e) {
            return this.handleError(e);
        }
    }

    async patch(path) {
        try {
            let r = await this.api.patch(path);
            return this.handleResponse(r);
        } catch (e) {
            return this.handleError(e);
        }
    }

    async patchImage(path) {
        try {
            let r = await this.api.patch(path, {}, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            return this.handleResponse(r);
        } catch (e) {
            return this.handleError(e);
        }
    }

    async delete(path) {
        try {
            let r = await this.api.delete(path);
            return this.handleResponse(r);
        } catch (e) {
            return this.handleError(e);
        }
    }

    handleResponse(response) {
        const { data, status } = response
        return { data, status } || {};
    }


    handleError(e) {
        return this.getError(e);
    }


    getError(e) {
        if (e.response?.data?.error) {
            return {
                error: e.response.data.error,
                errorName: e.response.data.errorName ?? Errors.General,
                message: e.message,
                status: e.status
            }
        } else if (e.response?.data) {
            return {
                error: e.response.data,
                errorName: e.response.data,
                message: e.message,
                status: e.status
            }
        } else {
            return {
                error: 'Ocorreu um erro. Já estamos tentando resolver!',
                errorName: Errors.Unknown,
                message: e.message,
                status: e.status
            }      
        }
    }
}