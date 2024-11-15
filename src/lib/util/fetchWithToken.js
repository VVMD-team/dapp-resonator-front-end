import { authTokenStorageKey } from "@/lib/constants";

const getAuthToken = () => {
  const token = localStorage.getItem(authTokenStorageKey) || "";
  if (!token) {
    return "";
  }
  return `Bearer ${token}`;
};

const fetchWithToken = async (url, options) => {
  options.headers = options.headers || {};

  const auth_token = getAuthToken();

  if (auth_token) {
    options.headers["Authorization"] = auth_token;
  }

  const response = await fetch(url, options).then((resp) => {
    if (resp.status === 401) {
      localStorage.clear();
    } else {
      return resp;
    }
  });

  return await response.json();
};

export default fetchWithToken;
