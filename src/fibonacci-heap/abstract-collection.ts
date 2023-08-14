type Node = {}
export abstract class AbstractCollection {

    /**
     * Test whether heap contains a node that makes the callback pass.
     *
     * @param {Function} callback to test on each node.
     */
    public any(callback: Function) {
        let result = false;
        this.forEach(function (node) {
            if (callback(node)) {
                result = true;
            }
        });

        return result;
    }

    /**
     * Test whether every heap node passes callback test.
     *
     * @param {Function} callback to test on each node.
     */
    public every(callback: Function) {
        let result = true;
        this.forEach(function (node) {
            if (!callback(node)) {
                result = false;
            }
        });

        return result;
    }


    /**
     * @return {number} the number of members in the collection.
     */
    public size() {
        let count = 0;
        this.forEach(function (node) {
            count += 1;
        });

        return count;
    }

    /**
     * Specific collections should implement forEach!
     */
    public forEach(callback: (value: Node, index: number, array: Node[]) => void) {
    }
}
