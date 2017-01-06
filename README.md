
jQuery Fancy Button (fancyButton) is a light-weight button visualization plugin. The plugin exposes a simple API for displaying buttons with nice smooth animations. 

fancyButton has been designed with performance in mind. The non-minified version of the plugin is 5 KB.

# Requirements

jQuery (1.6 or higher)
VelocityJS (1.4 or higher)

# Getting Started

You can clone or download fancyButton from this repository. The download includes a non-minified and minified version of the plugin.

fancyButton requires jQuery and VelocityJS to work. So, make sure that you have both libraries included on your page before loading the plugin:

```javascript
<script type="text/javascript" src="path-to-jquery/jquery.js"></script>
<script type="text/javascript" src="path-to-jquery/velocity.js"></script>
```

To include the minified version of the plugin on your page, simply add:

```javascript
<script type="text/javascript" src="path-to-plugin/jquery-fancy-button.min.js"></script>
```

To include the non-minified version of the plugin, add:

```javascript	
<script type="text/javascript" src="path-to-plugin/fancy-button.js"></script>
```

Alternatively, you can include the plugin in an async manner, like this:

```javascript
<script type="text/javascript">
	jQuery(document).ready(function() {
	
		// define path to jquery-notifier
		var pluginUrl = 'path-to-plugin/jquery-fancy-button.js';
		
		// get plugin asynchronously
		$.getScript(pluginUrl, function() {
			// the plugin is loaded and ready to use
			
			// your code goes here...
		});
	});
</script>
```


# How to Use

You can use fancyButton like this:

```javascript
<script type="text/javascript">
	jQuery(document).ready(function($) {
	
		// cache fancyButton
		var fancyButton = $('body').fancyButton();
		
		// create a fancyButton instance
		var btn1 = fancyButton.createInstance();
		
		// initialize your instance
		btn1.init({
			selector: '.button-1',
			slidesCount: 4,
			hoverColor: '#2c3e50',
			duration: 500,
			timeOffset: 100
		});
	});
</script>
```

The above code will initialize a fancyButton with selector '.button-1'. The button will have 4 slides, which will move with a speed of 500 milliseconds. The slides will move with a time delay of 100 milliseconds.

Here's an example of initializing 2 fancy buttons on the same page:

```javascript
<script type="text/javascript">
	jQuery(document).ready(function($) {
	
		// cache notifier
		var fancyButton = $('body').fancyButton();
		
		// create instance for button 1
		var btn1 = fancyButton.createInstance();
		
		// create instance for button 2
		var btn2 = fancyButton.createInstance();

		// initialize button 1
		btn1.init({
			selector: '.button-1',
			slidesCount: 4,
			hoverColor: '#2c3e50',
			duration: 500,
			timeOffset: 100
		});

		// initialize button 2
		btn2.init({
			selector: '.button-2',
			slidesCount: 12,
			hoverColor: '#c0392b',
			duration: 200,
			timeOffset: 50
		});
	});
</script>
```