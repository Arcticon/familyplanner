import { pickBy } from "lodash";

export async function formatPromise(asyncFunction: Promise<any> | any) {
  return asyncFunction
    .then((result: any) => {
      return [undefined, result];
    })
    .catch((err: Error) => {
      return [err];
    });
}

export function cleanDBObject(data: Object) {
  return pickBy(data, (v) => v !== undefined);
}
