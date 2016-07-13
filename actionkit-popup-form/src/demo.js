$(document).ready(function() {
  var modalHook = '.js-actionkit-popup-form';
  var modalTemplate = '#actionkit-popup-form';
  var actionKitPage = $(modalHook).data('actionkit-page');
  
  $(modalHook).on('click', function() {
    $(modalTemplate).append('<h1>' + actionKitPage + '</h1>');
    $(modalHook).modal();
  });
});
