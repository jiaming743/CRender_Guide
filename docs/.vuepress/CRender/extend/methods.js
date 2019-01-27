export function deepClone (object, recursionType = false) {
  const { parse, stringify } = JSON

  if (!recursionType) return parse(stringify(object))

  const clonedObj = object instanceof Array ? [] : {}

  if (object && typeof object === 'object') {

    for (let key in object) {

      if (object.hasOwnProperty(key)) {

          if (object[object] && typeof object[key] === 'object'){

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
  const { abs, sqrt } = Math

  const minusX = abs(xa - xb)
  const minusY = abs(ya - yb)

  return sqrt(minusX * minusX + minusY * minusY)
}

export function getRotatePointPos (rotate = 0, point, origin = [0, 0]) {
  if (!point) return false

  if (rotate % 360 === 0) return point

  const { sin, cos, PI } = Math

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

export function checkPointIsInPolygon (point, polygon) {
  if (!point || !polygon || polygon.length < 3) return false

  const [x, y] = point

  const lastIndex = polygon.length - 1

  const lines = polygon.map((point, i) => {
    const isLast = lastIndex === i

    const next = isLast ? polygon[0] : polygon[i + 1]

    return [point, next]
  })

  const yAxisLine = lines.filter(line => {
    const lineB = line[0]
    const lineE = line[1]

    return (lineB[1] > y && lineE[1] < y) || (lineE[1] > y && lineB[1] < y)
  })

  const xAxisLine = yAxisLine.filter(line => {
    const lineB = line[0]
    const lineE = line[1]

    const xPos = (y - lineB[1]) / (lineE[1] - lineB[1]) * (lineE[0] - lineB[0]) + lineB[0]

    return xPos > x
  })

  return xAxisLine.length % 2 === 1
}

export default {
  deepClone,
  getTwoPointDistance,
  getRotatePointPos,
  getScalePointPos,
  checkPointIsInPolygon
}
