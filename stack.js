function Stack() {
    this._array = ['a'];
}

Stack.prototype.push = function (data) {
    this._array[this._array.length] = data;
}

Stack.prototype.pop = function () {
    let lastIndex = this._array.length - 1;
    let temp = this._array[lastIndex];
    this._array.splice(lastIndex);
    return temp;
}