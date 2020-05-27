# emails-input

VanillaJS emails input component.

## Install

`npm install <url>`
	
## Example

Find an example in `dist/index.html`.

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

<dl>
<dt><a href="#constructor">EmailsInput(elem, opts)</a></dt>
<dd><p>Construct an emails input.</p>
</dd>
<dt><a href="#addValue">EmailsInput.addValue(value)</a></dt>
<dd><p>Add a value to the list of values.</p>
</dd>
<dt><a href="#getAllValues">EmailsInput.getAllValues()</a> ⇒ <code>Array.&lt;String&gt;</code></dt>
<dd><p>Get all values.</p>
</dd>
<dt><a href="#getValidValues">EmailsInput.getValidValues()</a> ⇒ <code>Array.&lt;String&gt;</code></dt>
<dd><p>Get valid values.</p>
</dd>
<dt><a href="#replaceAllValues">EmailsInput.replaceAllValues(values)</a></dt>
<dd><p>Replace all current values by the given values.</p>
</dd>
<dt><a href="#subscribe">EmailsInput.subscribe(listener)</a></dt>
<dd><p>Subscribe to any changes to the values.</p>
</dd>
<dt><a href="#unsubscribe">EmailsInput.unsubscribe(listener)</a></dt>
<dd><p>Unsubscribe listener.</p>
</dd>
<dt><a href="#init">EmailsInput.init()</a></dt>
<dd><p>(Re)initialize EmailsInput instance. Renders an empty form.</p>
</dd>
<dt><a href="#reset">EmailsInput.reset()</a></dt>
<dd><p>Reset EmailsInput instance.</p>
<p>Unsubscribes listeners and clears values.</p>
</dd>
</dl>

<a name="constructor"></a>

### EmailsInput(elem, opts)
Construct an emails input.


| Param | Type | Description |
| --- | --- | --- |
| elem | <code>HTMLElement</code> | HTML element to be bind the EmailsInput instance to. |
| opts | <code>Object</code> | Options |
| opts.placeholderText | <code>Number</code> | Input placeholder text |

<a name="addValue"></a>

### EmailsInput.addValue(value)
Add a value to the list of values.


| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | The value to be added. |

<a name="getAllValues"></a>

### EmailsInput.getAllValues() ⇒ <code>Array.&lt;String&gt;</code>
Get all values.

<a name="getValidValues"></a>

### EmailsInput.getValidValues() ⇒ <code>Array.&lt;String&gt;</code>
Get valid values.

<a name="replaceAllValues"></a>

### EmailsInput.replaceAllValues(values)
Replace all current values by the given values.


| Param | Type | Description |
| --- | --- | --- |
| values | <code>Array.&lt;String&gt;</code> | The new values |

<a name="subscribe"></a>

### EmailsInput.subscribe(listener)
Subscribe to any changes to the values.


| Param | Type | Description |
| --- | --- | --- |
| listener | <code>function</code> | Listener function |

<a name="unsubscribe"></a>

### EmailsInput.unsubscribe(listener)
Unsubscribe listener.


| Param | Type | Description |
| --- | --- | --- |
| listener | <code>function</code> | Listener function |

<a name="init"></a>

### EmailsInput.init()
(Re)initialize EmailsInput instance. Renders an empty form.

<a name="reset"></a>

### EmailsInput.reset()
Reset EmailsInput instance.

Unsubscribes listeners and clears values.


## Styling

Add/remove the class `.EmailsInput-themed` on the container element to toggle the theme. With the theme disabled no cosmetic styles will be applied.

See `src/theme.scss` for an idea which classes to use.


## Contributing

This plugin is developed with **Webpack 4** and **Babel 7**.

- Run dev server: `npm run start`
- Build: `npm run build`
- Test: `npm run test`
