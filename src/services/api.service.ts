type FetchMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const fetchOptions = (
  method: FetchMethod,
  body: object | undefined = undefined
) => {
  const myHeaders = new Headers();
  myHeaders.append("Cache-Control", "no-store");
  myHeaders.append("Pragma", "no-cache");

  if (body) {
    myHeaders.append("Content-Type", "application/json");
    return {
      headers: myHeaders,
      method,
      body: JSON.stringify(body),
    };
  }

  return {
    method,
    headers: myHeaders,
  };
};

export const api = async (
  method: FetchMethod = "GET",
  endpoint: string = "",
  body: object | undefined = undefined
) => {
  const options = fetchOptions(method, body);

  const url = `http://localhost:3004/${endpoint}`;
  let res = await fetch(url, options);

  if (!res.ok) {
    window.alert("문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    return;
  }

  if (res.status === 204) {
    return res;
  }

  const data = await res.json();

  return data;
};

export const uploadApi = async (
  body: FormData,
  endpoint: string = "user",
  method: FetchMethod = "POST"
) => {
  const url = `http://localhost:8000/upload/${endpoint}`;

  let res = await fetch(url, {
    method,
    body,
  });

  if (!res.ok) {
    window.alert("문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    return;
  }

  const data = await res.json();

  return data;
};

export const deleteImageApi = async (prevImage: string[]) => {
  const url = "http://localhost:8000/upload/delete";

  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(prevImage),
  });

  return res;
};
