$(document).ready(function() {
  var modalHook = '.js-actionkit-popup-form';
  var modalTemplate = '#actionkit-popup-form';
  var actionKitPage = $(modalHook).data('actionkit-page');
  var modalContent = $('#modal-content')

  $(modalHook).modal();

  $.getJSON("http://act.350.org/act/sweden-kiitg-pledge/?template_set=json_form_data&jsonp=?", function(result){
  });
});
