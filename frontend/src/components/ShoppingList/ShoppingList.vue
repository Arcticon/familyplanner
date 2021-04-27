<template>
  <div class="flex overflow-x-hidden">
    <div class="flex w-1/4 justify-end mt-10 mr-7">
      <div
        class="flex bg-gray-200 overflow-y-auto overflow-x-hidden min-h-1/2 max-h-3/4 fixed"
        style="height: calc(100% - 80px)"
      >
        <div class="flex flex-col space-y-2 m-2 w-60">
          <div
            v-for="list in shoppingLists"
            :name="list.name"
            :key="list._id"
            class="flex hover:bg-gray-700 justify-between p-3 hover:text-white cursor-pointer"
            :class="isListActive(list._id)"
            @click="navigateToShoppingList(list)"
          >
            <div class="flex">
              <span>{{ list.name }}</span>
            </div>
            <div class="flex bg-red-600 w-6 h-6 justify-center rounded-sm">
              {{ getAmountOfItemsInShoppingList(list._id) }}
            </div>
          </div>
          <div class="flex h-8">
            <input
              type="text"
              v-if="addNewShoppingListInput"
              v-model="nameOfNewShoppingList"
              @blur.native="addNewShoppingListInput = false"
              @keyup.enter="
                addNewShoppingListInput = false;
                addNewShoppingList();
              "
              v-focus=""
              placeholder="Liste hinzuf&uuml;gen"
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
            <p
              v-else
              @click="addNewShoppingListInput = true"
              class="flex items-center"
            >
              + Liste hinzuf&uuml;gen
            </p>
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
          <input
            type="text"
            v-if="addNewShoppingListInput2"
            v-model="selectedShoppingList.name"
            @blur.native="addNewShoppingListInput2 = false"
            @keyup.enter="
              addNewShoppingListInput2 = false;
              changeShoppingListName();
            "
            v-focus=""
            placeholder="Liste hinzuf&uuml;gen"
            class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          />
          <p
            v-else
            @click="addNewShoppingListInput2 = true"
            class="text-black ml-32 text-2xl"
          >
            {{ selectedShoppingList?.name }}
          </p>
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
                v-for="(shoppingListItem, index) in selectedShoppingList?.items"
                :_id="shoppingListItem._id"
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
                ) in selectedShoppingList?.lastUsedItems"
                :_id="shoppingListItem._id"
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
  _id: string;
  name: string;
  description: string;
}

import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { useApi } from "../../modules/api";
import ShoppingListItem from "./ShoppingListItem.vue";
export default defineComponent({
  name: "ShoppingList",
  setup() {
    const { get, post, del, error: apiError, data: apiData } = useApi(
      "shoppingList"
    );

    const state = reactive({
      shoppingLists: [] as ShoppingList[],
      selectedShoppingList: {} as ShoppingList,
      shoppingListItemToPush: "",
      addNewShoppingListInput: false,
      addNewShoppingListInput2: false,
      nameOfNewShoppingList: "",
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
      console.log({ selectedShoppingList: state.selectedShoppingList });
    });

    return {
      ...toRefs(state),
      post,
      del,
      apiError,
      apiData,
    };
  },
  components: {
    ShoppingListItem,
  },
  directives: {
    focus: {
      mounted(el: any): void {
        el.focus();
      },
    },
  },
  methods: {
    async removeShoppingListItem(index: number) {
      const { selectedShoppingList, del } = this;
      const { _id: idToRemove } = selectedShoppingList.items[index];
      await del(`${selectedShoppingList._id}/item/${idToRemove}`);

      selectedShoppingList.lastUsedItems.push(
        selectedShoppingList.items[index]
      );
      selectedShoppingList.items.splice(index, 1);
    },
    isListActive(id: string) {
      return {
        "bg-gray-900": this.selectedShoppingList?._id === id,
        "text-white": this.selectedShoppingList?._id === id,
      };
    },
    navigateToShoppingList(list: any) {
      this.selectedShoppingList = list;
      localStorage.setItem(
        "fp.shoppingList.lastSelectedShoppingListId",
        list._id
      );
    },
    async add($event: KeyboardEvent) {
      const {
        selectedShoppingList,
        selectedShoppingList: { _id },
        post,
        shoppingListItemToPush,
      } = this;

      const splitInput = shoppingListItemToPush?.split(" ") || [];
      let itemToAdd = undefined;
      if (
        splitInput.length > 1 &&
        splitInput[0].length &&
        splitInput[1].length
      ) {
        this.shoppingListItemToPush = "";
        itemToAdd = {
          name: splitInput[1],
          description: splitInput[0],
        };
      } else if (splitInput.length === 1 && splitInput[0].length) {
        this.shoppingListItemToPush = "";
        itemToAdd = {
          name: splitInput[0],
          description: "",
        };
      }
      if (itemToAdd) {
        const newItemFromDb = await post(
          {
            newItem: itemToAdd,
          },
          `${_id}/item`
        );
        selectedShoppingList.items.push(newItemFromDb);
      }
    },
    getAmountOfItemsInShoppingList(id: string) {
      if (this.selectedShoppingList?._id === id) {
        return this.selectedShoppingList?.items.length;
      } else {
        return (this.shoppingLists?.find((list) => list._id === id) || {}).items
          ?.length;
      }
    },
    async removeShoppingListLastUsedItem(index: number) {
      const {
        selectedShoppingList: { _id, lastUsedItems, items },
        del,
      } = this;
      const item = lastUsedItems[index];

      await del(`${_id}/lastUsed/${item._id}`);

      lastUsedItems.splice(index, 1);
      items.push(item);
    },
    async addNewShoppingList() {
      const { nameOfNewShoppingList, post } = this;

      const asdf = await post({
        name: nameOfNewShoppingList,
      });
      if (asdf) {
        console.log({ asdf });
        this.shoppingLists.push(asdf);
      }
    },
    async changeShoppingListName() {
      const {
        selectedShoppingList: { name, _id },
        post,
      } = this;

      console.log({ _id });

      await post(
        {
          name: name,
        },
        _id
      );
    },
  },
});
</script>

<style scoped>
</style>