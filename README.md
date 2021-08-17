# Widget Loader

Singleton helper to inject HTML, CSS, JS from JSON/API into a webpage.

## How do I use it?

### Include Script

```html
<script src="assets/js/block-loader.min.js"></script>
```

### Run on DOMContentLoaded

```javascript
document.addEventListener('DOMContentLoaded', function() {
  // Append to Element
  widgetLoader.load('/my/data/data.json', widgetLoader.append);

  // Replace Element
  widgetLoader.load('/my/data/data.json', widgetLoader.replace);

  // Custom Callback
  widgetLoader.load('/my/data/data.json', function(data) {
    data.target = '#newTarget';
    widgetLoader.append(data);
  });
});
```

### Public Methods

- `load` takes two arguements (url, callback).
- `append` append elem.innerHTML with data.
- `replace` replace elem.innerHTML with data.

## How does it work?

```json
{
  "target": "#mainBody",
  "html": "<h1>This text is dynamically added</h1>",
  "css": ["css/demo-styles.css"],
  "js": ["js/demo-block-bundle.js"]
}
```

- `target` elem to append or replace html
- `html` this is the HTML that will be rendered into the page.
- `css` This stylesheet will be added into the head of the page.
- `js` This script will be added to the head of the page.

### Notes:

Quotes must be esacped.

```json
"html": "<h1 class=\"demo-block another-class\">This text is dynamically added</h1>"

```

For single classes/attr quotes can be ommitted and be valid HTML.

```json
"html": "<h1 class=demo-block>This text is dynamically added</h1>"

```

## Resources:

https://kangax.github.io/html-minifier/

## Built With

- Vanilla JS

## How can I contribute?

Please read [CONTRIBUTING.md] for details on our code of conduct, and the process for submitting pull requests to us. (coming soon)

## Author

- **Kyle Langford** - [www.kylelangford.com](http://www.kylelangford.com)
