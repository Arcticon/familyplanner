import { PureComponent } from 'react';
import Image from 'next/future/image';

export type ShoppingListItemProps = {
    _id: string;
    name: string;
    description: string;
    image: string;
};

class ShoppingListItem extends PureComponent<ShoppingListItemProps> {
    render() {
        return (
            <div className="flex flex-col h-32 rounded-md bg-gray-800 space-y-2">
                <div className="flex flex-shrink justify-center mt-1">
                    {/* <div className="h-14"> */}
                    <Image src={this.props.image} alt="asdf" className="h-14" />
                    {/* </div> */}
                </div>
                <div className="flex h-14 items-end justify-center m-1">
                    <span className="text-white text-sm leading-4 overflow-hidden overflow-ellipsis break-words line-clamp-2">
                        {this.props.name}
                    </span>
                </div>
                <div className="flex h-8 overflow-hidden flex-col text-center">
                    <span className="text-gray-400 text-xs">{this.props.description}</span>
                </div>
            </div>
        );
    }
}

export default ShoppingListItem;
