const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
		const node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

		pop() {

		if(this.root) {
      const detached = this.detachRoot();
      if(this.parentNodes.length > 0) {
      	let newRoot = this.restoreRootFromLastInsertedNode(detached);
        this.shiftNodeDown(newRoot);
	    }
      return detached.data;
    }
	}

	detachRoot() {
		
		if (this.root == this.parentNodes[0]) {
			this.parentNodes.shift()
		}
		let root_buffer = this.root;
		this.root = null;
		return root_buffer;
	}

	restoreRootFromLastInsertedNode(detached) {

		const last_inserted = this.parentNodes.pop();
		if (last_inserted){
			if (last_inserted.parent === detached) {
				this.parentNodes.unshift(last_inserted);
			} 
			else {this.parentNodes.unshift(last_inserted.parent);
			}
			last_inserted.remove();
			this.root = last_inserted;

			if (detached.left !== null) {
				last_inserted.appendChild(detached.left);
			}
			if (detached.right !== null) {
				last_inserted.appendChild(detached.right);
			}
		}
	}

	size() {
		let heap_size = 0;
		function count(node) {
			if (node === null) {
				return;
			}
			heap_size++;
			count(node.left);
			count(node.right);   
		}
		count(this.root);
		return heap_size;
	}

	isEmpty() {
		return this.parentNodes.length === 0 ?  true : false
	}

	clear() {

		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
		if (this.root === null) {
			this.root = node;
			this.parentNodes.push(node);
		}
		else{
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);
			if (this.parentNodes[0].left !== null && this.parentNodes[0].right !== null) {
				this.parentNodes.shift();
			}
		}
	}

	shiftNodeUp(node) {
		if (node.parent === null) {
			this.root = node;
		}
		else{
			if (node.priority > node.parent.priority) {
				const buffer_for_nodes = this.parentNodes.indexOf(node);
				const buffer_for_nodes_parent = this.parentNodes.indexOf(node.parent);
				this.parentNodes[buffer_for_nodes] = node.parent;
				this.parentNodes[buffer_for_nodes_parent] = node;
				
				
				node.swapWithParent();
				this.shiftNodeUp(node);
			}
		}
	}

	shiftNodeDown(node) {
		if (node !== null && node.left!==null) {
			
			if (node.priority < node.left.priority){
				


				node.left.swapWithParent();

			}

		}
	}
}

module.exports = MaxHeap;
