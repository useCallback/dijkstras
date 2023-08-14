import { Node } from "../dijkstra";


export type QueueItem = { value: string, cost: number }

export interface IPriorityQueue {
    push: (value: Node, cost: number) => void;
    pop: () => QueueItem;
    empty: () => boolean;

}