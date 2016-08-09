# ActionKit Popup Form

Background: 350.org staffers want to be able to take the form on an ActionKit page such as [this one](http://act.350.org/signup/sweden-kiitg-pledge/) and embed it in a popup on an external site.

Goal: use the JSONP endpoints below to get the necessary data to recreate the form in a popup.

- http://act.350.org/act/sweden-kiitg-pledge/?template_set=json_form_data&jsonp=foo
- http://act.350.org/context/sweden-kiitg-pledge/?callback=myCallback

Open `index.html` in a browser to see a demo of this feature.

About the directory structure:

- `src` contains our code
- `lib` contains code provided by 350.org
- `vendor` contains third-party code

## How to use this code

In the markup below, the 'Click to Sign Up' link is where every happens. Specify a place to store the modal content using `data-modal-source`. In the example, this points to the div below with the id `modal-content`. Then, specify an ActionKit form to copy using `data-actionkit-page`. `data-actionkit-behavior` is an optional parameter where you can specify `redirect` if you want the page to redirect to the original form's thank you page after the user clicks submit. Otherwise, by default, the page will not refresh and the modal content will be replaced by a thank you message instead.

```
<div class="demo-content">
  <div class="demo-button">
    <a href="#" class="js-actionkit-popup-form button" data-modal-source="#modal-content" data-actionkit-page="sweden-kiitg-pledge" data-actionkit-behavior="redirect">
      Click to Sign Up
    </a>
  </div>
  <div id="modal-content" style="display: none"></div>
</div>
```
