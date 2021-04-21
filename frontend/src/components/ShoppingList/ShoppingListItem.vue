<template>
  <div class="flex flex-col h-32 rounded-md bg-gray-800 space-y-2">
    <div class="flex flex-shrink justify-center mt-1">
      <img
        src="https://web.getbring.com/assets/images/items/konfituere.png"
        alt=""
        class="h-14"
      />
    </div>
    <div class="flex h-14 items-end justify-center m-1">
      <span
        class="text-white text-sm leading-4 overflow-hidden overflow-ellipsis break-words line-clamp-2"
      >
        {{ name }}
      </span>
    </div>
    <div class="flex h-8 overflow-hidden flex-col text-center">
      <span class="text-gray-400 text-xs">{{ description }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ShoppingListItem",
  props: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
  },
  setup: () => {},
});
</script>

<style>
</style>
