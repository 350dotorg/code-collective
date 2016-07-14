$(document).ready(function() {
  var modalHook = '.js-actionkit-popup-form';
  var modalTemplate = '#actionkit-popup-form';
  var actionKitPage = $(modalHook).data('actionkit-page');
  var modalContent = $('#modal-content')

  $(modalHook).modal();
});
