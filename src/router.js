import { createWebHistory, createRouter } from "vue-router";
import store from "./store";
import Profile from "./components/account/Profile.vue";
import Login from "./components/public/Login.vue";
import Home from "./components/common/Home.vue";
import Register from './components/public/Register.vue';
import Admin from './components/admin/Admin.vue';
import PasswordChange from './components/account/PasswordChange.vue';
import ForgetPassword from './components/public/ForgetPassword.vue';
import ResetPassword from './components/public/ResetPassword.vue';

const routes = [
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/changePassword",
    name: "PasswordChange",
    component: PasswordChange,
  },
  {
    path: "/forgetPassword",
    name: "ForgetPassword",
    component: ForgetPassword,
  },
  {
    path: "/resetPassword",
    name: "ResetPassword",
    component: ResetPassword,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
  },
  //for 404
  { path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to) => {
  if(to.name=="NotFound"){
    router.replace({ name: "Home" });
  }

  if ((to.name != "Login" && to.name != "Register" && to.name != "ForgetPassword" && to.name != "ResetPassword") && !store.state.auth.status.loggedIn) {
    router.push({ name: "Login" });
  } else if ((to.name == "Login" || to.name == "Register" || to.name == "ForgetPassword" || to.name == "ResetPassword") && store.state.auth.status.loggedIn) {
    router.replace({ name: "Home" });
  }

  if (to.name == "Admin" && store.state.auth.user.role != "ADMIN") {
    router.replace({ name: "Home" });
  }
});

export default router;