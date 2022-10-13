import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  //first
  
    // Update state by passing the array of items to setItems  
    useEffect(() => {
      fetch("http://localhost:4000/items")
        .then((r) => r.json())
        .then((items) => setItems(items));
    }, []);


  //third / parameter   (itemData) dachta nawy
  function handleAddItem(newItem) {
    setItems([...items, newItem])
  }

  // forth /after patch/ add this callback function
  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem
      } else {
        return item
      }
    })
    setItems(updatedItems)
  }

  //five wtumana aw item 'ana benawa ka id = nya ba id aw itemay ka dagirawa wata delete button
  function handleDeleteItem(deletedItem) {
    const updatedItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(updatedItems);
  }


  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });
  

  //third adding onAddItem as props to ItemForm
  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onDeleteItem={handleDeleteItem} onUpdateItem={handleUpdateItem} />
        ))}
      </ul>
    </div>
  );
}
//forth adding onUpdateItem={handleUpdateItem} as props
export default ShoppingList;
