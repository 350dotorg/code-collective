$(document).ready(function() {
  var modalHook = '.js-actionkit-popup-form';
  var actionKitPage = $(modalHook).data('actionkit-page');
  var modalContent = $('#modal-content');

  function getFormData(actionKitPage) {
    return new Promise(
      function(resolve, reject) {
        $.getJSON('http://act.350.org/act/' + actionKitPage + '/?template_set=json_form_data&jsonp=?', resolve, reject);
      }
    );
  }

  function parseFields(data) {
    return {
      title: createTitle(data.title),
      introText: createIntroText(data.introduction_text),
      form: createForm(data.fields.map(toFormField))
    };
  }

  function createTitle(title) {
    return $(`<h3>${title}</h3>`);
  }

  function createIntroText(text) {
    return $(text);
  }

  function toFormField(fieldData) {
    const label = $(`<div><label>${fieldData.label}</label></div>`);
    return label.append($(fieldData.tag));
  }

  function createForm(fields) {
    var $form = $('<form action="https://act.350.org/act/" method="post"></form>');
    $form.append(fields, $('<input type="submit" value="Submit"/>'), $(`<input type="hidden" name="page" value="${actionKitPage}">`));

    return $form;
  }

  function addFieldsTo(container) {
    return function(fields) {
      for (var field in fields) {
        container.append(fields[field]);
      }
    }
  }

  function initializeModal() {
    $(modalHook).modal();
  }

  getFormData(actionKitPage)
    .then(parseFields)
    .then(addFieldsTo(modalContent))
    .then(initializeModal);
});
