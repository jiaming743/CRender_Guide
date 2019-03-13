const { abs, pow, sqrt } = Math

function bezierCurveLength ([x1, y1], [x2, y2], [x3, y3], [x4, y4]) {
  const k1 = [
    -x1 + 3 * (x2 - x3) + x4,
    -y1 + 3 * (y2 - y3) + y4
  ]

  const k2 = [
    3 * (x1 + x3) - 6 * x2,
    3 * (y1 + y3) - 6 * y2
  ]

  const k3 = [
    3 * (x2 - x1),
    3 * (y2 - y1)
  ]

  const k4 = [
    x4,
    y4
  ]

  const q1 = 9 * (pow(k1[0], 2) + pow(k1[1], 2))

  const q2 = 12 * (k1[0] * k2[0] + k1[1] * k2[1])

  const q3 = 3 * (k1[0] * k3[0] + k1[1] * k3[1]) + 4 * (pow(k2[0], 2) + pow(k2[1], 2))

  const q4 = 4 * (k2[0] * k3[0] + k2[1] * k3[1])

  const q5 = pow(k3[0], 2) + pow(k3[1], 2)

  return simpson([q1, q2, q3, q4, q5], 0, 1, 1024, 0.01)
}

function simpson (balfParams, ta, tb, limit, tolerance) {
  let n = 1
  let multiplier = (tb - ta) / 6
  let endSum = balf(balfParams, ta) + balf(balfParams, tb)
  let interval = (tb - ta) / 2
  let aSum = 0
  let bSum = balf(a + interval)
  let est1 = multiplier * (endSum + 2 * aSum + 4 * bSum)
  let est0 = 2 * est1

  while (n < limit && )

  return est1
}

function balf ([q1, q2, q3, q4, q5], t) {
  return sqrt(q5 + t * (q4 + t * (q3 + t * (q2 + t * q1)))
}