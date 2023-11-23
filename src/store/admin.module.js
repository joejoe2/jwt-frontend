import adminService from "../services/admin.service";

export const admin = {
    namespaced: true,
    state: {},
    actions: {
        getUserList(context, pageParams) {
            return adminService.getUserList(pageParams.page, pageParams.size).then(userList => {
                return Promise.resolve(userList);
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
        changeRoleOf(context, payload) {
            return adminService.changeRoleOf(payload.id, payload.role).then((response) => {
                return response;
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
        activateUser(context, payload) {
            return adminService.activateUser(payload.id).then((response) => {
                return response;
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
        deactivateUser(context, payload) {
            return adminService.deactivateUser(payload.id).then((response) => {
                return response;
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
    mutations: {}
}