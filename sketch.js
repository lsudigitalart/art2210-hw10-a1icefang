let particles = []

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.vel = createVector(random(-2, 2), random(-2, 2))
    this.acc = createVector(0, 0)
    this.size = random(10, 30)
    this.color = color(random(100, 255), random(100, 255), random(100, 255), random(150, 255))
    this.sides = floor(random(5, 10))
  }

  update() {
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    this.acc.mult(0)
  }

  applyForce(force) {
    this.acc.add(force)
  }

  edges() {
    if (this.pos.x < 0 || this.pos.x > width) this.vel.x *= -1
    if (this.pos.y < 0 || this.pos.y > height) this.vel.y *= -1
  }

  show() {
    noStroke()
    fill(this.color)
    drawStar(this.pos.x, this.pos.y, this.size / 2, this.size, this.sides)
  }
}

function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints
  let halfAngle = angle / 2.0
  beginShape()
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2
    let sy = y + sin(a) * radius2
    vertex(sx, sy)
    sx = x + cos(a + halfAngle) * radius1
    sy = y + sin(a + halfAngle) * radius1
    vertex(sx, sy)
  }
  endShape(CLOSE)
}

function setup() {
  createCanvas(800, 600)

  for (let i = 0; i < 100; i++) {
    particles.push(new Particle(random(width), random(height)))
  }
}

function draw() {
  background(30)

  for (let p of particles) {
    let gravity = createVector(0, 0.05)
    p.applyForce(gravity)
    p.update()
    p.edges()
    p.show()
  }
}
