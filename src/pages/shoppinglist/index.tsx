import type { GetServerSidePropsContext, NextPage } from 'next';
import { faker } from '@faker-js/faker/locale/de';
import ShoppingListItem, { ShoppingListItemProps } from '../../components/shoppinglistitem';
import { useState, useMemo, KeyboardEvent } from 'react';

const MIN_ITEMS = 12;
const MAX_ITEMS = 60;
const MAX_LISTS = 5;

type ShoppingListProps = {
    _id: string;
    name: string;
    items: ShoppingListItemProps[];
};

const generateRandomItem: () => ShoppingListItemProps = () => {
    return {
        _id: faker.database.mongodbObjectId(),
        name: faker.commerce.product(),
        description: faker.commerce.productAdjective(),
        image: faker.image.dataUri(640, 480, faker.color.human())
    };
};

const generateItem = (name: string, description?: string): ShoppingListItemProps => {
    return {
        _id: faker.database.mongodbObjectId(),
        name,
        description: description ?? '',
        image: faker.image.dataUri(640, 480, faker.color.human())
    };
};

const generateShoppingList: () => ShoppingListProps = () => {
    return {
        _id: faker.database.mongodbObjectId(),
        name: faker.company.companyName(),
        items: Array.from({ length: Math.floor(Math.random() * MAX_ITEMS + MIN_ITEMS) }, () => generateRandomItem())
    };
};

const generateShoppingLists: () => ShoppingListProps[] = () => {
    return Array.from({ length: Math.floor(Math.random() * MAX_LISTS + 2) }, () => generateShoppingList());
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return {
        props: {
            shoppingLists: generateShoppingLists()
        }
    };
}

const ShoppingList: NextPage<{ shoppingLists: ShoppingListProps[] }> = ({ shoppingLists }) => {
    const [currentShoppingLists, setShoppingLists] = useState<ShoppingListProps[]>(shoppingLists);
    const [selectedShoppingListId, setSelectedShoppingListId] = useState<ShoppingListProps['_id']>();
    const [isEditingName, setIsEditingName] = useState<boolean>(false);
    const currentShoppingList = useMemo(() => {
        return (
            currentShoppingLists.find(shoppingList => shoppingList._id === selectedShoppingListId) ??
            currentShoppingLists[0]
        );
    }, [selectedShoppingListId, currentShoppingLists]);

    function updateShoppingLists() {
        setShoppingLists(shoppingList => {
            return shoppingList.map(list => {
                if (list._id === currentShoppingList._id) {
                    return currentShoppingList;
                }
                return list;
            });
        });
    }

    function removeShoppingListItem(index: number) {
        currentShoppingList.items.splice(index, 1);
        updateShoppingLists();
    }

    function addShoppingListItem(event: KeyboardEvent<HTMLInputElement>) {
        if (!event.code.endsWith('Enter')) {
            return;
        }
        const value = event.currentTarget.value.trim();
        if (!value) {
            return (event.currentTarget.value = '');
        }
        const [description, name] = value.split(' ');
        const newItem = generateItem(name ?? description, name ? description : '');
        console.log(newItem);
        currentShoppingList.items.unshift(newItem);
        updateShoppingLists();
        event.currentTarget.value = '';
    }

    function changeName(event: KeyboardEvent<HTMLInputElement>) {
        if (!event.code.endsWith('Enter')) {
            return;
        }
        const value = event.currentTarget.value.trim();
        if (!value) {
            return (event.currentTarget.value = '');
        }
        currentShoppingList.name = value;
        updateShoppingLists();
        setIsEditingName(false);
    }

    return (
        <div className="flex overflow-x-hidden">
            <div className="flex w-1/4 mt-10 mr-7 flex-none">
                <div className="flex bg-gray-200 overflow-y-auto h-[20rem] flex-none">
                    <div className="flex flex-col space-y-2 m-2 w-60 flex-none">
                        {currentShoppingLists.map(shoppingList => (
                            <div
                                key={shoppingList._id}
                                className="flex justify-between hover:cursor-pointer"
                                onClick={() => {
                                    setIsEditingName(false);
                                    setSelectedShoppingListId(shoppingList._id);
                                }}
                            >
                                <div className="flex">{shoppingList.name}</div>
                                <div className="flex bg-red-600 w-6 h-6 justify-center rounded-sm">
                                    {shoppingList.items?.length ?? 0}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex mt-3 w-[37rem] flex-shrink">
                <div className="flex flex-col bg-gray-200 space-y-3  flex-shrink">
                    <div
                        className="flex flex-shrink-0 w-full h-24 items-center"
                        style={{
                            backgroundImage: 'url(bg.jpg)',
                            backgroundPositionX: '150%',
                            backgroundPositionY: '10%',
                            backgroundSize: '80%'
                        }}
                    >
                        {isEditingName ? (
                            <input
                                type="text"
                                onKeyUp={changeName}
                                onBlur={e => {
                                    currentShoppingList.name = e.currentTarget.value;
                                    updateShoppingLists();
                                    setIsEditingName(false);
                                }}
                                placeholder="Liste hinzuf&uuml;gen"
                                defaultValue={currentShoppingList.name}
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            />
                        ) : (
                            <p
                                className="text-black ml-32 text-2xl hover:cursor-pointer"
                                onClick={() => setIsEditingName(true)}
                            >
                                {currentShoppingList?.name}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col m-2 space-y-3">
                        <div className="flex w-full">
                            <input
                                className="w-full h-10 p-3 bg-gray-900 text-white rounded"
                                placeholder="Produkte hinzufuegen..."
                                onKeyUp={addShoppingListItem}
                            />
                        </div>
                        <div className="flex flex-row flex-wrap gap-1 overflow-y-hidden">
                            {/* <transition-group name="fadeOut"> */}
                            {currentShoppingList?.items?.map((item, index) => (
                                <div
                                    className="fadeOut shadow-md w-28 hover:cursor-pointer"
                                    onClick={() => removeShoppingListItem(index)}
                                    key={item._id}
                                >
                                    <ShoppingListItem
                                        key={item._id}
                                        _id={item._id}
                                        name={item.name}
                                        description={item.description}
                                        image={item.image}
                                    />
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
