import axios from "axios";
import store from "../store/index"
import router from "../router";
import authHeader from "./auth-header"
const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000,
    //withCredentials: true, // for http only cookie
});
instance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
instance.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        if (error.response && error.response.status == 401) {
            let success = false, locked = false;
            await navigator.locks.request('refreshing_tokens', { mode: 'exclusive', ifAvailable: true },
                async lock => {
                    if (!lock) {
                        // The lock was not granted - get out fast.
                        locked = false;
                        return;
                    }// The lock was granted, and no other running code in this origin is holding
                    locked = true;
                    if (store.state.auth.status.loggedIn) {
                        await store.dispatch('auth/refresh').then(() => {
                            success = true;
                            error.config.headers = authHeader();
                        }).catch(() => {
                            success = false;
                            error.message = "refresh token expired, please login again !";
                        });
                    }
                });
            if (success && locked) {
                return instance(error.config);
            } else if (!locked) {
                //sleep 1 sec
                await new Promise(r => setTimeout(r, 1000));
                error.config.headers = authHeader();
                return instance(error.config);
            } else {
                router.push({ name: "Login" });
            }
        } else {
            return Promise.reject(error);
        }
    }
);
export default instance;