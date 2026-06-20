const scriptURL ="https://script.google.com/macros/s/AKfycbwqWl1HHt7QVi6-dJdLDBBPZ6VVyb_xCknoi7NriHpcuSuJ7LnCEKKuwGz-xWusOgO2Og/exec"

let form = document.getElementById("form_contact");

form.addEventListener("submit" , (e) =>{
    e.preventDefault();

    fetch(scriptURL , {
        method: "POST",
        body: new FormData(form),
    }).catch((error) => console.error("error!" , error.message ))
    
    
    .then(response => {
        alert("✅ تم إرسال الطلب بنجاح!");
        localStorage.removeItem("cart")
        form.reset();
        
        
       }) 
    })
    .catch((error) => {
        console.error("❌ خطأ!" , error.message);
        alert("حصل خطأ أثناء الإرسال!"); 
})

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let totalPrice = 0;
    let totalQuantity = 0;

    cartItems.forEach(item => {
      totalPrice += item.price * item.quantity;
      totalQuantity += item.quantity;
    });

    document.getElementById("items").value = cartItems
      .map(item => `${item.name} (x${item.quantity}) = ${item.price * item.quantity} جنيه`)
      .join(" | ");

    document.getElementById("totel_price").value = totalPrice;
    document.getElementById("count_Items").value = totalQuantity;

    // إرسال البيانات
    fetch(scriptURL , {
        method: "POST",
        body: new FormData(form),
    })
    .then(response => {
        alert("✅ تم إرسال الطلب بنجاح!");
        form.reset();
        localStorage.removeItem("cart"); // تفريغ السلة بعد الطلب
    })
    .catch((error) => console.error("❌ خطأ!" , error.message));
});


