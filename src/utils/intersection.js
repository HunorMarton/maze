// http://mathworld.wolfram.com/Circle-LineIntersection.html
export function doesLineCircleIntersect({x1, y1, x2, y2, r}) {
  const dx = x2-x1;
  const dy = y2-y1;
  const dr = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy,2));
  const d = x1*y2 - x2*y1;
  const discriminant = Math.pow(r,2)*Math.pow(dr,2) - Math.pow(d,2);
  return discriminant > 0;
}
