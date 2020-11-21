function BinaryTree() {
    var binaryNode = new BinaryNode(null);
    this._root = binaryNode;
}

BinaryTree.prototype.remove = function (data) {
    this._root.remove(data);
}


BinaryTree.prototype.search = function (data) {
    return this._root.search(data);
}


BinaryTree.prototype.add = function (data) {
    this._root.add(data);
}

BinaryTree.prototype.name = function(){
    return 'Binary Tree';
}