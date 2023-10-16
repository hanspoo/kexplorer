import { iniciales, randomIntFromInterval } from 'utils'

const Avatar = ({ label }: { label: string }) => {
  return (
    <div className="flex h-16 w-16  bg-red-700 ">
      <div>{iniciales(label)}</div>
    </div>
  )
}

const Avatar2 = ({ label }: { label: string }) => {
  return (
    <div
      className="flex h-24 w-24 text-3xl font-bold text-gray-100"
      style={{ backgroundColor: colorFromString(label) }}
    >
      <div className="m-auto">{iniciales(label)}</div>
    </div>
  )
}
export default Avatar2

function colorFromString(s: string) {
  const h = hashToInt(s)

  return `hsl(${h}, 80%, 50%)`
}
function randomColor() {
  const h = randomIntFromInterval(1, 100)

  return `hsl(${h}, 100%, 75%)`
}

function hashToInt(str: string): number {
  var hash = 0
  for (var i = 0; i < str.length; i++) {
    var charCode = str.charCodeAt(i) * str.charCodeAt(i)
    hash += charCode
  }

  return hash % 360
}
