export async function formatPromise(asyncFunction: Promise<any>) {
  return asyncFunction
    .then((result) => {
      return [undefined, result];
    })
    .catch((err) => {
      return [err];
    });
}
