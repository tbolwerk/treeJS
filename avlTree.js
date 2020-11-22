function AVLTree() {
    this._root = new AVLNode(null, null);
}

AVLTree.prototype.name = function () {
    return 'AVL Tree';
}

AVLTree.prototype.add = function (data) {
    let current = this._root.add(data);
    let root = null;
    while (!isLeafEmpty(current)) {
        root = balance(current);
        if (current.right !== null) {
            console.log('current: ' + current.data + ' right: ' + current.right.data + ' height: ' + current.height);
        }
        current = root.parent;
    }
    this._root.set(root);
}

AVLTree.prototype.height = function () {
    return this._root.getHeight(1);
}

AVLTree.prototype.search = function(data){
    return this._root.search(data);
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
        let rightBalance = calculateBalanceFactor(node.right);
        if (rightBalance < 0) {
            console.log('rotate left');
            rotateLeft(node);
            console.log(node.data);
        }
        if (rightBalance > 0) {
            console.log('rotate right left');
            rotateRight(node.right);
            rotateLeft(node);
        }
    }
    return node;
}

//TODO: fix updating children, creates duplicates.
function rotateRight(node) {
    if (isLeafEmpty(node)) return node.parent;
    if (isLeafEmpty(node.left)) return node.parent;

    let parent = new AVLNode(node.left.data, node.parent);

    let right = new AVLNode(node.data, parent);
    right.setRightChild(node.right); 
    right.setLeftChild(node.left.right);

    if (!isLeafEmpty(node.left.left)) {
        let left = new AVLNode(node.left.left.data, parent);
        left.setLeftChild(node.left.left.left);
        left.setRightChild(node.left.left.right);
        parent.setLeftChild(left);
    }

    parent.setRightChild(right);
    node.set(parent);
    return parent;
}

function rotateLeft(node) {
    if (isLeafEmpty(node)) return node.parent;
    if (isLeafEmpty(node.right)) return node.parent;

    let parent = new AVLNode(node.right.data, node.parent);
    let left = new AVLNode(node.data, parent);
    left.setRightChild(node.right.left);
    left.setLeftChild(node.left);

    if (!isLeafEmpty(node.right.right)) {
        let right = new AVLNode(node.right.right.data, parent);
        right.setLeftChild(node.right.right.left);
        right.setRightChild(node.right.right.right)
        parent.setRightChild(right);
    }

    parent.setLeftChild(left);
    node.set(parent);
    return parent;
}


