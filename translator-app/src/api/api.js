import axios from "axios";

export default axios.create({
  baseURL: `https://text-translator2.p.rapidapi.com/`,
  headers: {
    "X-RapidAPI-Key": "161a653015mshf4cc45f6860e78dp19a2f9jsn2237e7e37f45",
    "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
  },
});
