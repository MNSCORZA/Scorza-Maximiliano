import { Item } from "./item"

export const ItemList = ({items}) => {
  return (
    <>
        {items.map(item => <Item key={item.id} item={item} />)}
    </>
  )
}
