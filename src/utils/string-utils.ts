/**
 * Given a string, a position and another string toAdd, it returns a new string with toAdd in the given position.
 * @param str string to add toAdd
 * @param toAdd new string to join with str
 * @param position index position
 * @returns a new string with toAdd in the right position
 */
export function insertAt(str: string, toAdd: string, position: number) {
  if (position < 0 || position > str.length)
    throw new Error(`'position' must be between 0 and ${str.length}.`)

  return `${str.slice(0, position)}${toAdd}${str.slice(position)}`
}
