const { abs, sqrt, sin, cos, max, min, PI } = Math

export function deepClone (object, recursionType = false) {
  const { parse, stringify } = JSON

  if (!recursionType) return parse(stringify(object))

  const clonedObj = object instanceof Array ? [] : {}

  if (object && typeof object === 'object') {

    for (let key in object) {

      if (object.hasOwnProperty(key)) {

          if (object[key] && typeof object[key] === 'object'){

            clonedObj[key] = deepClone(object[key], true)

          } else {

            clonedObj[key] = object[key]

          }
      }
    }
  }

  return clonedObj
}

export function getTwoPointDistance ([xa, ya], [xb, yb]) {
  const minusX = abs(xa - xb)
  const minusY = abs(ya - yb)

  return sqrt(minusX * minusX + minusY * minusY)
}

export function checkPointIsInCircle (rx, ry, r, point) {
  return getTwoPointDistance(point, [rx, ry]) <= r
}

export function getRotatePointPos (rotate = 0, point, origin = [0, 0]) {
  if (!point) return false

  if (rotate % 360 === 0) return point

  const [x, y] = point

  const [ox, oy] = origin

  rotate *= PI / 180

  return [
    (x - ox) * cos(rotate) - (y - oy) * sin(rotate) + ox,
    (x - ox) * sin(rotate) + (y - oy) * cos(rotate) + oy
  ]
}

export function getScalePointPos (scale = [1, 1], point, origin = [0, 0]) {
  if (!point) return false

  if (scale === 1) return point

  const [x, y] = point

  const [ox, oy] = origin

  const [xs, ys] = scale

  const relativePosX = x - ox
  const relativePosY = y - oy

  return [
    relativePosX * xs + ox,
    relativePosY * ys + oy
  ]
}

export function getTranslatePointPos (translate, point) {
  if (!translate || !point) return false

  const [x, y] = point
  const [tx, ty] = translate

  return [x + tx, y + ty]
}

export function checkPointIsInPolygon (point, polygon) {
  let counter = 0

  const [x, y] = point

  const pointNum = polygon.length

  for (let i = 1, p1 = polygon[0]; i <= pointNum; i++) {
    const p2 = polygon[i % pointNum]

    if (x > min(p1[0], p2[0]) && x <= max(p1[0], p2[0])) {

      if (y <= max(p1[1], p2[1])) {

        if (p1[0] != p2[0]) {
          const xinters = (x - p1[0]) * (p2[1] - p1[1]) / (p2[0] - p1[0]) + p1[1]

          if (p1[1] == p2[1] || y <= xinters) {
            counter++
          }
        }
      }
    }

    p1 = p2
  }

  return counter % 2 === 1
}

export function getDistanceBetweenPointAndLine (point, lineBegin, lineEnd) {
  if (!point || !lineBegin || !lineEnd) return false

  const [x, y] = point
  const [x1, y1] = lineBegin
  const [x2, y2] = lineEnd

  const a = y2 - y1
  const b = x1 - x2
  const c = y1 * (x2 - x1) - x1 * (y2 - y1)

  const molecule = abs(a * x + b * y + c)
  const denominator = sqrt(a * a + b * b)

  return molecule / denominator
}

export function getCircleRadianPoint (x, y, radius, radian) {
  return [x + cos(radian) * radius, y + sin(radian) * radius]
}

export function checkPointIsInSector (point, rx, ry, r, startAngle, endAngle, clockWise) {
  if (!point) return false

  if (getTwoPointDistance(point, [rx, ry]) > r) return false

  if (!clockWise) [startAngle, endAngle] = deepClone([endAngle, startAngle])

  const reverseBE = startAngle > endAngle

  if (reverseBE) [startAngle, endAngle] = [endAngle, startAngle]

  const minus = endAngle - startAngle

  if (minus >= PI * 2) return true

  const [x, y] = point

  const [bx, by] = getCircleRadianPoint(rx, ry, r, startAngle)
  const [ex, ey] = getCircleRadianPoint(rx, ry, r, endAngle)

  const vPoint = [x - rx, y - ry]
  let vBArm = [bx - rx, by - ry]
  let vEArm = [ex - rx, ey - ry]

  const reverse = minus > PI

  if (reverse) [vBArm, vEArm] = deepClone([vEArm, vBArm])

  let inSector = areClockWise(vBArm, vPoint) && !areClockWise(vEArm, vPoint)

  if (reverse) inSector = !inSector

  if (reverseBE) inSector = !inSector

  return inSector
}

function areClockWise (vArm, vPoint) {
  const [ax, ay] = vArm
  const [px, py] = vPoint

  return -ay * px + ax * py > 0
}

export function getRegularPolygonPoints (rx, ry, r, side, minus = PI * -0.5) {
  const radianGap = PI * 2 / side

  const radians = new Array(side).fill('').map((t, i) => i * radianGap + minus)

  return radians.map(radian => getCircleRadianPoint(rx, ry, r, radian))
}

export function checkPointIsNearPolyline (point, polyline, lineWidth) {
  const halfLineWidth = lineWidth / 2

  const moveUpPolyline = polyline.map(([x, y]) => [x, y - halfLineWidth])
  const moveDownPolyline = polyline.map(([x, y]) => [x, y + halfLineWidth])

  const polygon = [...moveUpPolyline, ...moveDownPolyline.reverse()]

  return checkPointIsInPolygon(point, polygon)
}

export function filterNull (arr) {
  return arr.filter(v => (v || v === 0))
}

export default {
  deepClone,
  checkPointIsInCircle,
  checkPointIsInPolygon,
  checkPointIsInSector,
  checkPointIsNearPolyline,
  getTwoPointDistance,
  getRotatePointPos,
  getScalePointPos,
  getTranslatePointPos,
  getCircleRadianPoint,
  getRegularPolygonPoints,
  getDistanceBetweenPointAndLine
}
