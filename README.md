Little applet to create random fractal trees that spawn leaves which subsequently drop using P5.js 

To try unpack and run `index.html`

There are a handful of properties:

growTree(x) function:
- Branches have a 0.1% chance to terminate before reaching full maturity
- growTree parameter x sets number of branching iterations (exponential growth with 3^x)

Leaves
- Leaves have a 0.8% chance to start dropping on update can be adjusted in update method of leaf object