<template>
  <div class="flex flex-row mx-auto">
    <div class="flex mt-10 mr-10">
      <div class="space-y-2 m-2">
        <div
          class="flex hover:bg-gray-700 justify-between p-3 hover:text-white cursor-pointer w-60"
          :class="isActive('a')"
          @click="navigateTo('a')"
        >
          <div class="flex">
            <span>NameOfList1</span>
          </div>
          <div class="flex bg-red-600 w-6 h-6 justify-center">
            {{ getAmountOfItemsInShoppingList }}
          </div>
        </div>
        <div
          class="flex hover:bg-gray-700 justify-between p-3 hover:text-white cursor-pointer w-60"
          :class="isActive('b')"
          @click="navigateTo('b')"
        >
          <div class="flex">
            <span>NameOfList2</span>
          </div>
          <div class="flex w-6 h-6 justify-center">
            {{ getAmountOfItemsInShoppingList }}
          </div>
        </div>
      </div>
    </div>
    <div class="bg-gray-200 w-full">
      <div class="flex flex-col items-center space-y-3">
        <div
          class="flex w-full h-24"
          style="
            background-image: url('https://web.getbring.com/assets/images/themes/home_create_list.png');
            background-position-y: 100%;
            background-size: 135%;
          "
        ></div>
        <div class="flex flex-col m-2 space-y-3">
          <div class="flex w-full">
            <input
              class="w-full h-10 p-3 bg-gray-900 text-white rounded"
              placeholder="Produkte hinzufuegen..."
            />
          </div>
          <div class="grid lg:grid-cols-6 gap-1 md:grid-cols-4">
            <transition-group name="fadeOut">
              <ShoppingListItem
                v-for="(shoppingListItem, index) in shoppingList"
                :name="shoppingListItem.name"
                :description="shoppingListItem.description"
                :key="shoppingListItem.name"
                @click="removeShoppingListItem(index)"
                class="fadeOut shadow-md w-24"
              ></ShoppingListItem>
            </transition-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from "../../router/router";
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import ShoppingListItem from "./ShoppingListItem.vue";
export default defineComponent({
  name: "ShoppingList",
  setup() {
    console.log("in setup");
    const list:Object = {
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
      id: params.id || "a",
    };
  },
  data() {
    return {
      shoppingList: this.filterList(this.id),
    };
  },
  components: {
    ShoppingListItem,
  },
  methods: {
    removeShoppingListItem(index: number | string) {
      this.shoppingList.splice(index, 1);
    },
    filterList(index: string) {
      return (<any>this.list)[index];
    },
    isActive(id: string | number) {
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
  computed: {
    getAmountOfItemsInShoppingList(index: string | number) {
      // console.log(this.filterList(index));
      // return this.list[index].length;
      return 6;
    },
  },
});
</script>

<style scoped>
</style>