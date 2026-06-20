var swiper = new Swiper(".slide-swp", {
      pagination: {
        el: ".swiper-pagination",
        dynamicBullests: true ,
        clickalbe: true 
      },
      autoplay:{
        delay:2000,
      },
      loop: true
    });


    var swiper = new Swiper(".slide_product", {
        slidesPerView:5 ,
        spaceBetween:20,
      autoplay:{
        delay:2000,
      },
      navigation:{
        nextEl:".swiper-button-next",
        prevEl:".swiper-button-prev"
      },
      loop: true
    });