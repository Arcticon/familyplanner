<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <button
            type="button"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <!--
            Icon when menu is closed.

            Heroicon name: outline/menu

            Menu open: "hidden", Menu closed: "block"
          -->
            <svg
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <!--
            Icon when menu is open.

            Heroicon name: outline/x

            Menu open: "block", Menu closed: "hidden"
          -->
            <svg
              class="hidden h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div
          class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div
            class="flex-shrink-0 flex items-center text-white font-bold text-xl"
          >
            <h1>Familyplanner</h1>
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4 text-gray-300">
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
              <RouterLink
                active-class="bg-gray-900 text-white"
                :to="{ name: 'Home' }"
                class="px-3 py-2 rounded-md text-sm font-medium hover:text-white hover:bg-gray-700"
              >
                Startseite
              </RouterLink>
              <RouterLink
                active-class="bg-gray-900 text-white"
                :to="{ name: 'DefaultShoppingList' }"
                ex
                class="px-3 py-2 rounded-md text-sm font-medium hover:text-white hover:bg-gray-700"
              >
                Einkaufsliste
              </RouterLink>
              <RouterLink
                active-class="bg-gray-900 text-white"
                :to="{ name: 'DefaultCalendar' }"
                ex
                class="px-3 py-2 rounded-md text-sm font-medium hover:text-white hover:bg-gray-700"
              >
                Kalendar
              </RouterLink>
              <RouterLink
                active-class="bg-gray-900 text-white"
                :to="{ name: 'DefaultMessages' }"
                ex
                class="px-3 py-2 rounded-md text-sm font-medium hover:text-white hover:bg-gray-700"
              >
                Nachrichten
              </RouterLink>
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <div v-if="loggedIn" class="flex">
            <button
              class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span class="sr-only">View notifications</span>
              <!-- Heroicon name: outline/bell -->
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>

            <!-- Profile dropdown -->
            <div class="ml-3 relative">
              <div>
                <button
                  type="button"
                  class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  id="user-menu"
                  aria-expanded="false"
                  aria-haspopup="true"
                  @click="isProfileOpen = !isProfileOpen"
                >
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </button>
              </div>

              <!--
                Dropdown menu, show/hide based on menu state.

                Entering: "transition ease-out duration-100"
                  From: "transform opacity-0 scale-95"
                  To: "transform opacity-100 scale-100"
                Leaving: "transition ease-in duration-75"
                  From: "transform opacity-100 scale-100"
                  To: "transform opacity-0 scale-95"
              -->
              <div
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
                v-show="isProfileOpen"
              >
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  >Your Profile</a
                >
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  >Settings</a
                >
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  @click="logOut"
                  >Sign out</a
                >
              </div>
            </div>
          </div>
          <div v-if="!loggedIn" class="flex text-gray-300">
            <RouterLink
              active-class="bg-gray-900 text-white"
              :to="{ name: 'Login' }"
              ex
              class="px-3 py-2 rounded-md text-sm font-medium hover:text-white hover:bg-gray-700"
            >
              Login
            </RouterLink>
            <RouterLink
              active-class="bg-gray-900 text-white"
              :to="{ name: 'Register' }"
              ex
              class="px-3 py-2 rounded-md text-sm font-medium hover:text-white hover:bg-gray-700"
            >
              Registrieren
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <!-- <div class="sm:hidden" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1 text-gray-300">
        <RouterLink
          active-class="bg-gray-900 text-white"
          :to="{ name: 'Home' }"
          class="px-3 py-2 rounded-md text-sm font-medium hover:text-white hover:bg-gray-700"
        >
          Dashboard
        </RouterLink>
        <RouterLink
          active-class="bg-gray-900 text-white"
          :to="{ name: 'ShoppingList', params: { id: undefined } }"
          class="px-3 py-2 rounded-md text-sm font-medium hover:text-white hover:bg-gray-700"
        >
          ShoppingList
        </RouterLink>
      </div>
    </div> -->
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useAuth } from "../modules/auth";
import { formatPromise } from "../modules/util";
const { logout } = useAuth();
export default defineComponent({
  name: "Navbar",
  data: () => {
    return {
      isProfileOpen: false,
    };
  },
  setup: () => {
    const { user } = useAuth();
    let loggedIn = ref(!!user.value);
    console.log({ user });
    watch(user, (newUserValue: any) => {
      console.log("user changed: ", newUserValue);
      loggedIn.value = !!newUserValue;
    });
    watch(loggedIn, (newLoggedInValue: any) => {
      console.log("loggedIn changed: ", newLoggedInValue);
    });

    const isOpen = ref(false);
    return {
      isOpen,
      loggedIn,
    };
  },
  methods: {
    async logOut() {
      const [err] = await formatPromise(logout());
      this.loggedIn = !!err;
    },
  },
});
</script>

<style scoped>
</style>
