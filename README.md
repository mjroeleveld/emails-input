# emails-input
VanillaJS emails input component.

# Install
`npm install <url>`

# Basic usage
```html
<div id="emails-input"></div>
<script src="emails-input.js"></script>
<script>
  var inputContainerNode = document.querySelector('#emails-input');
  var emailsInput = EmailsInput(inputContainerNode, { rows: 4 });
</script>
```

# Configuration options
```json
{
  "rows": 4 
}
```

# API

# Styling

You can easily override the default styles using CSS. Refer to `src/styles.scss` for the class structure.

# Example

You can find an example in `dist/index.html`.

# Contributing
This plugin is developed with **Webpack 4** and **Babel 7**.

- Run dev server: `npm run start`
- Build: `npm run build`
- Test: `npm run test`
