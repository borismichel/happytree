class Branch {
    constructor(start, end, iter) {
        this.start = start;
        this.end = end;
        this.iter = iter;
        this.finished = false;
    }

    show() {
        var newStroke = (15-this.iter*3 < 1) ? 1 : 15-this.iter*3;
        strokeWeight(newStroke);
        line(this.start.x, this.start.y, this.end.x, this.end.y);
    }

    grow(angle) {
        let v = p5.Vector.sub(this.end, this.start);
        v.rotate(angle)
        v.setMag(1/this.iter*80*random(1.5));
        v.add(this.end)
        var nb = new Branch(this.end, v, this.iter+1)
        if (this.iter>5) {
            //start leafing from Generation 4
            var leaf = new Leaf(v);
            leaves.push(leaf);
        }
        return nb;
    }
}

class Leaf {
    constructor(v) {
        //get original end
        this.v = v;
        this.posX = v.x;
        this.posY = v.y;

        //get pseudo ovals
        this.width=5+random(5);
        this.height=5+random(5);

        this.initialangle = random(0, 2 * PI);
        this.dead= false;
        //scale y speed magnitude
        this.size = random(2, 5);

        //some Color business
        this.green= 200-random(100);
        this.redR= 120+random(100);
        this.redG= 80+random(80);
        this.redB= 30+random(50);
    }

    show() {
        if (this.dead) {
            fill(this.redR, this.redG, this.redB);
        } else {
            fill(10, this.green, 60)
        }
        ellipse(this.posX, this.posY, this.width, this.height); 
    }

    update(time) {   
        if(random(100)>99.2) {
            this.dead = true;
        }
        if(this.dead&&this.posY < height -5) {
            fill(255,123,41)
            let w = 10; // angular speed
            let angle = w * time + this.initialangle;
            if(3 + this.posX + sin(angle)>width) {
                this.posX = width-5;
            } else {
                this.posX = 1 + this.posX + 1.2*sin(angle);
            }
            // different size snowflakes fall at slightly different y speeds
            this.posY += pow(this.size, 0.5);
        }
    }
}