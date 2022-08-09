import { FC, useCallback, useRef } from 'react';
import { useDrop } from 'react-dnd';
import ShoppingListItem, { DragItem, Item } from './shoppinglistitem';

export type Section = {
    _id: string;
    index: number;
    name: string;
    color: string;
    items: Item[];
};

type MyProps = {
    section: Section;
    sectionIndex: number;
    click: (sectionIndex: number, itemIndex: number) => void;
    move: (
        currentItemIndex: number,
        targetItemIndex: number,
        currentSectionIndex: number,
        targetSectionIndex: number
    ) => void;
};

export const ShoppingListSection: FC<MyProps> = props => {
    const ref = useRef<HTMLDivElement>(null);
    // const [items, setItems] = useState<Item[]>(props.section.items);
    const [{ isOverCurrent }, drop] = useDrop<DragItem, void, { isOverCurrent: boolean }>(() => ({
        accept: 'shoppingListItem',
        drop(item, monitor) {
            const didDrop = monitor.didDrop();
            if (didDrop) {
                return;
            }
            if (!isOverCurrent) {
                return;
            }

            // const dragIndex = item.currentSectionIndex;
            // const hoverIndex = props.sectionIndex;

            // // Determine rectangle on screen
            // const hoverBoundingRect = ref.current!.getBoundingClientRect();

            // // Get vertical middle
            // const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            // // Determine mouse position
            // const clientOffset = monitor.getClientOffset();

            // // Get pixels to the top
            // const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

            // // Dragging downwards
            // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            //     debugger;
            //     return;
            // }

            // // Dragging upwards
            // if (hoverClientY > hoverMiddleY) {
            //     debugger;
            //     return;
            // }
            // props.move(item.item, item.currentSectionIndex, props.sectionIndex);
            console.log('drop - section - item', item);
        },
        hover(item, monitor) {
            if (!isOverCurrent) {
                return;
            }
            const currentIndex = item.itemIndex;
            const targetItemIndex = props.section.items.length;
            const currentSectionIndex = item.currentSectionIndex;
            const targetSectionIndex = props.sectionIndex;

            if (currentIndex === targetItemIndex) {
                return;
            }

            props.move(currentIndex, targetItemIndex, currentSectionIndex, targetSectionIndex);
        },
        collect: monitor => ({
            isOverCurrent: monitor.isOver({ shallow: false })
        })
    }));

    const renderItem = useCallback(
        (item: Item, itemIndex: number) => {
            if (!item) {
                return;
            }
            return (
                <div className="w-28" onClick={() => props.click(props.sectionIndex, itemIndex)} key={item._id}>
                    <ShoppingListItem
                        item={item}
                        sectionIndex={props.sectionIndex}
                        itemIndex={itemIndex}
                        move={props.move}
                    />
                </div>
            );
        },
        [props]
    );
    drop(ref);

    return (
        <div ref={ref} key={props.section._id}>
            <div className="flex w-full h-10 p-3 bg-gray-900 text-white rounded items-center">{props.section.name}</div>
            <div
                className={`flex flex-row flex-wrap gap-1 overflow-y-hidden mt-1`}
                // className={`flex flex-row flex-wrap gap-1 overflow-y-hidden mt-1 ${isOverCurrent ? 'bg-gray-400' : ''}`}
            >
                {/* <transition-group name="fadeOut"> */}
                {props.section.items.map((item, itemIndex) => renderItem(item, itemIndex))}
            </div>
            {/* </transition-group> */}
        </div>
    );
};

export default ShoppingListSection;
