<template>
  <div class="flex overflow-x-hidden">
    <div class="flex w-1/4 justify-end mt-10 mr-7">
      <div
        class="flex flex-col space-y-2 m-2 bg-gray-200 overflow-y-auto overflow-x-hidden min-h-1/2 max-h-3/4 fixed"
        style="height: calc(100% - 80px)"
      >
        <div
          v-for="list in shoppingLists"
          :name="list.name"
          :key="list._id"
          class="flex hover:bg-gray-700 justify-between p-3 hover:text-white cursor-pointer w-60"
          :class="isListActive(list._id)"
          @click="navigateToShoppingList(list)"
        >
          <div class="flex">
            <span>{{ list.name }}</span>
          </div>
          <div class="flex bg-red-600 w-6 h-6 justify-center">
            {{ getAmountOfItemsInShoppingList(list._id) }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex w-2/4 bg-gray-200">
      <div class="flex flex-col space-y-3 w-full">
        <div
          class="flex flex-shrink-0 w-full h-24 items-center"
          style="
            background-image: url('https://cdn.shopify.com/s/files/1/2645/4560/articles/Juli_Wallpaper_saisonal_und_regional_essen_1000x.jpg');
            background-position-y: 10%;
            background-position-x: 150%;
            background-size: 80%;
          "
        >
          <span class="text-black ml-32 text-2xl">{{
            selectedShoppingList.name
          }}</span>
        </div>
        <div class="flex flex-col m-2 space-y-3">
          <div class="flex w-full">
            <input
              class="w-full h-10 p-3 bg-gray-900 text-white rounded"
              placeholder="Produkte hinzufuegen..."
              @keyup.enter="add"
              v-model.trim="shoppingListItemToPush"
            />
          </div>
          <div class="flex flex-row flex-wrap gap-1">
            <transition-group name="fadeOut">
              <ShoppingListItem
                v-for="(shoppingListItem, index) in selectedShoppingList.items"
                :name="shoppingListItem.name"
                :description="shoppingListItem.description"
                :key="shoppingListItem.name"
                @click="removeShoppingListItem(index)"
                class="fadeOut shadow-md w-28"
              ></ShoppingListItem>
            </transition-group>
          </div>
          <div class="flex bg-white h-10 items-center">
            <span class="ml-3">Zuletzt verwendet</span>
          </div>
          <div class="flex flex-row flex-wrap gap-1">
            <transition-group name="fadeOut">
              <ShoppingListItem
                v-for="(
                  shoppingListItem, index
                ) in selectedShoppingList.lastUsedItems"
                :name="shoppingListItem.name"
                :description="shoppingListItem.description"
                :key="shoppingListItem.name"
                @click="removeShoppingListLastUsedItem(index)"
                class="fadeOut shadow-md w-28"
              ></ShoppingListItem>
            </transition-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
interface ShoppingList extends Object {
  _id: string;
  name: string;
  items: [ShoppingListItem];
  lastUsedItems: [ShoppingListItem];
  userId: string;
}

interface ShoppingListItem extends Object {
  name: string;
  description: string;
}

import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { useApi } from "../../modules/api";
import ShoppingListItem from "./ShoppingListItem.vue";
export default defineComponent({
  name: "ShoppingList",
  setup() {
    const { get } = useApi("shoppingList");

    const state = reactive({
      shoppingLists: [] as ShoppingList[],
      selectedShoppingList: {} as ShoppingList,
      shoppingListItemToPush: "",
    });

    function getPreselectedShoppingList() {
      const id = localStorage.getItem(
        "fp.shoppingList.lastSelectedShoppingListId"
      );
      return (
        state.shoppingLists.find((list: any) => list._id === id) ||
        state.shoppingLists[0]
      );
    }

    onMounted(async function onMounted() {
      const { data: shoppingLists } = await get();
      console.log({ shoppingLists });
      state.shoppingLists = shoppingLists;

      const preselectedShoppingList = getPreselectedShoppingList();
      state.selectedShoppingList = preselectedShoppingList;
      console.log(state.selectedShoppingList);
    });

    return {
      ...toRefs(state),
    };
  },
  components: {
    ShoppingListItem,
  },
  methods: {
    removeShoppingListItem(index: number) {
      console.log("removeShoppingListItem");
      this.selectedShoppingList.lastUsedItems.push(
        this.selectedShoppingList.items[index]
      );
      this.selectedShoppingList.items.splice(index, 1);
    },
    isListActive(id: string) {
      return {
        "bg-gray-900": this.selectedShoppingList._id === id,
        "text-white": this.selectedShoppingList._id === id,
      };
    },
    navigateToShoppingList(list: any) {
      this.selectedShoppingList = list;
      localStorage.setItem(
        "fp.shoppingList.lastSelectedShoppingListId",
        list._id
      );
    },
    add($event: KeyboardEvent) {
      console.log(this);
      const splitInput = this.shoppingListItemToPush?.split(" ") || [];
      if (
        splitInput.length > 1 &&
        splitInput[0].length &&
        splitInput[1].length
      ) {
        this.shoppingListItemToPush = "";
        this.selectedShoppingList.items.push({
          name: splitInput[1],
          description: splitInput[0],
        });
      } else if (splitInput.length === 1 && splitInput[0].length) {
        this.shoppingListItemToPush = "";
        this.selectedShoppingList.items.push({
          name: splitInput[0],
          description: "",
        });
      }
    },
    getAmountOfItemsInShoppingList(id: string) {
      if (this.selectedShoppingList._id === id) {
        return this.selectedShoppingList.items.length;
      } else {
        return (this.shoppingLists.find((list) => list._id === id) || {}).items
          ?.length;
      }
    },
    removeShoppingListLastUsedItem(index: number) {
      const item = this.selectedShoppingList.lastUsedItems[index];
      this.selectedShoppingList.lastUsedItems.splice(index, 1);
      this.selectedShoppingList.items.push(item);
    },
  },
});
</script>

<style scoped>
</style>