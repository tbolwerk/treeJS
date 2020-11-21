function BinaryNode(data) {
    this.data = data;
    this.parent = null;
    this.left = null;
    this.right = null;
}

BinaryNode.prototype.removeAsChild = function () {
    if (this.parent.left === this) {
        this.parent.left = null;
    }
    if (this.parent.right === this) {
        this.parent.right = null;
    }
}

function isLeafEmpty(node) {
    return node === null || node.data === null;
}

BinaryNode.prototype.remove = function (data) {
    if (this.data > data) {
        this.left.remove(data);
        return;
    }
    if (this.data < data) {
        this.right.remove(data);
        return;
    }
    if (isLeafEmpty(this.left) && isLeafEmpty(this.right)) {
        this.setToNull();
        return;
    }

    if (!isLeafEmpty(this.left) && !isLeafEmpty(this.right)) {
        if(this.right.left === null){
            this.data = this.right.data;
            this.right = this.right.right;
            return;
        }
        let tmp = this.right.findMin();
        this.data = tmp.data;
        tmp.parent.left = tmp.right;
        return;
    }

    if (!isLeafEmpty(this.right)) {
        this.data = this.right.data;
        this.right = this.right.right;
        return;
    }

    if (!isLeafEmpty(this.left)) {
        this.data = this.left.data;
        this.left = this.left.left;
        return;
    }
}

BinaryNode.prototype.findMin = function () {
    if (this.left !== null) {
        return this.left.findMin();
    }
    return this;
}

BinaryNode.prototype.search = function (data) {
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


BinaryNode.prototype.add = function (data) {
    if (this.data === null) {
        this.data = data;
        return;
    }
    if (this.data < data) {
        if (this.right === null) {
            this.right = new BinaryNode(data);
            this.right.parent = this;
        } else {
            this.right.add(data);
        }
    }
    if (this.data > data) {
        if (this.left === null) {
            this.left = new BinaryNode(data);
            this.left.parent = this;
        } else {
            this.left.add(data);
        }
    }
    if (this.data === data) {
        // If equal we can throw an error or choose one of them.
        console.error("duplicate found");
    }
}
