$(document).ready(function() {
  var modalHook = '.js-actionkit-popup-form';
  var modalTemplate = '#actionkit-popup-form';
  var actionKitPage = $(modalHook).data('actionkit-page');
  var modalContent = $('#modal-content')

  function initializeModal() {
    $(modalHook).modal();
  }

  getFormData()
    .then(parseFields)
    .then(addFieldsTo(modalContent))
    .then(initializeModal);
});

function toFormField(fieldData) {
  const label = $(`<label>${fieldData.label}:  </label>`);

  return label.append($(fieldData.tag));
}

function createTitle(title) {
  return $(`<h1>${title}</h1>`);
}

function createIntroText(text) {
  return $(text);
}

function createForm(fields) {
  return $('<form></form>').append(fields);
}

function parseFields(data) {
  return {
    title: createTitle(data.title),
    introText: createIntroText(data.introduction_text),
    form: createForm(data.fields.map(toFormField))
  };
}

function addFieldsTo(container) {
  return function(fields) {
    for (field in fields) {
      container.append(fields[field]);
    }
  }
}

function getFormData() {
  return new Promise(
    function(resolve, reject) {
      $.getJSON("http://act.350.org/act/sweden-kiitg-pledge/?template_set=json_form_data&jsonp=?", resolve, reject)
    }
  );
}
