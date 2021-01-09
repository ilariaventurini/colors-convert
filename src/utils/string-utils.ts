/**
 * Given a string, a position and another string toAdd, it returns a new string with toAdd in the given position.
 * @param str string to add toAdd
 * @param toAdd new string to join with str
 * @param position index position
 * @returns a new string with toAdd in the right position
 * @private
 */
export function insertAt(str: string, toAdd: string, position: number) {
  if (position < 0 || position > str.length)
    throw new Error(`'position' must be between 0 and ${str.length}.`)

  return `${str.slice(0, position)}${toAdd}${str.slice(position)}`
}

/**
 * Split a string into chunks of the given size.
 * @param str is the string to split
 * @param  size is the size you of the cuts
 * @return an rray with the strings
 * @private
 */
export function chunkString(str: string, size: number) {
  return str.match(new RegExp('.{1,' + size + '}', 'g'))
}
