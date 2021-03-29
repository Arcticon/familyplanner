<template>
  <div class="grid grid-rows-2 h-28 rounded-md bg-gray-800">
    <div class="flex justify-center">
      <img
        src="https://web.getbring.com/assets/images/items/konfituere.png"
        alt=""
      />
    </div>
    <div class="mt-2 flex overflow-hidden flex-col text-center">
      <!-- <div class=""> -->
      <!-- <p
        class="text-white flex overflow-ellipsis overflow-hidden break-words leading-4 line-clamp-2"
      > -->
      <p
        class="text-white leading-4 overflow-hidden overflow-ellipsis break-words line-clamp-1"
      >
        {{ name }}
      </p>
      <!-- </div> -->
      <!-- <div class=""> -->
      <span class="text-gray-400">{{ description }}</span>
      <!-- </div> -->
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
      required: false,
      default: "a",
    },
  },
  setup: () => {},
});
</script>

<style>
</style>
