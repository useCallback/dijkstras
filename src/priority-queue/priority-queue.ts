import { FibonacciHeap } from "../fibonacci-heap";
import { IPriorityQueue } from "./priority-queue.interface";

export class PriorityQueue implements IPriorityQueue {
    queue: FibonacciHeap;
    constructor() {
        this.queue = new FibonacciHeap();
    }
    pop() {
        let deleted_item = this.queue.deleteMin();
        if (!deleted_item) {
            throw new Error('Could not delete item')
        }
        console.log("----------queue pop,", this.queue);
        return { value: deleted_item.value, cost: deleted_item.priority }
    };

    push(value: string, cost: number) {
        this.queue.insert({ value: value, priority: cost });
        console.log("----------queue push,", this.queue);

    }
    empty() {
        console.log("----------queue empty,", this.queue.trees.length === 0);
        return this.queue.trees() !== 0;
    }
}