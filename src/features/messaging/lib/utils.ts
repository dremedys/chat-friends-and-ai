export function getRandomNegativeInteger(): number {
  const min = -Number.MAX_SAFE_INTEGER
  const max = -1 // Define the maximum negative value
  return Math.floor(Math.random() * (max - min + 1)) + min
}
