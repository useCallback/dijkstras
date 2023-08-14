import { SimplePriorityQueue } from "./priority-queue/simple-priority-queue";
import { PriorityQueue } from "./priority-queue/priority-queue";
import { IPriorityQueue, QueueItem } from "./priority-queue/priority-queue.interface";

export type Graph = Record<string, Record<string, number>>;
export type Node = string;
export type Costs = Record<string, number>
export type Predecessors = Record<Node, Node>

export default class Dijkstra {
  static single_source_shortest_paths(graph: Graph, s: Node, d?: Node) {
    // Predecessor map for each node that has been encountered.
    // node ID => predecessor node ID
    let predecessors: Predecessors = {};

    // Costs of shortest paths from s to all nodes encountered.
    // node ID => cost
    let costs: Costs = {};
    costs[s] = 0;

    // Costs of shortest paths from s to all nodes encountered; differs from
    // `costs` in that it provides easy access to the node that currently has
    // the known shortest path from s.
    // XXX: Do we actually need both `costs` and `open`?

    let open: IPriorityQueue = new SimplePriorityQueue();
    open.push(s, 0);

    let closest: QueueItem,
      u, v,
      cost_of_s_to_u: number,
      adjacent_nodes,
      cost_of_e: number,
      cost_of_s_to_u_plus_cost_of_e: number,
      cost_of_s_to_v: number,
      first_visit;
    while (!open.empty()) {
      // In the nodes remaining in graph that have a known cost from s,
      // find the node, u, that currently has the shortest path from s.
      closest = open.pop();
      u = closest.value;
      cost_of_s_to_u = closest.cost;

      // Get nodes adjacent to u...
      adjacent_nodes = graph[u] || {};

      // ...and explore the edges that connect u to those nodes, updating
      // the cost of the shortest paths to any or all of those nodes as
      // necessary. v is the node across the current edge from u.
      for (v in adjacent_nodes) {
        if (adjacent_nodes.hasOwnProperty(v)) {
          // Get the cost of the edge running from u to v.
          cost_of_e = adjacent_nodes[v];

          // Cost of s to u plus the cost of u to v across e--this is *a*
          // cost from s to v that may or may not be less than the current
          // known cost to v.
          cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;

          // If we haven't visited v yet OR if the current known cost from s to
          // v is greater than the new cost we just found (cost of s to u plus
          // cost of u to v across e), update v's cost in the cost list and
          // update v's predecessor in the predecessor list (it's now u).
          cost_of_s_to_v = costs[v];
          first_visit = (typeof costs[v] === 'undefined');
          if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
            costs[v] = cost_of_s_to_u_plus_cost_of_e;
            open.push(v, cost_of_s_to_u_plus_cost_of_e);
            predecessors[v] = u;
          }
        }
      }
    }

    if (typeof d !== 'undefined' && typeof costs[d] === 'undefined') {
      let msg = ['Could not find a path from ', s, ' to ', d, '.'].join('');
      throw new Error(msg);
    }

    return predecessors;
  };


  static extract_shortest_path_from_predecessor_list(predecessors: Predecessors, d: Node) {
    let nodes = [];
    let u = d;
    let predecessor;
    while (u) {
      nodes.push(u);
      predecessor = predecessors[u];
      u = predecessors[u];
    }
    nodes.reverse();
    return nodes;
  };

  static find_path(graph: Graph, s: Node, d: Node) {
    let predecessors = Dijkstra.single_source_shortest_paths(graph, s, d);
    return Dijkstra.extract_shortest_path_from_predecessor_list(
      predecessors, d);
  };

}