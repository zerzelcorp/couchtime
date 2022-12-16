export const getData = async (edp,pg,q,gn) => {
  try {
    const req = await fetch(`${process.env.REACT_APP_URL_BASE}${edp}?api_key=${process.env.REACT_APP_API_KEY}&page=${pg}&query=${q}&with_genres=${gn}`);
    const res = await req.json();
    return res;
  } catch (error) {
    console.log("err from get method", error);
  }
};
