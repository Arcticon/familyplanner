<template>
  <div class="flex flex-col h-screen bg-gray-100">
    <Navbar />
    <RouterView v-slot="{ Component }">
      <component :is="Component" />
    </RouterView>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, onErrorCaptured, ref } from "vue";
import { useRouter, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";

export default defineComponent({
  name: "App",
  components: {
    Navbar,
    RouterView,
  },
  setup() {
    const error = ref();
    const { currentRoute } = useRouter();
    watch(currentRoute, (to) => {
      // document.title = to.meta.title || "Vue-Port Shop";
    });
    onErrorCaptured((err) => {
      error.value = err as string;
    });
    return {
      error,
    };
  },
});
</script>

<style>
</style>