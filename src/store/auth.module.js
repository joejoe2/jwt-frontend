import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null };

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login(context, payload) {
            return AuthService.login(payload.username, payload.password).then(
                user => {
                    context.commit('loginSuccess', user);
                    return Promise.resolve(user);
                }).catch(error => {
                    context.commit('loginFailure');
                    if (error.response && error.response.status/100 == 4) {
                        error.message = error.response.data.message || "Incorrect username or password !";
                    } else if (error.response && error.response.data) {
                        error.message = error.response.data.message || "Unknown error, please try again later !";
                    } else {
                        error.message = "Unknown error, please try again later !";
                    }
                    return Promise.reject(error);
                });
        },
        logout(context) {
            return AuthService.logout().then(data => {
                context.commit('logoutSuccess');
                return Promise.resolve(data);
            }).catch(error => {
                context.commit('logoutSuccess');
                if (error.response && error.response.status/100 == 4) {
                    error.message = "Invalid token !";
                } else if (error.response && error.response.data) {
                    error.message = error.response.data.message || "Unknown error, please try again later !";
                } else {
                    error.message = "Unknown error, please try again later !";
                }

                return Promise.reject(error);
            });
        },
        register(context, payload) {
            return AuthService.register(payload.username, payload.password, payload.email, payload.verification).then(
                response => {
                    return Promise.resolve(response.data);
                },
                error => {
                    if (error.response && error.response.status/100 == 4) {
                        error.errors = error.response.data.errors;
                        error.message = error.response.data.message || "";
                    } else if (error.response && error.response.data) {
                        error.message = error.response.data.message || "Unknown error, please try again later !";
                    } else {
                        error.message = "Unknown error, please try again later !";
                    }
                    return Promise.reject(error);
                }
            );
        },
        refresh(context) {
            return AuthService.refresh().then(
                user => {
                    context.commit('refreshSuccess', user);
                    return Promise.resolve(user);
                }).catch(error => {
                    context.commit('refreshFailure');
                    if (error.response && error.response.status/100 == 4) {
                        error.message = "Invalid token !";
                    } else if (error.response && error.response.data) {
                        error.message = error.response.data.message || "Unknown error, please try again later !";
                    } else {
                        error.message = "Unknown error, please try again later !";
                    }
                    return Promise.reject(error);
                });
        },
        issueVerificationCode(context, payload) {
            return AuthService.issueVerificationCode(payload.email).then(
                verificationKey => {
                    return Promise.resolve(verificationKey);
                }).catch(
                    error => {
                        if (error.response && error.response.status/100 == 4) {
                            error.errors = error.response.data.errors;
                            error.message = error.response.data.message || "";
                        } else if (error.response && error.response.data) {
                            error.message = error.response.data.message || "Unknown error, please try again later !";
                        } else {
                            error.message = "Unknown error, please try again later !";
                        }
                        return Promise.reject(error);
                    });
        },
        changePassword(context, payload) {
            return AuthService.changePassword(payload.oldPassword, payload.newPassword).then(() => {
                context.commit('logoutSuccess');
                return Promise.resolve("Your password is successfully changed !");
            }).catch(error => {
                if (error.response && error.response.status/100 == 4) {
                    error.errors = error.response.data.errors;
                    error.message = error.response.data.message || "";
                } else if (error.response && error.response.data) {
                    error.message = error.response.data.message || "Unknown error, please try again later !";
                } else {
                    error.message = "Unknown error, please try again later !";
                }
                return Promise.reject(error);
            });
        },
        forgetPassword(context, payload) {
            return AuthService.forgetPassword(payload.email).then(() => {
                return Promise.resolve("The password reset link is sent to your email !");
            }).catch(error => {
                if (error.response && error.response.status/100 == 4) {
                    error.errors = error.response.data.errors;
                    error.message = error.response.data.message || "";
                } else if (error.response && error.response.data) {
                    error.message = error.response.data.message || "Unknown error, please try again later !";
                } else {
                    error.message = "Unknown error, please try again later !";
                }
                return Promise.reject(error);
            });
        },
        resetPassword(context, payload) {
            return AuthService.resetPassword(payload.token, payload.newPassword).then(() => {
                return Promise.resolve("Your password is successfully reset !");
            }).catch(error => {
                if (error.response && error.response.status/100 == 4) {
                    error.errors = error.response.data.errors;
                    error.message = error.response.data.message || "";
                } else if (error.response && error.response.data) {
                    error.message = error.response.data.message || "Unknown error, please try again later !";
                } else {
                    error.message = "Unknown error, please try again later !";
                }
                return Promise.reject(error);
            });
        },
    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        logoutSuccess(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        registerSuccess(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        refreshSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        refreshFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
    }
};