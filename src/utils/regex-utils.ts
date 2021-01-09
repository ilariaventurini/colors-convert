/**
 * Compine regex expressions.
 * Example:
 *    regexes: [ /[a-z]/, /[0-9]/ ]
 *    the returned RegExp is /[a-z]|[0-9]/i
 *    that matches strings containing chars and numbers.
 *
 * @param regexes regex expressions to combine
 * @param flag regex flag
 * @private
 */
export function orRegex(regexes: RegExp[], flag = 'i'): RegExp {
  return new RegExp(regexes.map((r) => r.source).join('|'), flag)
}
