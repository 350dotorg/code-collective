$(document).ready(function() {
  var modalHook = '.js-actionkit-popup-form';
  var actionKitPage = $(modalHook).data('actionkit-page');
  var redirect = $(modalHook).data('actionkit-behavior') === 'redirect';
  var modalContent = $('#modal-content');
  var ACTION_URL = 'https://act.350.org/act/';

  function getFormData(actionKitPage) {
    return new Promise(
      function(resolve, reject) {
        $.getJSON('http://act.350.org/act/' + actionKitPage + '/?template_set=json_form_data&jsonp=?&country_choices=true', resolve, reject);
      }
    );
  }

  function parseFields(data) {
    return {
      title: createTitle(data.title),
      introText: createIntroText(data.introduction_text),
      form: createForm(data.fields, data.country_choices, data.thank_you_text)
    };
  }

  function createTitle(title) {
    return $(`<h3>${title}</h3>`);
  }

  function createIntroText(text) {
    return $(text);
  }

  function toFormField(fieldData, countries) {
    var label = $(`<div><label for="${fieldData.field_name}">${fieldData.label}</label></div>`);
    var input;

    if (fieldData.field_name === 'country') {
      input = $('<select name="country" id="id_country" class="ak-userfield-input"></select>');
      countries.forEach(function(country) {
        input.append($(`<option value="${country.value}">${country.name}</option>`));
      });
    } else {
      input = $(fieldData.tag);
    }

    if (fieldData.required) {
      input.prop('required', true);
    }

    return label.append(input);
  }

  function createForm(fields, countries, thankYou) {
    fields = fields.map(function(field) {
      return toFormField(field, countries);
    });

    var $form = $('<form name="actionkit-form"></form>');
    var $submit = $('<input type="submit" value="Submit"/>');
    var $hiddenField = $(`<input type="hidden" name="page" value="${actionKitPage}">`);

    if (redirect) {
      $form.attr('action', ACTION_URL);
      $form.attr('method', 'post');
    } else {
      $form.submit(function() {
        var data = $('form[name=actionkit-form]').serialize();

        $.ajax({
          url: ACTION_URL,
          type: 'post',
          dataType: 'jsonp',
          data: data,
          success: function() {
            $('.modal-wrapper').find('#modal-content').html(thankYou);
          },
          error: function() {
            // handle error here
          }
        });

        return false;
      });
    }

    $form.append(fields, $submit, $hiddenField);

    return $form;
  }

  function addFieldsTo(container) {
    return function(fields) {
      for (var field in fields) {
        if (fields.hasOwnProperty(field)) {
          container.append(fields[field]);
        }
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
