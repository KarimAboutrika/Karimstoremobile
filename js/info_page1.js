document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  fetch('mobiles_new.json')
    .then(res => res.json())
    .then(data => {
      const product = data.find(p => p.id == productId);

      if (!product) {
        document.querySelector(".product-view").innerHTML = "<h2>المنتج غير موجود</h2>";
        return;
      }

      // --- الصورة الرئيسية ---
      const mainImg = document.getElementById("mainImg");
      mainImg.src = product.images && product.images.length ? product.images[0] : product.img;

      // --- الاسم والسعر ---
      document.getElementById("productName").textContent = product.name;
      document.getElementById("productPrice").textContent = `${product.price} ج.م`;
      document.getElementById("oldPrice").textContent = product.old_price ? `${product.old_price} ج.م` : "";

      // --- نسبة الخصم ---
      const discountTag = document.getElementById("discount");
      if (product.old_price) {
        const discount = Math.floor(((product.old_price - product.price) / product.old_price) * 100);
        discountTag.textContent = `خصم ${discount}%`;
      } else {
        discountTag.textContent = "";
      }

      // --- الصور المصغّرة ---
      const thumbsDiv = document.getElementById("thumbnails");
      if (product.images && product.images.length > 0) {
        thumbsDiv.innerHTML = product.images.map((img, index) => `
          <img src="${img}" 
            class="${index === 0 ? 'active' : ''}" 
            onclick="
              document.getElementById('mainImg').src='${img}';
              this.parentElement.querySelectorAll('img').forEach(i => i.classList.remove('active'));
              this.classList.add('active');
            ">
        `).join("");
      } else {
        thumbsDiv.innerHTML = "";
      }

      // --- وصف المنتج ---
      document.getElementById("productDescription").textContent =
        product.description || "لا توجد تفاصيل متاحة.";

      // --- جدول المواصفات ---
      const specsTable = document.getElementById("specsTable");
      if (product.specs) {
        specsTable.innerHTML = Object.entries(product.specs)
          .map(([key, value]) => `<tr><td>${key}</td><td>${value}</td></tr>`)
          .join("");
      } else {
        specsTable.innerHTML = "<tr><td colspan='2'>لا توجد مواصفات متاحة.</td></tr>";
      }

      // --- المميزات ---
      const advantagesList = document.getElementById("advantagesList");
      if (product.advantages && product.advantages.length > 0) {
        advantagesList.innerHTML = product.advantages.map(item => `<li>${item}</li>`).join("");
      } else {
        advantagesList.innerHTML = "<li>لا توجد مميزات مذكورة.</li>";
      }

      // --- العيوب ---
      const disadvantagesList = document.getElementById("disadvantagesList");
      if (product.disadvantages && product.disadvantages.length > 0) {
        disadvantagesList.innerHTML = product.disadvantages.map(item => `<li>${item}</li>`).join("");
      } else {
        disadvantagesList.innerHTML = "<li>لا توجد عيوب مذكورة.</li>";
      }

      // --- السلة والكمية ---
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const qtyInput = document.getElementById("quantityInput");
      const increaseBtn = document.querySelector(".quantity-controls .increase");
      const decreaseBtn = document.querySelector(".quantity-controls .decrease");
      const addBtn = document.getElementById("addToCartBtn");
      const buyNowBtn = document.getElementById("buyNowBtn");
      const totalPriceEl = document.getElementById("totalPrice"); // عنصر السعر الإجمالي الجديد

      const updateCartDisplay = () => console.log('Cart updated:', cart);

      // --- دالة حساب السعر الإجمالي (السعر × الكمية) ---
      const updateTotalPrice = () => {
        const qty = parseInt(qtyInput.value) || 1;
        const total = product.price * qty;
        totalPriceEl.textContent = `${total.toFixed(2)} ج.م`;
      };

      // --- إضافة المنتج إلى السلة ---
      const addProductToCart = (product, quantity) => {
        quantity = Math.max(1, parseInt(quantity) || 1);
        const existingIndex = cart.findIndex(item => item.id === product.id);

        if (existingIndex !== -1) {
          cart[existingIndex].quantity += quantity;
          addBtn.textContent = "تم تحديث الكمية ✅";
        } else {
          cart.push({ ...product, quantity });
          addBtn.textContent = "تمت الإضافة ✅";
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
      };

      // --- عند تحميل الصفحة نحسب السعر الأولي ---
      updateTotalPrice();

      // --- أزرار الزيادة والنقصان ---
      increaseBtn.addEventListener("click", () => {
        qtyInput.value = parseInt(qtyInput.value) + 1;
        updateTotalPrice();
      });

      decreaseBtn.addEventListener("click", () => {
        const current = parseInt(qtyInput.value);
        if (current > 1) qtyInput.value = current - 1;
        updateTotalPrice();
      });

      // --- تحديث عند كتابة الكمية يدويًا ---
      qtyInput.addEventListener('change', () => {
        let value = parseInt(qtyInput.value);
        if (isNaN(value) || value < 1) qtyInput.value = 1;
        updateTotalPrice();
      });

      // --- زر "أضف إلى السلة" ---
      addBtn.addEventListener("click", () => {
        const quantity = parseInt(qtyInput.value);
        addProductToCart(product, quantity);
        setTimeout(() => addBtn.textContent = "أضف إلى السلة 🛍️", 1500);
      });

      // --- زر "اشترِ الآن" ---
      buyNowBtn.addEventListener("click", () => {
        const quantity = parseInt(qtyInput.value);
        addProductToCart(product, quantity);
        window.location.href = "checkout.html";
      });

    })
    .catch(err => console.error("خطأ في تحميل البيانات:", err));
});
