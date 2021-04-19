/**
 *
 * @param asyncFunction
 * @returns {*}
 */
export async function formatPromise(asyncFunction: Promise<any> | any) {
  return asyncFunction
    .then((result: any) => {
      return [undefined, result];
    })
    .catch((err: Error) => {
      return [err];
    });
}
