## Ways to Init Injector

```javascript

// https://hle.dev-hlthlink.com/sites/americas_best/public/js/hle-block-loader.js
// https://hle.dev-hlthlink.com/sites/americas_best/public/data/email-subscribe-form.json
// build/data/email-subscribe-form.json

document.addEventListener("DOMContentLoaded", function() {
  HleBlock.load('https://hle.dev-hlthlink.com/sites/americas_best/public/data/email-subscribe-form.json', HleBlock.append);

  HleBlock.load('https://hle.dev-hlthlink.com/sites/americas_best/public/data/email-subscribe-form.json', HleBlock.replace);

  HleBlock.load('https://hle.dev-hlthlink.com/sites/americas_best/public/data/email-subscribe-form.json', function(data) {

  	data.target = "#newTarget";
  	HleBlock.append(data);

  });

});

```
