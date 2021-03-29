<template>
  <div class="container mx-auto flex-1">
    <div class="grid grid-cols-12 h-full">
      <div class="col-start-2 col-span-3">
        <div
          class="grid grid-cols-5 hover:bg-gray-700 hover:text-white cursor-pointer"
          :class="isActive('a')"
          @click="navigateTo('a')"
        >
          <div class="flex col-start-1 col-span-3 ml-5">
            <span>NameOfList1</span>
          </div>
          <div class="flex justify-center col-start-4 col-span-1">
            <span>8</span>
          </div>
        </div>
        <div
          class="grid grid-cols-5 hover:bg-gray-700 hover:text-white cursor-pointer"
          :class="isActive('b')"
          @click="navigateTo('b')"
        >
          <div class="flex col-start-1 col-span-3 ml-5">
            <span>NameOfList2</span>
          </div>
          <div class="flex justify-center col-start-4 col-span-1">
            <span>6</span>
          </div>
        </div>

        <RouterLink
          active-class="bg-gray-900 text-white"
          :to="{ name: 'ShoppingList', params: { id: 'a' } }"
          class="grid grid-cols-5"
        >
        </RouterLink>
        <RouterLink
          active-class="bg-gray-900 text-white"
          :to="{ name: 'ShoppingList', params: { id: 'b' } }"
          class="grid grid-cols-5"
        >
        </RouterLink>
      </div>
      <div class="col-start-5 col-span-6 ml-2 h-full">
        <div class="grid lg:grid-cols-6 gap-1 md:grid-cols-4">
          <transition-group name="fadeOut">
            <ShoppingListItem
              v-for="(shoppingListItem, index) in shoppingList"
              :name="shoppingListItem.name"
              :description="shoppingListItem.description"
              :key="shoppingListItem.name"
              @click="removeShoppingListItem(index)"
              class="fadeOut shadow-md"
            ></ShoppingListItem>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// class="transition ease-linear fadeOut"
import router from "../../router/router";
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import ShoppingListItem from "./ShoppingListItem.vue";
export default defineComponent({
  name: "ShoppingList",
  setup() {
    console.log("in setup");
    const list = {
      a: [
        {
          name: "Test1abcdefghijklmnopqrstuvwxyz",
        },
        {
          name: "Test2",
          description: "Qux",
        },
        {
          name: "Test3",
          description: "Qux",
        },
        {
          name: "Test4",
          description: "Qux",
        },
        {
          name: "Test5",
          description: "Qux",
        },
        {
          name: "Test6",
          description: "Qux",
        },
        {
          name: "Test7",
          description: "Qux",
        },
        {
          name: "Test8",
          description: "Qux",
        },
      ],
      b: [
        {
          name: "1",
        },
        {
          name: "2",
          description: "Phyllis",
        },
        {
          name: "3",
          description: "Phyllis",
        },
        {
          name: "4",
          description: "Phyllis",
        },
        {
          name: "5",
          description: "Phyllis",
        },
        {
          name: "6",
          description: "Phyllis",
        },
      ],
    };

    const { params } = useRoute();
    // console.log(params);

    return {
      list: list,
      id: params.id,
    };
  },
  data() {
    const { params } = useRoute();
    return {
      shoppingList: this.filterList(params.id),
    };
  },
  components: {
    ShoppingListItem,
  },
  methods: {
    removeShoppingListItem(index: number) {
      this.shoppingList.splice(index, 1);
    },
    filterList(index: String | Number) {
      return this.list[index];
    },
    isActive(id: String | Number) {
      return {
        "bg-gray-900": this.id === id,
        "text-white": this.id === id,
      };
    },
    navigateTo(id: string) {
      router.push({ name: "ShoppingList", params: { id: id } });
    },
  },
  watch: {
    $route(to, from) {
      // console.log("from:", from);
      // console.log("to:", to);
      this.id = to.params.id;
      this.shoppingList = this.filterList(to.params.id);
    },
  },
});
</script>

<style scoped>
</style>