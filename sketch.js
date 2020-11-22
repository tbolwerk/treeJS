let selectedTree = new AVLTree();

let forest = [new AVLTree(), new BinarySearchTree()]

const scalar = 1.3;
const xOffset = 70;
const yOffset = 70;
const canvasWidth = 400;
const canvasHeight = 400;
const leafWidth = 25;
const leafHeight = 25;
const fontSize = 10;

let actualXOffset;
let actualYOffset;
let actualCanvasWidth;
let actualCanvasHeight;
let actualLeafWidth;
let actualLeafHeight;
let actualFontSize;

let found = null;
let pathFound = [];
let removeFromBinaryTree;
let c;
let selectTree;

function setup() {
  actualCanvasHeight = canvasHeight * scalar;
  actualCanvasWidth = canvasWidth * scalar;
  actualFontSize = fontSize * scalar;
  actualXOffset = xOffset * scalar;
  actualYOffset = yOffset * scalar;
  actualLeafHeight = leafHeight * scalar;
  actualLeafWidth = leafWidth * scalar;

  c = createCanvas(actualCanvasWidth, actualCanvasHeight);
  let initBinaryTree = createInput('');
  let searchBinaryTree = createInput('');
  removeFromBinaryTree = createInput('');
  selectTree = createSelect();
  for (var i = 0; i < forest.length; i++) {
    selectTree.option(forest[i].name());
  }
  selectTree.changed(changeSelectionEvent);
  let removeButton = createButton('remove');
  let saveButton = createButton('save');

  removeButton.mousePressed(removeEvent);
  saveButton.mousePressed(saveEvent);

  initBinaryTree.input(addEvent);
  searchBinaryTree.input(searchEvent);


}

function changeSelectionEvent() {
  switch (selectTree.value()) {
    case 'Binary Search Tree':
      selectedTree = new BinarySearchTree();
      break;
    case 'AVL Tree':
      selectedTree = new AVLTree();
      break;
    default:
      selectedTree = new AVLTree();
      break;
  }
}

function saveEvent() {
  saveCanvas(c, 'myTree', 'jpg');
}

function backtrack(node) {
  if (node !== null) {
    if (node.parent !== null) {
      pathFound.push(node.parent);
    }
    backtrack(node.parent);
  }
}

function parser(input) {
  return input.split(/[\s,]+/);
}

function searchEvent() {
  pathFound.splice(0, pathFound.length);
  let result = selectedTree.search(parseInt(this.value()));
  found = result;
  backtrack(found);
}

function removeEvent() {
  selectedTree.remove(parseInt(removeFromBinaryTree.value()));
}

function addEvent() {
  let input = parser(this.value());
  for (var i = 0; i < input.length; i++) {
    let currentValue = parseInt(input[i]);
    selectedTree.add(currentValue);
  }
}

function draw() {
  var node = selectedTree._root;
  const treeWidth = actualCanvasWidth / 2;
  const treeHeight = 50;
  background(125);
  drawTree(node, treeWidth, treeHeight, 1);
}

function drawTree(node, x, y, depth) {
  if (node !== null) {
    const leftX = x - actualXOffset / depth;
    const leftY = y + actualYOffset;
    const rightX = x + actualYOffset / depth;
    const rightY = y + actualYOffset;
    if (node.left !== null && node.left.data !== null) {
      line(x, y, leftX, leftY);
      drawTree(node.left, leftX, leftY, depth + 1);
    }
    if (node.right !== null && node.right.data !== null) {
      line(x, y, rightX, rightY);
      drawTree(node.right, rightX, rightY, depth + 1);
    }
    if (found !== null && found.data == node.data) {
      fill(0, 255, 0);
    } else if (pathFound.includes(node)) {
      fill(0, 0, 255);
    } else {
      fill(255);
    }
    drawLeaf(x, y, node.data);
  }
}

function drawLeaf(x, y, data) {
  if (data === null)
    return;
  ellipse(x, y, actualLeafWidth, actualLeafHeight);
  fill(0);
  text(data, x, y)
  textAlign(CENTER, CENTER);
  textSize(actualFontSize);
}