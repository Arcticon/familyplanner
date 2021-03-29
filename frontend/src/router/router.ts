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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
