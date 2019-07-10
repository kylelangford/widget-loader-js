# Block Loader

Simple helper to inject html, css, js from JSON into a webpage.

## How do I use it?

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

### Options

- `append` Append innerHTML with Data.
- `replace` Replace innerHTML with Data.

### Include Script

```html
<script src="assets/js/block-loader.min.js"></script>
```

## How does it work?

```json
{
	"target": "#mainBody",
	"html": "<h1 class=demo-block>This text is dynamically added</h1>",
	"css": ["css/demo-styles.css"],
	"js": ["js/demo-block-bundle.js"]
}
```

## Built With

- Vanilla JS

## How can I contribute?

Please read [CONTRIBUTING.md] for details on our code of conduct, and the process for submitting pull requests to us. (coming soon)

## Author

- **Kyle Langford** - [www.kylelangford.com](http://www.kylelangford.com)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
