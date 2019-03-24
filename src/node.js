class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.left = null;
		this.right = null;
		this.parent = null;
	}

	appendChild(node) {
		if (this.left!==null&&this.right===null) {
			this.right = node;
			node.parent = this;
		}
		if (this.left===null){
			this.left = node;
			node.parent = this;
		}

	}

	removeChild(node) {
		if(this.left===node){
			this.left.parent=null;
			this.left=null;
			}
		else if(this.right===node){
			this.right.parent=null;
			this.right=null;
			}
		else{throw new Error('Ошибка')}
		}
	
	remove() {

		if(this.parent !== null){
			this.parent.removeChild(this)
		}

	}

	swapWithParent() {
		if(this.parent !== null){
			const buffer_parent_parent = this.parent.parent
			const buffer_parent = this.parent;
			const buffer_left = this.left;
			const buffer_right = this.right;

			
			if(this.parent.parent!==null){

				if(buffer_parent===this.parent.parent.left){
				this.parent.parent.left=this
				}
				else{this.parent.parent.right=this}

			}

			if(this.parent.left === this){


				this.right = this.parent.right;

				if(this.parent.right!==null){
					this.parent.right.parent=this
				}

				this.parent.right = buffer_right;

				this.left = this.parent;
				this.parent.left=buffer_left;

				this.parent.parent=this

				this.parent = buffer_parent_parent
				
				
			}
			else{
				this.left = this.parent.left;
			
				if(this.parent.left!==null){
					this.parent.left.parent=this
				}

				this.parent.left = buffer_left;

				this.right = this.parent;
				this.parent.right=buffer_right;

				this.parent.parent=this

				this.parent = buffer_parent_parent
			}

		}
	}
}

module.exports = Node;
