<template>
  <div class="flex flex-col space-y-3">
    <div class="flex bg-white h-10 items-center">
      <span class="ml-3">Zuletzt verwendet</span>
    </div>
    <div class="flex flex-row flex-wrap gap-1">
      <transition-group name="fadeOut">
        <ShoppingListItem
          v-for="(shoppingListItem, index) in lastUsed"
          :name="shoppingListItem.name"
          :description="shoppingListItem.description"
          :key="shoppingListItem.name"
          @click="addLastUsedItemToShoppingList(index)"
          class="fadeOut shadow-md w-28"
        ></ShoppingListItem>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import router from "../../router/router";
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import ShoppingListItem from "./ShoppingListItem.vue";
export default defineComponent({
  name: "ShoppingListLastUsed",
  emits: ["addLastUsedItemToShoppingList"],
  props: ["newItem"],
  setup() {
    console.log("in setup");
    // console.log(params);

    return {};
  },
  data() {
    console.log("data");

    const lastUsed: Array<{ name: string; description: string }> = [
      {
        name: "Test1abcdefghijklmnopqrstuvwxyz",
        description: "Test",
      },
    ];

    return {
      lastUsed,
    };
  },
  components: {
    ShoppingListItem,
  },
  methods: {
    addLastUsedItemToShoppingList(index: number) {
      console.log("child: addLastUsedItemToShoppingList");
      this.$emit("addLastUsedItemToShoppingList", this.lastUsed[index]);
      this.lastUsed.splice(index, 1);
    },
  },
  watch: {
    newItem: function (newVal, oldVal) {
      console.log("child: newItem");
      if (newVal) {
        this.lastUsed.push(newVal);
      }
    },
  },
});
</script>

<style scoped>
</style>