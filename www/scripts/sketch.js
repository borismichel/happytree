var tree = [];
var leaves = [];

function setup() {
    createCanvas(640, 400);
    let v1 = createVector(width/2, height)
    let v2 = createVector(width/2, height-100)
    tree[0] = new Branch(v1, v2, 0);
    growTree(9);
}

function draw() {
    background(255);
    let t = frameCount / 60; // update time
    stroke(132, 80, 46);
    for (var i = 0; i < tree.length; i++) {
        tree[i].show()
    };
    for (var i = 0; i < leaves.length; i++) {
        leaves[i].update(t)
        leaves[i].show()
    };
}

function growTree(cycle) {
    for (i=0; i < cycle; i++){
        for (j=tree.length-1; j >= 0; j--) {
            if(!tree[j].finsihed) {
                if(random(1)>0.999) { break }
                tree.push(tree[j].grow(PI / 4));
                if(random(1)>0.999) { break }
                tree.push(tree[j].grow(-PI / 5));
                if(random(1)>0.9999) { break }
                tree.push(tree[j].grow(0));

            }
            tree[j].finsihed = true;
        }
    }
}
