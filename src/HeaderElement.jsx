function HeaderElement({
    isShopPageActive,
     isCreateItemPageActive,
      isCartPageActive,
       activateShopPage,
        activateCreateItemPage,
         activateCartPage}) {
    return(
        <header className="store-header">
        {
         !isShopPageActive &&
          <button onClick={activateShopPage} className="header-btn shop-btn">Shop</button>
        }

        {
            !isCreateItemPageActive &&
            <button onClick={activateCreateItemPage} className="header-btn">Create Item</button>
        }

        {
            !isCartPageActive &&
            <button onClick={activateCartPage} className="header-btn cart-btn">Cart</button>
        }

    </header>
    );
}

export default HeaderElement