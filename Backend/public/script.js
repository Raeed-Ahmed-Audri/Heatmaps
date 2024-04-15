// When the document is fully loaded, execute the following functions:
$(document).ready(function(){
  
  // Initialize Fancybox for elements that have the data-fancybox attribute.
  $("[data-fancybox]").fancybox({
    clickSlide: false,   // Prevents clicking on the slide from doing anything.
    touch: false,        // Disables touch input events.
    clickOutside: false  // Prevents closing Fancybox when clicking outside the element.
  });

  // Initialize Isotope for sorting and filtering functionalities on elements with the class 'items'.
  $(".items").isotope({
    filter: '*',        // Starts with all items being shown.
    animationOptions: { // Defines how the animation should behave.
      duration: 1500,   // Animation duration in milliseconds.
      easing: 'linear', // Type of easing for the animation.
      queue: false      // Specifies that animations should not be queued.
    }
  });

  // Set up a click handler for each link in the element with id 'filters'.
  $("#filters a").click(function(){

    // Remove the 'current' class from the currently selected filter.
    $("#filters .current").removeClass("current");
    // Add the 'current' class to the clicked filter link.
    $(this).addClass("current");

    // Retrieve the filter value from the data-filter attribute of the clicked link.
    var selector = $(this).attr("data-filter");

    // Use Isotope to filter items again based on the selected filter.
    $(".items").isotope({
      filter: selector,   // The filter to apply, determined by the clicked link.
      animationOptions: { // Reusing the same animation options.
        duration: 1500,
        easing: 'linear',
        queue: false
      }
    });

    // Prevent the default link click behavior which would navigate or refresh the page.
    return false;
  })
});
