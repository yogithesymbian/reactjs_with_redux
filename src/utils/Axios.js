import axios from "axios";
import "../utils/EndPoint";

axios.defaults.baseURL = global.config.endPoint;
axios.defaults.headers.common = {
  Authorization: `Bearer ${global.config.bearer}`
};
export default axios;
