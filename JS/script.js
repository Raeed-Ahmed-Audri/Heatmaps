$(document).ready(function(){
  $("[data-fancybox]").fancybox();
  $(".item").isotope({
    filter: '*',
    animationOptions: {
      duration: 1500,
      easing: 'linear',
      queue: false
    }
  })
});
  
