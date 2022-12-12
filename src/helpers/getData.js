export const getData = async (url) => {
  try {
    const req = await fetch(url);
    const res = await req.json();
    return res;
  } catch (error) {
    console.log("err from get method", error);
  }
};
