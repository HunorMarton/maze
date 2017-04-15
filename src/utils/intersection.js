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
  if(x1 === x2) {
    if(cx < x1) {
      cx = x1-r;
    }else{
      cx = x1+r;
    }
  }else if(y1 === y2){
    if(cy < y1) {
      cy = y1-r;
    }else{
      cy = y1+r;
    }
  }else{
    throw 'Walls should be either vertical or horizontal';
  }
  return {cx, cy};
}
