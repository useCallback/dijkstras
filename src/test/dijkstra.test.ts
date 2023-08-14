import Dijkstra from "../dijkstra";

let find_path = Dijkstra.find_path;

describe("dijkstra", function () {
  describe(".find_path()", function () {
    it("should find the path between two points, all edges have weight 1", function () {
      // A B C
      // D E F
      // G H I
      let graph = {
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
      let path = find_path(graph, "a", "i");
      expect(path).toEqual(["a", "d", "e", "f", "i"]);
    });

    it("should find the path between two points, weighted edges", function () {
      let graph = {
        a: { b: 10, c: 100, d: 1 },
        b: { c: 10 },
        d: { b: 1, e: 1 },
        e: { f: 1 },
        f: { c: 1 },
        g: { b: 1 },
      };

      let path = find_path(graph, "a", "c");
      expect(path).toEqual(["a", "d", "e", "f", "c"]);
      path = find_path(graph, "d", "b");
      expect(path).toEqual(["d", "b"]);
    });

    it("should throw on unreachable destination", function () {
      let graph = {
        a: { b: 10, c: 100, d: 1 },
        b: { c: 10 },
        d: { b: 1, e: 1 },
        e: { f: 1 },
        f: { c: 1 },
        g: { b: 1 },
      };

      expect(function () {
        find_path(graph, "c", "a");
      }).toThrowError();
      expect(function () {
        find_path(graph, "a", "g");
      }).toThrowError();
    });

    it("should throw on non-existent destination", function () {
      let graph = {
        a: { b: 10, c: 100, d: 1 },
        b: { c: 10 },
        d: { b: 1, e: 1 },
        e: { f: 1 },
        f: { c: 1 },
        g: { b: 1 },
      };

      expect(function () {
        find_path(graph, "a", "z");
      }).toThrowError();
    });
  });

  describe(".single_source_shortest_paths()", function () {
    it("should find all paths from a node", function () {
      let graph = {
        a: { b: 10, c: 100, d: 1 },
        b: { c: 10 },
        d: { b: 1, e: 1 },
        e: { f: 1 },
        f: { c: 1 },
        g: { b: 1 },
      };

      // All paths from 'a'
      let paths = Dijkstra.single_source_shortest_paths(graph, "a");
      expect(paths).toEqual({
        d: "a",
        b: "d",
        e: "d",
        f: "e",
        c: "f",
      });
    });
  });
});
