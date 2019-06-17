## Ways to Init Injector

```javascript
document.addEventListener("DOMContentLoaded", function() {
  widgetLoader.load('/my/data/data.json', widgetLoader.append);

  widgetLoader.load('/my/data/data.json', widgetLoader.replace);

  widgetLoader.load('/my/data/data.json', function(data) {

  	data.target = "#newTarget";
  	widgetLoader.append(data);

  });

});

```
