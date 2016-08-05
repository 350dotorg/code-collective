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
