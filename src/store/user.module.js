import UserService from '../services/user.service';

export const user = {
    namespaced: true,
    state: {
        profile: {
            id: "",
            username: "",
            email: "",
            role: "",
            registeredAt: ""
        },
    },
    actions: {
        getProfile(context) {
            return UserService.getProfile().then(profile => {
                context.commit('setProfile', profile);
                return Promise.resolve(profile);
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
        }
    },
    mutations: {
        setProfile(state, profile) {
            state.profile = profile;
        },
    }
}