let category_nav_list = document.querySelector(".category_nav_list");

function Open_Categ_list() {
    category_nav_list.classList.toggle("active")
};

var cart = document.querySelector('.cart');
function open_close_cart() {
    cart.classList.toggle("active")
};

// تحميل البيانات وربط أزرار الإضافة للسلة في الصفحة الرئيسية
fetch('mobiles_new.json')
    .then(response => response.json())
    .then(data => {

        const addToCartButton = document.querySelectorAll('.btn_add_cart')

        addToCartButton.forEach(button => {
            button.addEventListener("click", (Event) => {
                const productId = Event.currentTarget.getAttribute('data-id')
                const selectedProduct = data.find(product => product.id == productId)

                // عند الإضافة من صفحة رئيسية أو فرعية، يجب التأكد من عدم التكرار وزيادة الكمية إذا كان موجودًا
                if (selectedProduct) {
                    addOrIncrementCart(selectedProduct);
                }

                const allMatchingButton = document.querySelectorAll(`.btn_add_cart[data-id="${productId}"]`)

                allMatchingButton.forEach(btn => {
                    btn.classList.add("active")
                    btn.innerHTML = ` <i class="fa-solid fa-cart-shopping"></i> Item In Cart `
                })
            })
        })
    })

// دالة للإضافة للسلة مع زيادة الكمية إذا كان المنتج موجوداً
function addOrIncrementCart(productToAdd) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // البحث عن المنتج في السلة
    const existingIndex = cart.findIndex(item => item.id === productToAdd.id);

    if (existingIndex !== -1) {
        // إذا كان موجوداً، زد الكمية
        cart[existingIndex].quantity += 1;
    } else {
        // إذا لم يكن موجوداً، أضفه بكمية 1
        cart.push({ ...productToAdd, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// دالة الإضافة الأساسية (قد تستخدم من صفحات أخرى)
function addToCart(mobiles_new) {
    // تم تغيير منطق هذه الدالة لاستخدام addOrIncrementCart لتجنب التكرار
    addOrIncrementCart(mobiles_new);
}


/* دالة حذف المنتج وزيادة ونقاص المنتج وتحديث العرض */
function updateCart() {
    const cartItemsCotianer = document.getElementById("cart_items");
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const checkout_items = document.getElementById("checkout_items");

    // عناصر صفحة الدفع (Checkout)
    let items_input = document.getElementById("items");
    let Total_price_input = document.getElementById("totel_price");
    let count_Items_input = document.getElementById("count_Items");

    if (checkout_items) {
        checkout_items.innerHTML = "";
        if (items_input) items_input.value = "";
        if (Total_price_input) Total_price_input.value = "";
        if (count_Items_input) count_Items_input.value = "";
    }

    let total_price = 0;
    let total_count = 0;

    // 1. مسح وإعادة بناء محتوى السلة
    cartItemsCotianer.innerHTML = ""; 
    cart.forEach((item, index) => {

        let total_parice_item = item.price * item.quantity;

        total_price += total_parice_item;
        total_count += item.quantity;

        // تحديث حقول إدخال صفحة الدفع (إذا كانت موجودة)
        if (items_input) {
            items_input.value += `${item.name}     ---     price : ${total_parice_item.toFixed(2)}     ---     count : ${item.quantity}\n`;
        }
        
        // بناء عنصر السلة الجانبية
        cartItemsCotianer.innerHTML += `
            <div class="item_cart">
                <img src="${item.img}">
                <div class="content">
                    <h4>${item.name}</h4>
                    <p class="price_cart">ج.م${total_parice_item.toFixed(2)}</p>
                    <div class="quantity_control">
                        <button class="decrease_quantity" data-index="${index}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="increase_quantity" data-index="${index}">+</button>
                    </div>
                </div>
                <button class="delet_item" data-index="${index}"><i class="fa-regular fa-trash-can"></i></button>
            </div>
            `;
            
        // بناء عنصر صفحة الدفع (إذا كانت موجودة)
        if (checkout_items) {
            checkout_items.innerHTML += `
                <div class="item_cart">
                    <div class="image_name">
                        <img src="${item.img}">
                        <div class="content">
                            <h4>${item.name}</h4>
                            <p class="price_cart">ج.م${total_parice_item.toFixed(2)}</p>
                            <div class="quantity_control">
                                <button class="decrease_quantity" data-index="${index}">-</button>
                                <span class="quantity">${item.quantity}</span>
                                <button class="increase_quantity" data-index="${index}">+</button>
                            </div>
                        </div>
                    </div>
                    <button class="delet_item" data-index="${index}"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            `;
        }
    });

    // 2. تحديث الإجماليات في الهيدر والسلة الجانبية
    const price_cart_total = document.querySelector('.price_cart_total');
    const count_item_cart = document.querySelector('.count_item_cart');
    const count_item_header = document.querySelector('.count_item_header');

    if (price_cart_total) price_cart_total.innerHTML = `ج.م ${total_price.toFixed(2)}`;
    if (count_item_cart) count_item_cart.innerHTML = total_count;
    if (count_item_header) count_item_header.innerHTML = total_count;
    
    if (Total_price_input) Total_price_input.value = total_price.toFixed(2);
    if (count_Items_input) count_Items_input.value = total_count;


    // 3. تحديث إجماليات صفحة الدفع (إذا كانت موجودة)
    if (checkout_items) {
        const subtotal_checkout = document.querySelector(".subtotal_checkout");
        const total_checkout = document.querySelector(".total_checkout");

        // هنا استخدمت 25 كقيمة ثابتة للشحن كمثال
        const shipping_fee = 25; 
        
        subtotal_checkout.innerHTML = `ج.م ${total_price.toFixed(2)}`;
        total_checkout.innerHTML = `ج.م ${(total_price + shipping_fee).toFixed(2)}`;
    }

    // 4. ربط مستمعات الأحداث (الأهم) 💡
    
    // زرار الزيادة
    const increaseButtons = document.querySelectorAll(".increase_quantity");
    increaseButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const itemIndex = Number(event.currentTarget.getAttribute("data-index"));
            increaseQuantity(itemIndex);
        })
    });

    // زرار النقصان
    const decreaseButtons = document.querySelectorAll(".decrease_quantity");
    decreaseButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const itemIndex = Number(event.currentTarget.getAttribute("data-index"));
            decreaseQuantity(itemIndex);
        })
    });

    // زرار الحذف
    const deleteButtons = document.querySelectorAll('.delet_item');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const itemIndex = Number(event.currentTarget.getAttribute('data-index'));
            removeFromCart(itemIndex);
        })
    });
}

function increaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    cart[index].quantity += 1
    localStorage.setItem('cart', JSON.stringify(cart))
    updateCart()
}

function decreaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1
    } else {
        // إذا كانت الكمية 1 ونقصت، نحذف المنتج
        const removedProduct = cart.splice(index, 1)[0]
        updateButtonsState(removedProduct.id) // تحديث زر الإضافة في الصفحات الأخرى
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    updateCart()
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    const removedProduct = cart.splice(index, 1)[0]
    localStorage.setItem('cart', JSON.stringify(cart))
    updateCart()
    updateButtonsState(removedProduct.id)
}

function updateButtonsState(productId) {
    // هذا الجزء لتحديث أزرار 'Add To Cart' في الصفحة الرئيسية بعد الحذف
    const allMatchingButtons = document.querySelectorAll(`.btn_add_cart[data-id="${productId}"]`)
    allMatchingButtons.forEach(button => {
        button.classList.remove('active')
        button.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> add to cart`
    })
}

// أول تحميل
updateCart()