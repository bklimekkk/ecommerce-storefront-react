import {useState, useEffect} from "react"
import HeaderElement from "./HeaderElement";

function StoreElement() {

    // Add new item variables
    const [isCreateItemPageActive, setIsCreateItemPageActive] = useState(false);
    const [isShopPageActive, setIsShopPageActive] = useState(true); 
    const [isCartPageActive, setIsCartPageActive] = useState(false);
    const [categories, setCategories] = useState(JSON.parse(localStorage.getItem("categories")) || ["T-shirts"]);
    const [newCategory, setNewCategory] = useState("");
    const [newItemName, setNewItemName] = useState("");
    const [newItemDescription, setNewItemDescription] = useState("");
    const [newItemPrice, setNewItemPrice] = useState("");
    const [newItemQuantity, setNewItemQuantity] = useState("");
    const [newItemCategory, setNewItemCategory] = useState("T-shirts");
    const [categoryErrorMessage, setCategoryErrorMessage] = useState("");
    const [newItemSuccessMessage, setNewItemSuccessMessage] = useState("");
    
    //Shop variables
    const [items, setItems] = useState(JSON.parse(localStorage.getItem("items")) || []);
    const [newItemErrorMessage, setNewItemErrorMessage] = useState("");
    
    //Cart variables
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
    const [addedToCart, setAddedToCart] = useState(false);
    
    useEffect(() =>{
        localStorage.setItem("categories", JSON.stringify(categories));
    }, [categories]);
    
    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items));
    }, [items]);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);
    
    function activateCreateItemPage() {
        setIsCreateItemPageActive(true);
        setIsShopPageActive(false); 
        setIsCartPageActive(false);
    }

    function activateShopPage() {
        setIsCreateItemPageActive(false);
        setIsShopPageActive(true); 
        setIsCartPageActive(false);
    }
    
    function activateCartPage() {
        setIsCreateItemPageActive(false);
        setIsShopPageActive(false); 
        setIsCartPageActive(true);
    }

    function handleCategoryInputChange(event) {
        setNewCategory(event.target.value);
    }
    
    function addCategory() {
        setCategories(c => [...c, newCategory]);
        setNewCategory("");
    }

    function handleSelectChange(event) {
        setNewItemCategory(event.target.value);
    }
    
    function handleNameChange(event) {
        setNewItemName(event.target.value);
    }

    function handleDescriptionChange(event) {
        setNewItemDescription(event.target.value); 
    }
     
    function handlePriceChange(event) {
        setNewItemPrice(event.target.value);
    }

    function handleQuantityChange(event) {
        setNewItemQuantity(event.target.value);
    }

    function deleteCategory(category) {
        const filteredCategories = categories.filter(c => c !== category);
        if(filteredCategories.length !== 0) {
            setCategories(filteredCategories);
        } else {
            setCategoryErrorMessage("At least one category must exist");

            setTimeout(() => {
               setCategoryErrorMessage(""); 
            }, 2000)
        }
    }

    function addNewItem() {
        if(items.some(i => i.name === newItemName)) {
            setNewItemErrorMessage("Item with this name already exists");

            setTimeout(() => {
                setNewItemErrorMessage("");
            }, 2000);
            
        } else {
            setItems(items => [...items, {
                name: newItemName,
                description: newItemDescription,
                price: newItemPrice,
                quantity: Number(newItemQuantity),
                cartQuantity: 1,
                category: newItemCategory,
                edited: false
            }]);
            setNewItemSuccessMessage("Item added successfully");

            setTimeout(() => {
            setNewItemSuccessMessage(""); 
            }, 2000)
            
            setNewItemName("");
            setNewItemDescription("");
            setNewItemPrice("");
            setNewItemQuantity("");
        }
    }
    

    function editItem(item) {
        setItems(items => 
            items.map(i => 
                i.name === item.name ?
                {...i, edited: true} :
                i
            )
        );
    }

    function changeItem(item) {
        setItems(items => 
            items.map(i => 
                i.name === item.name ?
                {...i, edited: false} :
                 i
            )
        );
    }
    
    function changeDescription(event, item) {
        let changedDescription = event.target.value;

        setItems(items => items.map(i => 
            i.name === item.name ?
            {...i, description: changedDescription} :
            i
        ));
    }

    function changePrice(event, item) {
        let changedPrice = event.target.value;

        setItems(items => items.map(i => 
            i.name === item.name ?
            {...i, price: changedPrice} :
            i
        ));
    }

    function changeQuantity(event, item) {
        let changedQuantity = event.target.value;

        setItems(items => items.map(i => 
            i.name === item.name ?
            {...i, quantity: Number(changedQuantity)} :
            i
        ));
    }

    function changeCartQuantity(event, item) {
        const changedCartQuantity = event.target.value;
        setItems(items => items.map(i => 
            i.name === item.name ?
            {...i, cartQuantity: Number(changedCartQuantity)} :
            i
        ));
    }
    
    function deleteItem(item) {
       const filteredItems = items.filter(i => i.name !== item.name);
       setItems(filteredItems);
    }
    
    function addToCart(item) {

        if(cart.some(c => c.name === item.name)) {
            setCart(cartItems => cartItems.map(cartItem => 
                cartItem.name === item.name ?
                {...cartItem, quantity: Number(cartItem.quantity) + Number(item.cartQuantity)} :
                cartItem
            ));
        } else {
            setCart(cart => [...cart, {
                name: item.name,
                description: item.description,
                price: item.price,
                quantity: Number(item.cartQuantity),
                category: item.category,
                edited: false
               }]);  
        }

        let itemUpdatedQuantity = item.quantity - item.cartQuantity;
        
       setItems(items => items.map(i =>
        i.name === item.name ?
        {...i, quantity: Number(itemUpdatedQuantity), cartQuantity: 1} :
        i
       ));

       setAddedToCart(true);
       setTimeout(() => {
        setAddedToCart(false);
       }, 2000);
    }
    
    function deleteFromCart(item) {
       const remainingQuantity = item.quantity;
       setCart(cart.filter(i => i.name !== item.name));
       setItems(items => items.map(i => 
            i.name === item.name
            ? {...i, quantity: i.quantity + Number(remainingQuantity)}
            : i
       ));
    }
    
    function editQuantity(item) {
        setCart(items => items.map(i => 
            i.name === item.name
            ? {...i, edited: true}
            : i
        ));
    }

    function changeQuantity(item) {
        setCart(items => items.map(i => 
            i.name === item.name
            ? {...i, edited: false}
            : i
        ));
    }
    
    function changeCartItemQuantity(event, item) {
        const oldQuantity = item.quantity;
        const newQuantity = event.target.value;
        setCart(items => items.map(i => 
            i.name === item.name
            ? {...i, quantity: Number(newQuantity)}
            : i
        ))

        setItems(items => items.map(i => 
            i.name === item.name
            ? {...i, quantity: i.quantity + (Number(oldQuantity) - Number(newQuantity))}
            : i
        ));
    }
    
   return(
    <main>
       <HeaderElement 
        isShopPageActive={isShopPageActive}
        isCreateItemPageActive={isCreateItemPageActive}
        isCartPageActive={isCartPageActive}
        activateShopPage={activateShopPage}
        activateCreateItemPage={activateCreateItemPage}
        activateCartPage={activateCartPage}/>

            {
                isCreateItemPageActive &&
                <div>
                    <p>Create new Item</p>

                    <input 
                    value={newItemName} 
                    onChange={(event) => handleNameChange(event)} 
                    className="new-item-input" 
                    type="text" 
                    placeholder="Enter item name"/>

                    <input 
                    value={newItemDescription} 
                    onChange={(event) => handleDescriptionChange(event)} 
                    className="new-item-input" 
                    type="text" 
                    placeholder="Enter item description"/>

                    <input 
                    value={newItemPrice} 
                    onChange={(event) => handlePriceChange(event)} 
                    className="new-item-input" 
                    type="number" 
                    placeholder="Enter price"/>

                    <input
                    value={newItemQuantity} 
                    onChange={(event) => handleQuantityChange(event)} 
                    className="new-item-input" 
                    type="number" 
                    placeholder="Enter quantity"/>

                    <p>Enter category</p>
                    <select 
                     value={newItemCategory}
                     onChange={(event) => handleSelectChange(event)} 
                     name="" 
                     id="" 
                     className="categories-select">
                        {
                            categories.map((category, index) => 
                            <option key={index} value={category}>{category}</option>
                            )
                        }
                    </select>
                    {
                        newItemName !== "" 
                        && newItemDescription !== "" 
                        && newItemPrice !== "" 
                        && newItemQuantity !== ""
                        && <button onClick={addNewItem} className="new-item-btn">Add new item</button>
                    }
             
                    <br />

                    <p className="new-item-error-message">{newItemErrorMessage}</p>
                    <p className="new-item-success-message">{newItemSuccessMessage}</p>

                    <p>Create new category</p>
                    <input 
                    className="new-category-input"
                    type="text" 
                    placeholder="Enter category name" 
                    value={newCategory} 
                    onChange={(event) => handleCategoryInputChange(event)}/>
                    {
                        newCategory !== "" &&
                        <button onClick={addCategory}>Add category</button>
                    }
                    <br />
                    <p className="category-error-message">{categoryErrorMessage}</p>
                    {
                     categories.map((category, index) => 
                        <div key={index} className="category-container">
                            <p>{category}</p>
                            <button onClick={() => deleteCategory(category)} className="category-delete-btn">Delete</button>
                        </div>
                    )
                    }
                </div>
            }

            {
                isShopPageActive &&
                <div className="items-container">
                    {
                       items.map((item, index) =>
                        <div key={index} className="item-container">
                            <img className="item-image" src="src/assets/tshirt.jpg" alt="" />

                            {
                                !item.edited &&  
                            <div className="item-info-container">
                                <p>{item.name}</p>
                                <p>{item.description}</p>
                                <p>{`$${item.price}`}</p>
                                <p>{`quantity: ${item.quantity}`}</p>
                                <p>{item.category}</p>
                            </div>
                            }
                           
                            { !item.edited && 
                            <>
                            <button onClick={() => deleteItem(item)} className="delete-btn">Delete</button>

                           

                            {
                                item.quantity !== 0 ?
                                <>
                                {
                                    addedToCart
                                    ? <button className="added-to-cart-btn">Added to cart</button>
                                    : <button onClick={() => addToCart(item)} className="add-to-cart-btn">Add to cart</button>
                                }
                                <select 
                                className="add-to-cart-select" 
                                value={item.cartQuantity} 
                                onChange={(event) => changeCartQuantity(event, item)} 
                                name="" 
                                id="">
    
                                    {
                                        Array.from({length: item.quantity}, (_, index) => index + 1).map(num =>
                                            <option value={num}>{num}</option>
                                        )
                                    }
                                </select>
                                </>
                                :
                                <p className="out-of-stock-label">Out of stock</p>
                            }

                            </>
                            }
                            
                            {
                                !item.edited 
                                && <button onClick={() => editItem(item)} className="edit-btn">Edit</button>
                            }
                           
                            {
                                item.edited &&
                                <div className="edit-section">

                                    <input 
                                    value={item.description} 
                                    onChange={(event) => changeDescription(event, item)} 
                                    type="text" 
                                    placeholder="Enter description"/>

                                    <input 
                                    value={item.price} 
                                    onChange={(event) => changePrice(event, item)} 
                                    type="text" 
                                    placeholder="Enter price"/>

                                    <input 
                                    value={item.quantity} 
                                    onChange={(event) => changeQuantity(event, item)} 
                                    type="text" 
                                    placeholder="Enter quantity"/>

                                    <button onClick={() => changeItem(item)}>Change</button>
                                </div>
                            }
                        </div>
                     ) 
                    }
                </div>
            }

            {
                isCartPageActive &&
                <div className="cart-container">
                    {
                        cart.map((item, index) => 
                            <div key={index} className="cart-item-container">
                                <img className="item-image" src="src/assets/tshirt.jpg" alt="" />
                                {
                                    !item.edited ?
                                    <>
                                     <div className="cart-item-info-section">
                                    <p>{item.name}</p>
                                    <p>{item.description}</p>
                                    <p>{`$${item.price}`}</p>
                                    <p>{`quantity: ${item.quantity}`}</p>
                                    <p>{item.category}</p>
                                    </div>

                                    {
                                        item.quantity !== 1 &&
                                        <button onClick={() => editQuantity(item)} className="edit-quantity-btn">Edit quantity</button> 
                                    } 
                                 <button onClick={() => deleteFromCart(item)} className="delete-from-cart-btn">Delete</button> 
                                    </>
                                :
                                <div className="edit-quantity-section">
                                    <select value={item.quantity} onChange={(event) => changeCartItemQuantity(event, item)} name="" id="">
                                        {
                                            Array.from({length: item.quantity}, (_, index) => index + 1).map(num =>
                                                <option value={num}>{num}</option>
                                            )
                                        }
                                    </select>
                                    <button onClick={() => changeQuantity(item)}>Change quantity</button>
                                </div>
                                }
                            </div>
                        )
                    }
                </div>
            }
    </main>
   ); 
}

export default StoreElement