import api from './api';
import axios from 'axios';
import authHeader from './auth-header';

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

class AuthService {
    login(username, password) {
        return api
            .post('/web/api/auth/login', {
                username: username,
                password: password
            }, {withCredentials: true})
            .then(response => {
                let info = parseJwt(response.data.access_token);
                let user = {
                    id: info.id,
                    username: info.username,
                    role: info.role,
                    isActive: info.isActive,
                    access_token: response.data.access_token,
                }
                localStorage.setItem('user', JSON.stringify(user));
                return user;
            });
    }

    logout() {
        return api.post('/api/auth/logout', {}, {
            headers: authHeader(), withCredentials: true,
        }).then(response => {
            if (response.status == 200) {
                localStorage.removeItem('user');
            }
        }).catch((error)=>{
            localStorage.removeItem('user');
            return error;
        });
    }

    register(username, password, email, verification) {
        return api.post('/api/auth/register', {
            username: username,
            email: email,
            password: password,
            verification: verification,
        });
    }

    refresh() {
        return axios
            .post(api.defaults.baseURL + '/web/api/auth/refresh', {}, {withCredentials: true})
            .then(response => {
                let info = parseJwt(response.data.access_token);
                let user = {
                    id: info.id,
                    username: info.username,
                    role: info.role,
                    isActive: info.isActive,
                    access_token: response.data.access_token,
                }
                localStorage.setItem('user', JSON.stringify(user));
                return user;
            }).catch((error) => {
                localStorage.removeItem('user');
                return Promise.reject(error);
            });
    }

    issueVerificationCode(email){
        return api.post('/api/auth/issueVerificationCode', {
            email: email,
        }).then(response => {
            return response.data.key;
        });
    }

    changePassword(oldPassword, newPassword){
        return api.post('/api/auth/changePassword', {
            oldPassword: oldPassword,
            newPassword: newPassword,
        }, {headers: authHeader()})
        .then(response => {
            if(response.status==200){
                localStorage.removeItem('user');
            }
            return response;
        });
    }

    forgetPassword(email){
        return api.post('/api/auth/forgetPassword', {
            email: email,
        })
        .then(response => {
            return response;
        });
    }

    resetPassword(token, newPassword){
        return api.post('/api/auth/resetPassword', {
            token: token,
            newPassword: newPassword,
        })
        .then(response => {
            return response;
        });
    }
}

export default new AuthService();