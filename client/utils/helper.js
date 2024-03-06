export const fetcher = async ({
  url,
  method = "GET",
  headers = {},
  body = "",
  reqConfig = {},
}) => {
  const fetchOptions = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
    ...reqConfig,
  };
  try {
    const response = await fetch(url, fetchOptions);
    const data = await response.json();

    if (response.status != 200) {
      // Handle non-successful responses here if needed
      throw new Error(
        `HTTP error! Status: ${response.status}, Message: ${data.message}`
      );
    }

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

  