# Textured Cube

This is an example of rendering a textured, semi-transparent BoxGeometry with custom vertex and fragment shaders. The main implementation of the geometry and shader logic is in the `src/demo` directory.

This project uses as a starting point the [simple-threejs-typescript-starter](https://github.com/mayacoda/simple-threejs-typescript-starter/), also by me.

## Local development

To install the dependencies and run the page locally run:

```bash
yarn install
yarn dev
```

This will start a local server at `http://localhost:5173` using Vite.


## Building

To build the project run:

```bash
yarn build
```

To preview the build run the following command, which will start a local server with the built app at `http://localhost:4173`.

```bash
yarn preview
```
