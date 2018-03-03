function IsNextUnknown(s, p) { //проверка заолненности поля
    for (var ix = 1; ix < 10; ix++) {
        for (var iy = 1; iy < 10; iy++) {
            if (s[ix][iy] == 0) {
                p.x = ix;
                p.y = iy;
                return true
            }
        }
    }
    return false;
};

function sudInLine(s, p, v) {
    for (var i = 1; i < 10; i++) {
        if (p.y != i) {
            if (s[p.x][i] == v) {
                return true;
            }
        }
    }
    return false;
};

function sudInRow(s, p, v) {
    for (var i = 1; i < 10; i++) {
        if (p.x != i) {
            if (s[i][p.y] == v) {
                return true;
            }
        }
    }
    return false;
};

function sudInSq(s, p, v) {
    var lx = 0;
    var ly = 0;
    if ([1, 2, 3].indexOf(p.x) > -1) lx = 1;
    if ([4, 5, 6].indexOf(p.x) > -1) lx = 4;
    if ([7, 8, 9].indexOf(p.x) > -1) lx = 7;

    lx = lx - 1;
    if ([1, 2, 3].indexOf(p.y) > -1) ly = 1;
    if ([4, 5, 6].indexOf(p.y) > -1) ly = 4;
    if ([7, 8, 9].indexOf(p.y) > -1) ly = 7;

    ly = ly - 1;

    for (var ix = 1; ix < 4; ix++) {
        for (var iy = 1; iy < 4; iy++) {
            if ((p.x != lx + ix) && (p.y != ly + iy)) {
                if (s[lx + ix][ly + iy] == v) {
                    return true;
                }
            }
        }
    }
    return false;
};

function sudInAny(s, p, v) {
    var res1 = sudInLine(s, p, v);
    var res2 = sudInRow(s, p, v);
    var res3 = sudInSq(s, p, v);

    return (res1 || res2 || res3);
}


function sudMod(s, p, v) {
    var st = s.slice(0);

    for (var i = 0; i < 10; i++) {
        st[i] = s[i].slice(0);
    }

    st[p.x][p.y] = v;
    return st;
}

function sudoku(s) {
    var p = {};
    if (IsNextUnknown(s, p) === true) {
        for (var i = 1; i < 10; i++) {
            if (sudInAny(s, p, i) != true) {
                if (sudoku(sudMod(s, p, i)) === true) {
                    return true;
                }
            }
        }
    }
    else {
        resultMas = getMas(s);
        return;
    }
    return false;
};

function getMas(s) {
    var st = s.slice(0);
    for (var i = 0; i < 10; i++) {
        st[i] = s[i].slice(0);
    }

    st.shift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    for (var i = 0; i < 9; i++) {
        st[i].shift(0);
    }
    return st;
};

var resultMas = [];

module.exports = function solveSudoku(matrix) {

    for (var i = 0; i < 9; i++) {
        matrix[i].unshift(0);
    }
    matrix.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    sudoku(matrix);

    return resultMas;
};

/*
module.exports = function solveSudoku(matrix) {
  // your solution
}*/
