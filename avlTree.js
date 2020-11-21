function AVLTree() {
    this._root = new AVLNode(null, null);
}

function AVLNode(data, parent) {
    this.data = data;
    this.parent = parent;
    this.left = null;
    this.right = null;
    this.height = ((this.parent === null) ? 1 : this.parent.height + 1);
}

AVLTree.prototype.name = function () {
    return 'AVL Tree';
}

function calculateBalanceFactor(node) {
    let balanceFactor = 0;
    if (!isLeafEmpty(node.left)) {
        balanceFactor += node.left.getHeight(1);
    }
    if (!isLeafEmpty(node.right)) {
        balanceFactor -= node.right.getHeight(1);
    }
    console.log(balanceFactor + ' balance factor of ' + node.data)
    return balanceFactor;
}

function balance(node) {
    let balanceFactor = calculateBalanceFactor(node);

    if (balanceFactor > 1) {
        let leftBalance = calculateBalanceFactor(node.left);
        if (leftBalance > 0) {
            console.log('rotate right');
            rotateRight(node);
        }
        if (leftBalance < 0) {
            console.log('rotate left right');
            rotateLeft(node.left);
            rotateRight(node);
        }
    }
    if (balanceFactor < -1) {
        console.log(node.data + ' was here');
        let rightBalance = calculateBalanceFactor(node.right);
        console.log(node.data + ' was here2');
        console.log(rightBalance + ' right balance is')
        if (rightBalance < 0) {
            console.log('rotate left');
            console.log(node.data + ' was here3');
            rotateLeft(node);
            console.log(node.data + ' was here4');
            console.log(node.data + ' still this <<');
        }
        if (rightBalance > 0) {
            console.log('rotate right left');
            rotateRight(node.right);
            rotateLeft(node);
        }
    }
    return node;
}
AVLNode.prototype.set = function (b) {
    this.data = b.data;
    this.left = b.left;
    this.right = b.right;
    this.parent = b.parent;
}

function rotateRight(node) {
    if (isLeafEmpty(node)) return node.parent;
    if (isLeafEmpty(node.left)) return node.parent;


    let parent = new AVLNode(node.left.data, node.parent);
    parent.parent = node.parent;

    let right = new AVLNode(node.data, parent);
    right.right = node.right;
    right.left = node.left.right;

    if (!isLeafEmpty(node.left.left)) {
        let left = new AVLNode(node.left.left.data, parent);
        left.left = node.left.left.left;
        left.right = node.left.left.right;
        parent.left = left;
    }

    parent.right = right;
    node.set(parent);
    return parent;
}

function rotateLeft(node) {
    if (isLeafEmpty(node)) return node.parent;
    if (isLeafEmpty(node.right)) return node.parent;

    let parent = new AVLNode(node.right.data, node.parent);

    parent.parent = node.parent;

    let left = new AVLNode(node.data, parent);
    left.right = node.right.left;
    left.left = node.left;

    if (!isLeafEmpty(node.right.right)) {
        let right = new AVLNode(node.right.right.data, parent);
        right.right = node.right.right.right;
        right.left = node.right.right.left;
        parent.right = right;
    }

    parent.left = left;
    node.set(parent);
    return parent;
}

AVLTree.prototype.add = function (data) {
    let current = this._root.add(data);
    let root;
    while (!isLeafEmpty(current)) {
        console.log(current.data);

        root = balance(current);
        current = current.parent;
    }
    this._root = root;
}
AVLTree.prototype.height = function () {
    return this._root.getHeight(1);
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