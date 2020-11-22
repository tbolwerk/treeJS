function BinarySearchTree() {
    var binaryNode = new BinarySearchNode(null);
    this._root = binaryNode;
}

BinarySearchTree.prototype.remove = function (data) {
    this._root.remove(data);
}


BinarySearchTree.prototype.search = function (data) {
    return this._root.search(data);
}


BinarySearchTree.prototype.add = function (data) {
    this._root.add(data);
}

BinarySearchTree.prototype.name = function(){
    return 'Binary Search Tree';
}