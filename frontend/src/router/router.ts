import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { useAuth } from "../modules/auth";

const ShoppingList = () => import("@components/ShoppingList/ShoppingList.vue");
const Register = () => import("@components/Register/Register.vue");
const Login = () => import("@components/Login/Login.vue");
const HelloWorld = () => import("@components/HelloWorld.vue");
const { user } = useAuth();

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: HelloWorld,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    beforeEnter: (_, __, next) => {
      if (user.value) {
        //already authenticated
        next(false);
      } else {
        //not authenticated
        next();
      }
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: (_, __, next) => {
      if (user.value) {
        //already authenticated
        next(false);
      } else {
        //not authenticated
        next();
      }
    },
  },
  {
    path: "/shoppingList/",
    name: "DefaultShoppingList",
    component: ShoppingList,
    beforeEnter: (_, __, next) => {
      if (user.value) {
        //already authenticated
        next();
      } else {
        //not authenticated
        next({ name: "Login" });
      }
    },
  },
  {
    path: "/calendar/",
    name: "DefaultCalendar",
    component: ShoppingList,
    beforeEnter: (_, __, next) => {
      if (user.value) {
        //already authenticated
        next();
      } else {
        //not authenticated
        next({ name: "Login" });
      }
    },
  },
  {
    path: "/messages/",
    name: "DefaultMessages",
    component: ShoppingList,
    beforeEnter: (_, __, next) => {
      if (user.value) {
        //already authenticated
        next();
      } else {
        //not authenticated
        next({ name: "Login" });
      }
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
