/**
 * Creating a deprecated/obsolete behavior for functions.
 * [Credits]{@link: https://stackoverflow.com/q/21726472/1333836}
 *
 * @param newFunction the new function
 * @param oldFnName old function name
 * @param newFnName new function name
 * @param sinceDeprecatedVersion library version in which the old function is deprecated
 * @param deletedVersion library version in which the old function will be deleted
 * @returns the old/new function result
 */
export function obsolete(
  newFunction: Function,
  oldFnName: string,
  newFnName: string,
  sinceDeprecatedVersion: string,
  deletedVersion: string,
  oldFunctionArguments: IArguments
) {
  console.warn(
    `${oldFnName}' has been deprecated since version ${sinceDeprecatedVersion} and will be deleted since version ${deletedVersion}.\nPlease use '${newFnName}' function instead.`
  )
  // @ts-ignore
  return newFunction(...oldFunctionArguments)
}
