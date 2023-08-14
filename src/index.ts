import { SimplePriorityQueue } from "./priority-queue/simple-priority-queue";
import { PriorityQueue } from "./priority-queue/priority-queue";
import { IPriorityQueue, QueueItem } from "./priority-queue/priority-queue.interface";

export type Graph = Record<string, Record<string, number>>;
export type Node = string;
export type Costs = Record<string, number>
export type Predecessors = Record<Node, Node>

export default class Dijkstra {
  static single_source_shortest_paths(graph: Graph, s: Node, d?: Node) {
    let predecessors: Predecessors = {};
    let costs: Costs = {};
    costs[s] = 0;

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
      closest = open.pop();
      u = closest.value;
      cost_of_s_to_u = closest.cost;
      adjacent_nodes = graph[u] || {};
      for (v in adjacent_nodes) {
        if (adjacent_nodes.hasOwnProperty(v)) {
          cost_of_e = adjacent_nodes[v];
          cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;
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