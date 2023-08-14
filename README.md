# Dijkstras

Dijkstras is a simple and efficient npm package that implements Dijkstra's algorithm for finding the shortest path in a weighted graph. This package supports TypeScript, ES6 , CJS, and it is designed to be usable in both Node.js and browsers.

## Installation

To start using Dijkstras in your Node.js project, follow these steps:

1. Ensure that you have Node.js installed on your system. You can download it from [https://nodejs.org](https://nodejs.org).

2. Open your terminal or command prompt.

3. Navigate to your project directory.

4. Run the following command to install Dijkstras via npm:

   ```shell
   npm install dijkstras
   ```

5. Wait for the installation process to complete.

6. Congratulations! You've successfully installed Dijkstras for your Node.js project.

## Getting Started

To quickly get started with Dijkstras, follow these steps:

1. Import the Dijkstras module in your Node.js script:

   ```typescript
   import dijkstras from "dijkstras";
   ```

   or :

   ```javascript
   const dijkstras = require("dijkstras");
   ```

2. Create a graph and use the provided methods to find the shortest path:

```typescript
const graph = {
  a: { b: 10, d: 1 },
  b: { a: 1, c: 1, e: 1 },
  c: { b: 1, f: 1 },
  d: { a: 1, e: 1, g: 1 },
  e: { b: 1, d: 1, f: 1, h: 1 },
  f: { c: 1, e: 1, i: 1 },
  g: { d: 1, h: 1 },
  h: { e: 1, g: 1, i: 1 },
  i: { f: 1, h: 1 },
};
const shortestPath = dijkstras.find_path(graph, "a", "i");
console.log("Shortest path:", shortestPath);
```

## Contributing

We welcome contributions from the community to enhance Dijkstras. If you have ideas, bug reports, or feature requests, please open an issue on our GitHub repository at [https://github.com/useCallback/dijkstras](https://github.com/useCallback/dijkstras).

If you'd like to contribute code to the package, please follow these steps:

1. Fork the repository on GitHub.

2. Create a new branch for your feature or bug fix.

3. Make your changes and include appropriate tests.

4. Ensure that all tests pass by running the test suite.

5. Commit your changes and push the branch to your fork.

6. Open a pull request on the main repository, providing a detailed description of your changes.

## License

Dijkstras is open source software released under the [MIT License](https://opensource.org/licenses/MIT). You are free to use, modify, and distribute Dijkstras in accordance with the terms of the license.

## Support

If you encounter any issues while using Dijkstras or have any questions, please contact me at [contact.khalfoun@email.com](mailto:contact.khalfoun@email.com). We're here to help you!

Start finding the shortest paths with Dijkstras!
