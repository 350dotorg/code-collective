// Modal function - integrates with 350s "Baseline" theme
(function($) {
  $.fn.modal = function() {
    return this.each(function() {
      // get the ID of the element that contains the content for the modal from the "data-modal-source" attribute in the HTML tag
      var modalSourceID = $(this).attr('data-modal-source');
      // get the optional list of classes to add to the inner content area from the "data-modal-classes-inner" attribute in the HTML tag
      var modalInnerClassesAttr = $(this).attr('data-modal-classes-inner');
      // use the default classes to set the inner modal to be a white box with lots of padding
      var modalInnerClasses = 'box box-huge bg-white';
      if (modalInnerClassesAttr) {
        modalInnerClasses = modalInnerClassesAttr;
      }
      // get the optional list of classes to add to the inner content area from the "data-modal-classes-outer" attribute in the HTML tag
      var modalOuterClassesAttr = $(this).attr('data-modal-classes-outer');
      // use the default classes to set the modal container to have a transparent dark gray background and lots of horizontal padding
      var modalOuterClasses = 'bg-dkgray-trans width-narrow';
      if (modalOuterClassesAttr) {
        modalOuterClasses = modalOuterClassesAttr;
      }
      // get the modal content, wrap it in a div, and copy the HTML to a variable
      var modalContent = $(modalSourceID).clone(true);
      // assemble the outer and inner modal wrappers around the content
      var modal = '<div class="modal-wrapper section ' + modalOuterClasses + '"><div class="modal-content section-inner ' + modalInnerClasses + '"><a class="modal-close">X</a></div></div>';

      // set up the click event
      $(this).on('click', function(e) {
        e.preventDefault();

        // append the modal before the closing </body> tag and add the class "open" (which hooks into CSS3 animations)
        // NOTE: animate() is used just to provide a slight delay before adding the 'open' class, which is necessary to trigger CSS3 animation (for some reason)
        $modal =  $(modal);
        $modal.appendTo('body');
        modalContent.insertAfter('.modal-close');

        $modal.animate({borderRightWidth: 0}, 10, function() {
          $(this).addClass('open').children('.section-inner').children().show();
        });

        // set up the "close modal" function
        function modalClose() {
          $('body').removeClass('no-scroll');
          $('.modal-wrapper').removeClass('open').animate({borderRightWidth: 0}, 400, function() {
            $(this).remove();
          });
          $(document).unbind("keyup", modalClose);
        }

        // call modalClose() when the "close" button is clicked
        $('.modal-close').on('click', function(event) {
          modalClose();
          event.stopPropagation();
        });
        // call modalClose() when the modal background is clicked
        $('.modal-wrapper').on('click', function() {
          modalClose();
        });
        // stop clicks in the modal content from propagating up and triggering a "close" event
        $('.modal-content').on('click', function(event) {
          event.stopPropagation();
        });
        // call modalClose() when the Esc key is pressed
        $(document).keyup(function(e) {
          if (e.keyCode == 27) {
            modalClose();
          }
        });
      });
    });
  }
}(jQuery));
