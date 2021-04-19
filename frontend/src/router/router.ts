import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const ShoppingList = () => import("@components/ShoppingList/ShoppingList.vue");
const Register = () => import("@components/Register/Register.vue");
const Login = () => import("@components/Login/Login.vue");
const HelloWorld = () => import("@components/HelloWorld.vue");

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
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/shoppingList/",
    name: "DefaultShoppingList",
    component: ShoppingList,
  },
  {
    path: "/calendar/",
    name: "DefaultCalendar",
    component: ShoppingList,
  },
  {
    path: "/messages/",
    name: "DefaultMessages",
    component: ShoppingList,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
