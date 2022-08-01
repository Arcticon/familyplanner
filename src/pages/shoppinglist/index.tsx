import type { NextPage } from 'next';
import { faker } from '@faker-js/faker/locale/de';
import ShoppingListItem, { ShoppingListItemProps } from '../../components/shoppinglistitem';
import { useState, useEffect } from 'react';

const MAX_ITEMS = 10;
const MAX_LISTS = 5;

type ShoppingListProps = {
    _id: string;
    name: string;
    items: ShoppingListItemProps[];
};

const generateItem: () => ShoppingListItemProps = () => {
    return {
        _id: faker.database.mongodbObjectId(),
        name: faker.commerce.product(),
        description: faker.commerce.productAdjective()
    };
};

const generateShoppingList: () => ShoppingListProps = () => {
    return {
        _id: faker.database.mongodbObjectId(),
        name: faker.company.companyName(),
        items: Array.from({length: Math.floor(Math.random() * MAX_ITEMS)}, () => generateItem())
    };
};

const generateShoppingLists: () => ShoppingListProps[] = () => {
    return Array.from({length: Math.floor(Math.random() * MAX_LISTS)}, () => generateShoppingList())
};
// const shoppingLists = generateShoppingLists();
// const selectedShoppingList = shoppingLists[0];

// console.log(selectedShoppingList)

const ShoppingList: NextPage = () => {

    const [shoppingLists, setShoppingLists] = useState<ShoppingListProps[]>([]);
    const [selectedShoppingList, setSelectedShoppingList] = useState<ShoppingListProps>();
    useEffect(() => {
        const lists = generateShoppingLists();
        setShoppingLists(lists);
        setSelectedShoppingList(lists[0]);
    }, []);

    function removeShoppingListItem(this: number, event: any) {
        if (event.charCode !== 13) {
            return;
        }
        selectedShoppingList?.items.splice(this, 1);
    }

    function addShoppingListItem(this: number, event: any) {
        if (event.charCode !== 13) {
            return;
        }
        // selectedShoppingList.items.splice(this, 1);
    }

    return (
        <div className="flex overflow-x-hidden">
            <div className="flex w-1/4 justify-end mt-10 mr-7">
                <div
                    className="flex bg-gray-200 overflow-y-auto overflow-x-hidden min-h-1/2 max-h-3/4 fixed"
                    style={{ height: 'calc(100% - 80px)' }}
                >
                    <div className="flex flex-col space-y-2 m-2 w-60">
                        {shoppingLists.map(shoppingList => (
                            <div key={shoppingList._id}>
                                <div className="flex">
                                    <span>{shoppingList.name}</span>
                                </div>
                                <div className="flex bg-red-600 w-6 h-6 justify-center rounded-sm">
                                    {shoppingList.items?.length ?? 0}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex w-2/4 bg-gray-200">
                <div className="flex flex-col space-y-3 w-full">
                    <div
                        className="flex flex-shrink-0 w-full h-24 items-center"
                        //   style={{
                        //     'background-image': "url('https://cdn.shopify.com/s/files/1/2645/4560/articles/Juli_Wallpaper_saisonal_und_regional_essen_1000x.jpg')",
                        //     'background-position-y': '10%',
                        //     'background-position-x': '150%',
                        //     'background-size': '80%'
                        //   }}
                    >
                        {/* <input
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
            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          />
          <p
            v-else
            @click="addNewShoppingListInput2 = true"
            className="text-black ml-32 text-2xl"
          >
            {{ selectedShoppingList?.name }}
          </p> */}
                    </div>
                    <div className="flex flex-col m-2 space-y-3">
                        <div className="flex w-full">
                            <input
                                className="w-full h-10 p-3 bg-gray-900 text-white rounded"
                                placeholder="Produkte hinzufuegen..."
                                onKeyUp={addShoppingListItem}
                            />
                        </div>
                        <div className="flex flex-row flex-wrap gap-1">
                            {/* <transition-group name="fadeOut"> */}
                            {selectedShoppingList?.items?.map((item, index) => (
                                <div
                                    className="fadeOut shadow-md w-28"
                                    onClick={removeShoppingListItem.bind(index)}
                                    key={item.name}
                                >
                                    <ShoppingListItem _id={item._id} name={item.name} description={item.description} />
                                </div>
                            ))}
                            {/* </transition-group> */}
                        </div>
                        <div className="flex bg-white h-10 items-center">
                            <span className="ml-3">Zuletzt verwendet</span>
                        </div>
                        {/* <div className="flex flex-row flex-wrap gap-1">
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
                className="fadeOut shadow-md w-28"
              ></ShoppingListItem>
            </transition-group>
          </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingList;
