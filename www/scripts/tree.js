class Branch { //Tree object
    constructor(start, end, iter) {
        this.start = start;
        this.end = end;
        this.iter = iter;
        this.finished = false;

        this.myLeaves = [];
    }

    show() {
        var newStroke = (15-this.iter*3 < 1) ? 1 : 15-this.iter*3;
        strokeWeight(newStroke); //shrink while branching out
        line(this.start.x, this.start.y, this.end.x, this.end.y);
    }

    grow(angle) {
        let v = p5.Vector.sub(this.end, this.start);
        v.rotate(angle)
        v.setMag(1/this.iter*80*random(1.5));
        v.add(this.end)
        var nb = new Branch(this.end, v, this.iter+1)
        if (this.iter>4&&random(1)>0.52) { //only 48% of branches in the target generations spawn leaves
            //start leafing from Generation 4
            var leaf = new Leaf(v);
            leaves.push(new Leaf(v));
        }
        return nb;
    }
}

class Leaf { //Leaf object... you might have guessed...
    constructor(v) {
        //get original end
        this.v = v;
        this.posX = v.x;
        this.posY = v.y;

        //get pseudo ovals
        this.finalWidth=5+random(5);
        this.finalHeight=5+random(5);
        this.width= 0;
        this.height= 0;
        
        this.initialangle = random(0, 2 * PI);

        //State Props
        this.dead= false;
        this.allDead = false
        
        this.blossomed = false;
        this.allBlossomed = false;

        this.greened = false;
        this.allGreened = false;

        this.greenLife = 200;

        //scale y speed magnitude
        this.size = random(2, 5);

        //some Color business
            // green leaves
        this.green= 200-random(100);

        //fallen leaf brown
        this.redR= 120+random(100);
        this.redG= 80+random(80);
        this.redB= 30+random(50);

        //pink blossoms
        this.pinkR= 235+random(20);
        this.pinkG= 190+random(15);
        this.pinkB= 210+random(30);
    }

    show() {
        //sho ellipses with state colors
        if (this.dead) {
            fill(this.redR, this.redG, this.redB);
        } else if (this.greened) {
            fill(10, this.green, 60)
        } else {            
            fill(this.pinkR, this.pinkG, this.pinkB);
        }
        ellipse(this.posX, this.posY, this.width, this.height); 
    }

    update(time) {   
         // regular Uodates
        if (this.allGreened&&this.greenLife>0) { //when all greened begin countdown to fall
            this.greenLife--;
        }
        if(!this.blossomed&&random(1)>.9){ //blossom randomly
            if (this.width<this.finalWidth) {
                this.width++;
            }
            if (this.height<this.finalHeight) {
                this.height++;
            }
            if(this.height>=this.finalHeight&&this.width>=this.finalWidth) {
                this.blossomed=true;
            }
        }
        else if(!this.greened&&this.allBlossomed&&!this.allGreened&&random(1)>.9) { //green randomly
            this.greened = true;
        }
        else if(!this.dead&&this.allBlossomed&&this.allGreened&&this.greenLife<=0&&random(1)>0.99) { //green time is up, start randomly falling
            this.dead = true;
        }
        else if(this.dead&&this.posY < height -5) { //fall x sinoid, y variable linear speed
            let w = 10; 
            let angle = w * time + this.initialangle;
            if(3 + this.posX + sin(angle)>width) {
                this.posX = width-5;
            } else {
                this.posX = 1 + this.posX + 1.2*sin(angle);
            }
            this.posY += pow(this.size, 0.5);
        }
    }

    updateBlossomed() {
        if(!this.allBlossomed){
            this.allBlossomed = true;
        }    
    }

    updateGreened() {
        if(!this.allGreened){
            this.allGreened = true;
        }    
    }

    startFalling() {
        if(!this.dead){
            this.dead = true;
        }
    }
}
