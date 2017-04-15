import maze from '../data/walls';

//http://stackoverflow.com/questions/1073336/circle-line-segment-collision-detection-algorithm
export function doesLineSegmentCircleIntersect({x1, y1, x2, y2, cx, cy, r}) {

  const E = {x: x1, y: y1};
  const L = {x: x2, y: y2};
  const C = {x: cx, y: cy};

  const d = {x: L.x-E.x, y: L.y-E.y}; // Direction vector of ray, from start to end
  const f = {x: E.x-C.x, y: E.y-C.y}; // Vector from center sphere to ray start

  const a = d.x*d.x + d.y*d.y; // d.Dot(d)
  const b = 2*(f.x*d.x + f.y*d.y); // 2*f.Dot(d)
  const c = f.x*f.x + f.y*f.y - r*r; // f.Dot(f) - r*r

  let discriminant = b*b - 4*a*c;
  if(discriminant < 0) {
    // no intersection
    return false;
  }else{
    // ray didn't totally miss sphere,
    // so there is a solution to
    // the equation.
    discriminant = Math.sqrt(discriminant);

    // either solution may be on or off the ray so need to test both
    // t1 is always the smaller value, because BOTH discriminant and
    // a are nonnegative.
    const t1 = (-b -discriminant)/(2*a);
    const t2 = (-b +discriminant)/(2*a);

    // 3x HIT cases:
    //          -o->             --|-->  |            |  --|->
    // Impale(t1 hit,t2 hit), Poke(t1 hit,t2>1), ExitWound(t1<0, t2 hit),

    // 3x MISS cases:
    //       ->  o                     o ->              | -> |
    // FallShort (t1>1,t2>1), Past (t1<0,t2<0), CompletelyInside(t1<0, t2>1)

    if( t1 >= 0 && t1 <= 1 )
    {
      // t1 is the intersection, and it's closer than t2
      // (since t1 uses -b - discriminant)
      // Impale, Poke
      return true ;
    }

    // here t1 didn't intersect so we are either started
    // inside the sphere or completely past it
    if( t2 >= 0 && t2 <= 1 )
    {
      // ExitWound
      return true ;
    }

    // no intn: FallShort, Past, CompletelyInside
    return false ;
  }
}

export function modifyCirclePath({x1, y1, x2, y2, cx, cy, r}) {
  if(x1 === x2) { // Vertical line
    if(cy > y1 && cy < y2) { // The ball hits the side of the wall
      if(cx < x1) {
        return {cx: x1-r, cy};
      }else{
        return {cx: x1+r, cy};
      }
    }else if(cy < y1) { // The ball hits the begining of the wall
      const {rightJoin, leftJoin} = lookUpJoin({x: x1, y: y1, vertical: true});
      if(rightJoin === true && cx > x1 || leftJoin === true && cx < x1) {
        return {cx, cy: y1-r}; // This wall forms a corner with an other one and the ball is around the corner => the ball alignes with the other wall
      }
      return moveBallAwayFromWallEdge({x: x1, y: y1, cx, cy, r});
    }else{ // The ball hits the end of the wall
      const {rightJoin, leftJoin} = lookUpJoin({x: x2, y: y2, vertical: true});
      if(rightJoin === true && cx > x1 || leftJoin === true && cx < x1) {
        return {cx, cy: y2+r}; // This wall forms a corner with an other one and the ball is around the corner => the ball alignes with the other wall
      }
      return moveBallAwayFromWallEdge({x: x2, y: y2, cx, cy, r});
    }

  }else if(y1 === y2){ // Horizontal line
    if(cx > x1 && cx < x2) { // The ball hits the side of the wall
      if(cy < y1) {
        return {cx, cy: y1-r};
      }else{
        return {cx, cy: y1+r};
      }
    }else if(cx < x1) { // The ball hits the begining of the wall
      const {bottomJoin, topJoin} = lookUpJoin({x: x1, y: y1, vertical: false});
      if(bottomJoin === true && cy > y1 || topJoin === true && cy < y1) {
        return {cx: x1-r, cy}; // This wall forms a corner with an other one and the ball is around the corner => the ball alignes with the other wall
      }
      return moveBallAwayFromWallEdge({x: x1, y: y1, cx, cy, r});
    }else{ // The ball hits the end of the wall
      const {bottomJoin, topJoin} = lookUpJoin({x: x2, y: y2, vertical: false});
      if(bottomJoin === true && cy > y1 || topJoin === true && cy < y1) {
        return {cx: x2+r, cy}; // This wall forms a corner with an other one and the ball is around the corner => the ball alignes with the other wall
      }
      return moveBallAwayFromWallEdge({x: x2, y: y2, cx, cy, r});
    }

  }else{
    throw 'Walls should be either vertical or horizontal';
  }
}

function moveBallAwayFromWallEdge({x,y,cx,cy,r}) {
  const radian = calculateAngle({x1: x, y1: y, x2: cx, y2: cy});

  return {
    cx: x + r*Math.cos(radian),
    cy: y + r*Math.sin(radian)
  };
}

// Calculates angle between two points in radian
function calculateAngle({x1, y1, x2, y2}) {
  const horizontalLeg = x2-x1;
  const verticalLeg = y2-y1;
  const hypotenuse = Math.sqrt(Math.pow(verticalLeg, 2) + Math.pow(horizontalLeg, 2));
  //const radian = horizontalLeg > 0 ? Math.asin(verticalLeg / hypotenuse) : - Math.asin(verticalLeg / hypotenuse) + Math.PI; // -90 270
  const radian = verticalLeg > 0 ? Math.acos(horizontalLeg / hypotenuse) : Math.PI - Math.acos(horizontalLeg / hypotenuse) + Math.PI; // 0 360
  return radian;
}

// Look up maze if a vertical / horizontal wall at this pont has a joining wall
function lookUpJoin({x,y,vertical}) {
  if(vertical === true) {
    const rightJoin = maze.filter(wall => wall[0] === x && wall[1] === y && wall[3] === y).length !== 0;
    const leftJoin = maze.filter(wall => wall[2] === x && wall[3] === y && wall[1] === y).length !== 0;
    return {rightJoin, leftJoin};
  }else{
    const bottomJoin = maze.filter(wall => wall[0] === x && wall[1] === y && wall[2] === x).length !== 0;
    const topJoin = maze.filter(wall => wall[2] === x && wall[3] === y && wall[0] === x).length !== 0;
    return {bottomJoin,topJoin};
  }
}
