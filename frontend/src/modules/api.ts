import axios, { AxiosRequestConfig } from "axios";
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
// import { useAuth, AUTH_TOKEN } from "./auth";

/**
 *
 * @param endpoint
 * @param access_token
 * @returns
 */
export const useApi = (endpoint: string) => {
  const router = useRouter();
  axios.defaults.withCredentials = true;
  const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_ENDPOINT}`,
    headers: {},
    timeout: 2000,
    withCredentials: true,
  });

  const data = ref();
  const loading = ref(false);
  const error = ref();

  const post = (payload?: Record<string, any>, override?: string) => {
    loading.value = true;
    error.value = undefined;

    let fullEndpoint = endpoint;
    if (override) {
      fullEndpoint = `${fullEndpoint}/${override}`;
    }

    return api
      .post(fullEndpoint, payload)
      .then((res) => (data.value = res.data))
      .catch((e) => {
        error.value = e;

        throw e;
      })
      .finally(() => (loading.value = false));
  };

  async function get(query?: Record<string, any>, config?: AxiosRequestConfig) {
    loading.value = true;
    error.value = undefined;

    let queryString = "";

    if (query) {
      queryString =
        "?" +
        Object.entries(query)
          .map(
            ([key, value]) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
          )
          .join("&");
    }

    try {
      const data = await api.get(`${endpoint}${queryString}`);
      loading.value = false;
      return data;
    } catch (error) {
      error.value = error;
      loading.value = false;
      throw error;
    }
  }

  async function del(override?: string) {
    loading.value = true;
    error.value = undefined;

    let fullEndpoint = endpoint;
    if (override) {
      fullEndpoint = `${fullEndpoint}/${override}`;
    }

    return api
      .delete(fullEndpoint)
      .then((res) => (data.value = res.data))
      .catch((e) => {
        error.value = e;

        throw e;
      })
      .finally(() => (loading.value = false));
  }

  const errorMessage = computed(() => {
    if (error.value) {
      return error.value.message;
    }
  });

  const errorDetails = computed(() => {
    if (error.value && error.value.response) {
      return error.value.response.data.message;
    }
  });

  const errorFields = computed(() => {
    if (error.value && Array.isArray(error.value.response.data.message)) {
      return (error.value.response.data.message as string[]).reduce(
        (acc: Record<string, any>, msg: string) => {
          let [field] = msg.split(" ");

          // TODO: Maximal...
          if (field == "maximal") field = "dateOfBirth";

          if (!acc[field]) {
            acc[field] = [];
          }

          acc[field].push(msg);

          return acc;
        },
        {}
      );
    }
  });

  const computedClasses = (key: string) => {
    if (errorFields.value?.hasOwnProperty(key)) {
      return ["border-red-600", "bg-red-200", "text-red-900"];
    }
    return ["border-grey-600", "bg-white", "text-gray-900"];
  };

  watch([error], () => {
    // If 401 Unauthorised, force user to buy a new subscription
    // if (error.value.response?.status === 401 && router) {
    //   return router.push("/subscribe");
    // }
  });

  return {
    loading,
    data,
    error,
    get,
    post,
    del,
    errorMessage,
    errorDetails,
    errorFields,
    computedClasses,
  };
};
