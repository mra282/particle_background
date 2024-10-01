# Custom Particles.js

A customizable particle system inspired by Particles.js, with support for connecting lines, particle color customization, canvas background color, and a snow mode where particles fall like snow.

## Features

- **Connecting Lines**: Particles connect with lines when they are close to each other.
- **Particle Color**: Customize the color of the particles.
- **Canvas Background Color**: Set the background color of the canvas.
- **Snow Mode**: Particles fall from the top like snow and reset when they reach the bottom.

## Installation

Clone the repository:

```sh
git clone https://github.com/yourusername/custom-particles-js.git
```

Navigate to the project directory:
```sh
cd custom-particles-js
```

Open index.html in your browser to see the particle system in action.

## Usage

To use the particle system, include the particles.js script in your HTML file and initialize the ParticleSystem with your desired options.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Custom Particles.js</title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            overflow: hidden;
        }
        canvas {
            display: block;
        }
    </style>
</head>
<body>
    <canvas id="particleCanvas"></canvas>
    <script src="particles.js"></script>
    <script>
        const canvas = document.getElementById('particleCanvas');
        const options = {
            connectLines: true,
            particleColor: 'rgba(255, 255, 255, 0.8)',
            backgroundColor: 'darkblue',
            snow: true
        };
        const particleSystem = new ParticleSystem(canvas, 100, options);
    </script>
</body>
</html>
```

## Options
    - connectLines (default: true): Whether to draw lines between particles when they are close.
    - particleColor (default: rgba(255, 255, 255, random)): The color of the particles.
    - backgroundColor (default: darkblue): The background color of the canvas.
    - snow (default: false): Whether to enable snow mode, where particles fall from the top.

## License
This project is licensed under the MIT License. See the LICENSE file for details.