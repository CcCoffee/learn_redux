export const fetchListViaHttp = () => {
  return fetch("/todos", {
    method: "GET",
  })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
};
