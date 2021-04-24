export const fetchListViaHttp = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return ["Item 1", "Item 2"];
};
