import axios from "axios";

const API = axios.create({
  baseURL:
    "https://us-bank-lien-parcel-analysis.herokuapp.com/nc/us_bank_lien_parcel_analysis_vuxm/api/v1/",
  timeout: 1000,
  headers: {
    "xc-auth": process.env.REACT_APP_API_KEY as string,
  },
});

export default API;
