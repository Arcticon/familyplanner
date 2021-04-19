import { reactive, toRefs } from "vue";
import { useApi } from "./api";
import { formatPromise } from "./util";

let localStorageLookupTable = new Map<string, string>([]);
localStorageLookupTable.set("user", "fp.user");

const state = reactive({
  user: undefined,
  error: undefined,
});

const userFromLocalStorage = window.localStorage.getItem(
  localStorageLookupTable.get("user") || ""
);

if (userFromLocalStorage) {
  //   console.log("found user in localStorage", userFromLocalStorage);
  try {
    state.user = JSON.parse(userFromLocalStorage);
  } catch (error) {
    console.error(error);
  }
}

export function useAuth() {
  const setUser = (payload: any, remember: boolean): void => {
    if (remember) {
      window.localStorage.setItem(
        localStorageLookupTable.get("user") || "",
        JSON.stringify(payload)
      );
    }
    state.user = payload;
    state.error = undefined;
  };

  async function logout() {
    const { data, post } = useApi("logout");

    const [err, logOutSuccessfull] = await formatPromise(post());

    if (err) {
      console.error({ err });
      state.error = err;
      throw err;
    }
    if (logOutSuccessfull) {
      console.log({ logOutSuccessfull });
      state.user = undefined;
    }
    console.log({ data });
    window.localStorage.removeItem(localStorageLookupTable.get("user") || "");
    return;
  }

  return {
    setUser,
    logout,
    ...toRefs(state),
  };
}
