import { AbstractCollection } from "./abstract-collection"
import deepEqual from "deep-equal";
import { indexOf } from "./array"


export class FibonacciHeap extends AbstractCollection {
    _rootList: Node[];
    _mark: Record<string, boolean>;
    private _min: Node | null = null;
    private _valueToNode: Record<string, Node>;
    constructor() {
        super();
        this._valueToNode = {};
        this._rootList = [];
        this._mark = {};
    }

    /**
     * Add a value to the heap with some priority.
     *
     * heap.insert({ value: x, priority: 5 });
     *
     * @param {Object} options value and priority.
     */
    public insert(options: { value: any, priority: number }) {
        let node = new Node();
        node.value = options.value;
        node.priority = options.priority;

        this._rootList.push(node);

        if (this._min === null || this._min.priority > node.priority) {
            this._min = node;
        }

        // Cache the node for future lookups.
        let key = node.value;
        this._valueToNode[key] = node;

        this._mark[key] = false;
    };


    /**
  * Delete the min priority node from the heap.
  *
  * @return {Object} the element from the queue that has the highest priority.
  */
    public deleteMin() {
        if (!this._min) {
            return;
        }
        let index = indexOf(this._rootList, (node) => {
            return deepEqual(node, this._min);
        }, this);
        this._rootList.splice(index, 1);

        // Remove the min node from the cache.
        let key = this._min.value;
        delete this._valueToNode[key];
        delete this._mark[key];

        // Meld children into root list.
        this._min.children.forEach((node) => {
            this._rootList.push(node);
        });

        let min = this._min;
        this._min = null;
        this._rootList.forEach((node) => {
            if (this._min === null || this._min.priority > node.priority) {
                this._min = node;
            }
        });
        this._consolidate();

        return min;
    };

    /**
     * Consolidate trees so that no two roots have the same rank.
     */
    private _consolidate() {
        let rankToTree: Record<number, Node> = {};
        for (let i = 0; i < this._rootList.length;) {
            let node = this._rootList[i];
            let rank = node.rank();

            // If we haven't yet found a tree that shares
            // a rank with this one, record it and continue.
            if (!(rank in rankToTree)) {
                rankToTree[rank] = node;
                i++;
                continue;
            }


            // Link root with other since they have the same rank.
            let other = rankToTree[rank];
            let smaller: Node;
            let larger: Node;
            if (node.priority < other.priority) {
                smaller = node;
                larger = other;
            } else {
                smaller = other;
                larger = node;
            }

            delete rankToTree[rank];

            // Remove both nodes from the root list.
            let smallerIndex = indexOf(this._rootList, (node) => {
                return deepEqual(node, smaller);
            }, this);
            this._rootList.splice(smallerIndex, 1);
            let largerIndex = indexOf(this._rootList, (node) => {
                return deepEqual(node, larger);
            }, this);
            this._rootList.splice(largerIndex, 1);

            // Make the larger one point to the smaller one.
            smaller.children.push(larger);
            larger.parent = smaller;

            // Add the smaller one back into the root list.
            this._rootList.push(smaller);
            i--;
        }
    }



    /**
     * Update the priority of some queue value.
     *
     * heap.update({ value: x, priority: 100 });
     *
     * @param {Object} options value and priority.
     */
    public update(options: { value: any, priority: number }) {
        let value = options.value;
        let priority = options.priority;
        let key = value;
        let node = this._valueToNode[key];
        node.priority = priority;

        // If it doesn't violate heap-ordering, just update priority.
        if (!node.parent || node.parent.priority <= node.priority) {

            if (this._min !== null && node.priority < this._min.priority) {
                this._min = node;
            }

            return;
        }

        while (true) {
            let parent = node.parent;
            parent?.removeChild(node);
            node.parent = null;
            this._rootList.push(node);
            if (this._min?.priority && node.priority < this._min.priority) {
                this._min = node;
            }
            let key = node.value;
            this._mark[key] = false;

            // If the parent is a root, we're done.
            if (!parent?.parent) {
                break;
            }

            // If parent is unmarked, mark it.
            let parentKey = parent.value;
            if (!this._mark[parentKey]) {
                this._mark[parentKey] = true;
                break;
            }

            // If parent is marked, recurse.
            node = parent;
        }
    };


    public trees(): number {
        return this._rootList.length;
    };



    /**
     * Invoke a function on each node.
     *
     * @param {Function} callback to invoke.
     */
    public forEach(callback: Function) {
        for (let i = 0; i < this._rootList.length; i++) {
            let node = this._rootList[i];
            node.iterate(function (next: Node) {
                callback(next);
            });
        }
    };
}

export class Node {
    children: Node[];
    parent: Node | null = null;
    priority: number = Infinity;
    value: string = "";
    constructor() {
        this.children = [];
    }

    /**
     * Apply some function to each node in the subtree
     * rooted at us.
     *
     * @param {Function} callback to invoke.
     */
    public iterate(callback: Function) {
        callback(this);
        this.children.forEach(function (childNode) {
            childNode.iterate(callback);
        });
    }


    /**
     * @return {number} number of children.
     */
    public rank() {
        return this.children.length;
    }

    /**
     * @param {Node} childNode some node.
     */
    public removeChild(childNode: Node) {
        let index = indexOf(this.children, function (node) {
            return deepEqual(node, childNode);
        }, this);
        this.children.splice(index, 1);
    }


}