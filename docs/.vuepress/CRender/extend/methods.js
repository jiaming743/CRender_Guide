export function deepClone (object, recursionType = false) {
  const { parse, stringify } = JSON

  if (!recursionType) return parse(stringify(object))

  const clonedObj = object instanceof Array ? [] : {}

  if (object && typeof object === 'object') {

    for (let key in object) {

      if(object.hasOwnProperty(key)){

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

export default {
  deepClone
}