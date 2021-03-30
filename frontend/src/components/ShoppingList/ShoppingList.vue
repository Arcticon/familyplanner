<template>
  <div class="flex">
    <div class="flex w-1/4 justify-end mt-10 mr-7">
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
            {{ getAmountOfItemsInShoppingList("a") }}
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
            {{ getAmountOfItemsInShoppingList("b") }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex w-2/4 bg-gray-200">
      <div class="flex flex-col space-y-3 w-full">
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
              @keyup.enter="add"
              v-model.trim="shoppingListItemToPush"
            />
          </div>
          <div class="flex flex-row flex-wrap gap-1">
            <transition-group name="fadeOut">
              <ShoppingListItem
                v-for="(shoppingListItem, index) in shoppingList"
                :name="shoppingListItem.name"
                :description="shoppingListItem.description"
                :key="shoppingListItem.name"
                @click="removeShoppingListItem(index)"
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
import router from "../../router/router";
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import ShoppingListItem from "./ShoppingListItem.vue";
export default defineComponent({
  name: "ShoppingList",
  setup() {
    console.log("in setup");
    const list: {
      [index: string]: Array<{ name: string; description: string }>;
    } = {
      a: [
        {
          name: "Test1abcdefghijklmnopqrstuvwxyz",
          description: "",
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
        {
          name: "Test8",
          description: "Qux",
        },
        {
          name: "Test8",
          description: "Qux",
        },
        {
          name: "Test8",
          description: "Qux",
        },
        {
          name: "Test8",
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
          description: "",
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
    console.log("data");
    return {
      list: this.list,
      shoppingList: this.filterList(this.id),
      shoppingListItemToPush: "",
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
    add($event: KeyboardEvent) {
      console.log(this);
      const splitInput = this.shoppingListItemToPush?.split(" ") || [];
      if (
        splitInput.length > 1 &&
        splitInput[0].length &&
        splitInput[1].length
      ) {
        this.shoppingListItemToPush = "";
        this.shoppingList.push({
          name: splitInput[1],
          description: splitInput[0],
        });
      } else if (splitInput.length === 1 && splitInput[0].length) {
        this.shoppingListItemToPush = "";
        this.shoppingList.push({
          name: splitInput[0],
          description: "",
        });
      }
    },
    getAmountOfItemsInShoppingList(index: string | number) {
      // console.log(this.filterList(index));
      return this.list[index].length;
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