import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const ShoppingList = () => import("@components/ShoppingList/ShoppingList.vue");
const HelloWorld = () => import("@components/HelloWorld.vue");

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: HelloWorld,
  },
  {
    path: "/shoppingList/",
    name: "DefaultShoppingList",
    component: ShoppingList,
    children: [
      {
        path: "/shoppingList/:id",
        name: "ShoppingList",
        component: ShoppingList,
      },
    ],
  },
  {
    path: "/calendar/",
    name: "DefaultCalendar",
    component: ShoppingList,
    children: [
      {
        path: "/calendar/:id",
        name: "Calendar",
        component: ShoppingList,
      },
    ],
  },
  {
    path: "/messages/",
    name: "DefaultMessages",
    component: ShoppingList,
    children: [
      {
        path: "/messages/:id",
        name: "Messages",
        component: ShoppingList,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
