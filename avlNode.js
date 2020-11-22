
function AVLNode(data, parent) {
    this.data = data;
    this.parent = parent;
    this.left = null;
    this.right = null;
    this.height = ((this.parent === null) ? 1 : this.parent.height + 1);
}

AVLNode.prototype.set = function (b) {
    this.data = b.data;
    this.left = b.left;
    this.right = b.right;
    this.parent = b.parent;
    this.height = b.height;
}

AVLNode.prototype.search = function (data) {
    if (this.data == data) {
        return this;
    }
    if (this.data > data && this.left !== null) {
        return this.left.search(data);
    }
    if (this.data < data && this.right !== null) {
        return this.right.search(data);
    }
    console.error("Not found");
    return null;
}

AVLNode.prototype.add = function (data) {
    if (this.data === null) {
        this.data = data;
        return this;
    }
    if (this.data < data) {
        if (this.right === null) {
            this.right = new AVLNode(data, this);
            return this.right;
        } else {
            return this.right.add(data);
        }
    }
    if (this.data > data) {
        if (this.left === null) {
            this.left = new AVLNode(data, this);
            return this.left;
        } else {
            return this.left.add(data);
        }
    }
    if (this.data === data) {
        // If equal we can throw an error or choose one of them.
        console.error("duplicate found");
    }
}


AVLNode.prototype.getHeight = function (current) {
    let left = 0;
    let right = 0;
    if (!isLeafEmpty(this.left)) {
        left = this.left.getHeight(current + 1);
    }
    if (!isLeafEmpty(this.right)) {
        right = this.right.getHeight(current + 1);
    }
    return max(left, right, current);
}

AVLNode.prototype.setLeftChild = function (child) {
    if (isLeafEmpty(child))
        return;
    child.parent = this;
    this.left = child;
}

AVLNode.prototype.setRightChild = function (child) {
    if (isLeafEmpty(child))
        return;
    child.parent = this;
    console.log('child data: ' + child.data)
    console.log('child height: ' +child.height)
    if(child.right !== null){
        console.log('child right data: ' +child.right.data)
        console.log('child right height: ' +child.right.height)
    }
   
    this.right = child;
}

function max(a, b, c) {
    if (a > b && a > c) {
        return a;
    }
    if (b > a && b > c) {
        return b
    }
    return c;
}

