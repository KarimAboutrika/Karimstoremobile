fetch('mobiles_new.json')
.then(Response => Response.json())

.then(data => {
    
    const cart = JSON.parse(localStorage.getItem('cart')) || []

    const swiper_items_sale =document.getElementById("swiper_items_sale")

    const swiper_mobiles_realme =document.getElementById("swiper_mobiles_realme")

    const swiper_mobiles_oppo =document.getElementById("swiper_mobiles_oppo")

    const swiper_mobiles_samsung =document.getElementById("swiper_mobiles_samsung")

    data.forEach(product => {

        if(product.old_price) {

            const isInCart = cart.some(cartItem => cartItem.id === product.id)

            const percent_disc = Math.floor  (( product.old_price - product.price) /product.old_price * 100 )

            swiper_items_sale.innerHTML += `
            <div class="swiper-slide product">
                        <span class="sale_present">%${percent_disc}</span>
                        
                        <div class="img_product">
                            <a href="#"><img src=${product.img}></a>
                        </div>

                        <div class="stars">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>

                        <p class="name_product"><a href="#"> ${product.name}</a></p>

                        <div class="price">
                            <p><span>ج.م${product.price}</span></p>
                            <p class="old_price">ج.م${product.old_price}</p>

                        </div>

                        <div class="icon">
                                <span class="btn_add_cart ${isInCart ? 'active' : ''}" data-id="${product.id}">
                                    <i class="fa-solid fa-cart-shopping"></i>
                                    ${isInCart ? 'item in cart' : 'add to cart'}
                                </span>
                                <span class="icon_product"> 
                                    <i class="fa-regular fa-heart"></i>
                                </span>
                        </div>
                    </div>
            
            
            `

        }
        
    });

    data.forEach (product => {
        if(product.catetory == "mobiles_realme") {

            const isInCart = cart.some(cartItem => cartItem.id === product.id)

            const old_price_pargraph = product.old_price ? 
            `<p class="old_price">ج.م${product.old_price}</p>`
            : "";

            const old_price_div = product.old_price ? 
            `<span class="sale_present">%${Math.floor  (( product.old_price - product.price) /product.old_price * 100 )}</span>`
            : "";

            
            
            swiper_mobiles_realme.innerHTML += `
            <div class="swiper-slide product">
                        
                        ${old_price_div}
                        <div class="img_product">
                            <a href="#"><img src=${product.img}></a>
                        </div>

                        <div class="stars">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>

                        <p class="name_product"><a href="#"> ${product.name}</a></p>

                        <div class="price">
                            <p><span>ج.م${product.price}</span></p>
                            ${old_price_pargraph}
                            

                        </div>

                        <div class="icon">
                                    <span class="btn_add_cart ${isInCart ? 'active' : ''}" data-id="${product.id}">
                                    <i class="fa-solid fa-cart-shopping"></i>
                                    ${isInCart ? 'item in cart' : 'add to cart'}
                                </span>
                                <span class="icon_product"> 
                                    <i class="fa-regular fa-heart"></i>
                                </span>
                        </div>
                    </div>
            
            
            `

        }
    })

    

    data.forEach (product => {
        if(product.catetory == "mobiles_oppo") {

            const isInCart = cart.some(cartItem => cartItem.id === product.id)

            const old_price_pargraph = product.old_price ? 
            `<p class="old_price">ج.م${product.old_price}</p>`
            : "";

            const old_price_div = product.old_price ? 
            `<span class="sale_present">%${Math.floor  (( product.old_price - product.price) /product.old_price * 100 )}</span>`
            : "";

            
            
            swiper_mobiles_oppo.innerHTML += `
            <div class="swiper-slide product">
                        
                        ${old_price_div}
                        <div class="img_product">
                            <a href="#"><img src=${product.img}></a>
                        </div>

                        <div class="stars">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>

                        <p class="name_product"><a href="#"> ${product.name}</a></p>

                        <div class="price">
                            <p><span>ج.م${product.price}</span></p>
                            ${old_price_pargraph}
                            

                        </div>

                        <div class="icon">
                                 <span class="btn_add_cart ${isInCart ? 'active' : ''}" data-id="${product.id}">
                                    <i class="fa-solid fa-cart-shopping"></i>
                                    ${isInCart ? 'item in cart' : 'add to cart'}
                                </span>
                                <span class="icon_product"> 
                                    <i class="fa-regular fa-heart"></i>
                                </span>
                        </div>
                    </div>
            
            
            `

        }
    })

    data.forEach (product => {
        if(product.catetory == "mobiles_samsung") {

            const isInCart = cart.some(cartItem => cartItem.id === product.id)

            const old_price_pargraph = product.old_price ? 
            `<p class="old_price">ج.م${product.old_price}</p>`
            : "";

            const old_price_div = product.old_price ? 
            `<span class="sale_present">%${Math.floor  (( product.old_price - product.price) /product.old_price * 100 )}</span>`
            : "";

            
            
            swiper_mobiles_samsung.innerHTML += `
            <div class="swiper-slide product">
                        
                        ${old_price_div}
                        <div class="img_product">
                            <a href="#"><img src=${product.img}></a>
                        </div>

                        <div class="stars">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>

                        <p class="name_product"><a href="#"> ${product.name}</a></p>

                        <div class="price">
                            <p><span>ج.م${product.price}</span></p>
                            ${old_price_pargraph}
                            

                        </div>

                        <div class="icon">
                                <span class="btn_add_cart ${isInCart ? 'active' : ''}" data-id="${product.id}">
                                    <i class="fa-solid fa-cart-shopping"></i>
                                    ${isInCart ? 'item in cart' : 'add to cart'}
                                </span>
                                <span class="icon_product"> 
                                    <i class="fa-regular fa-heart"></i>
                                </span>
                        </div>
                    </div>
            
            
            `

        }
    })

});