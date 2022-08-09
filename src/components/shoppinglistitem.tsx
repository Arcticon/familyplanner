import { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

export type Item = {
    _id: string;
    name: string;
    description: string;
};

export type DragItem = {
    item: Item;
    currentSectionIndex: number;
    itemIndex: number;
};

type ShoppingListItemProps = {
    item: Item;
    itemIndex: number;
    sectionIndex: number;
    move: (
        currentItemIndex: number,
        targetItemIndex: number,
        currentSectionIndex: number,
        targetSectionIndex: number
    ) => void;
};

export const ShoppingListItem: FC<ShoppingListItemProps> = props => {
    // read https://codesandbox.io/s/eager-perlman-zs3xm?file=/src/Card.tsx
    const ref = useRef<HTMLDivElement>(null);
    const [, drop] = useDrop<DragItem>(
        {
            accept: 'shoppingListItem',
            hover(item, monitor) {
                if (!ref.current) {
                    return;
                }
                const didDrop = monitor.didDrop();
                if (didDrop) {
                    return;
                }

                // Determine rectangle on screen
                const hoverBoundingRect = ref.current!.getBoundingClientRect();
                // Get vertical middle
                const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
                // Determine mouse position
                const clientOffset = monitor.getClientOffset();
                // Get pixels to the top
                const hoverClientX = clientOffset!.x - hoverBoundingRect.left;

                const currentIndex = item.itemIndex;
                const currentSectionIndex = item.currentSectionIndex;
                const targetSectionIndex = props.sectionIndex;
                const moveLeft = hoverClientX < hoverMiddleX;
                const isStillOnSameItem =
                    currentIndex === props.itemIndex && currentSectionIndex === targetSectionIndex;
                const isRightNeighbor =
                    currentSectionIndex === targetSectionIndex && props.itemIndex - currentIndex === 1;

                if (isStillOnSameItem) {
                    // still on the same one
                    return;
                }

                const targetItemIndex = moveLeft ? props.itemIndex : props.itemIndex + (isRightNeighbor ? 0 : 1);
                if (currentIndex === targetItemIndex) {
                    return;
                }
                item.itemIndex = targetItemIndex;
                item.currentSectionIndex = targetSectionIndex;
                props.move(currentIndex, targetItemIndex, currentSectionIndex, targetSectionIndex);
            }
        },
        [props]
    );
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: 'shoppingListItem',
            item: {
                item: props.item,
                currentSectionIndex: props.sectionIndex,
                itemIndex: props.itemIndex
            },
            collect: monitor => ({
                isDragging: monitor.isDragging()
            })
        }),
        [props]
    );
    drag(drop(ref));
    return (
        <div
            key={props.item._id}
            ref={ref}
            className={`flex flex-col h-10 rounded-md bg-gray-800 hover:cursor-move ${isDragging ? '' : 'shadow-md'}`}
            style={{
                opacity: isDragging ? 0.4 : 1
            }}
        >
            <div className="flex h-6 items-center justify-center">
                <span className="text-white text-sm leading-4 overflow-hidden overflow-ellipsis break-words line-clamp-2">
                    {props.item.name}
                </span>
            </div>
            <div className="flex h-4 overflow-hidden flex-col text-center">
                <span className="text-gray-400 text-xs">{props.item.description}</span>
            </div>
        </div>
    );
};

export default ShoppingListItem;
