import { IPriorityQueue, QueueItem } from "./priority-queue.interface";
export class SimplePriorityQueue implements IPriorityQueue {

    constructor() {
        this.queue = [];
    }
    queue: QueueItem[];
    private default_sorter(a: QueueItem, b: QueueItem) {
        return a.cost - b.cost;
    }
    push(value: string, cost: number) {
        var item = { value: value, cost: cost };
        this.queue.push(item);
        this.queue.sort(this.default_sorter);
    }

    pop() {
        return this.queue.shift() as QueueItem;
    }

    empty() {
        return this.queue.length === 0;
    }
}
