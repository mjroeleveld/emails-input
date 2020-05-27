# emails-input

VanillaJS emails input component.

## Install

`npm install <url>`

## Basic usage

```html
<div id="emails-input" class="EmailsInput-themed"></div>
<script src="emails-input.js"></script>
<script>
  var inputContainerNode = document.querySelector('#emails-input');
  var emailsInput = EmailsInput(inputContainerNode, { 
    // Options
  });
</script>
```

## API



## Styles / theme

Add/remove the class `.EmailsInput-themed` on the container element to toggle the theme. With the theme disabled no cosmetic styles will be applied.

See `src/theme.scss` for an idea which classes to use.

## Example

Find an example in `dist/index.html`.

## Contributing

This plugin is developed with **Webpack 4** and **Babel 7**.

- Run dev server: `npm run start`
- Build: `npm run build`
- Test: `npm run test`
