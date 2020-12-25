import axios from "axios";
import "./EndPoint";

var _Store = _interopRequireDefault(require("../redux/Store"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

axios.defaults.baseURL = global.config.endPoint;
// Add a request interceptor
axios.interceptors.request.use(function(config) {
  const token = _Store["default"].getState().auth;
  if (token.length !== 0) {
    config.headers.Authorization = `Bearer ${token[0].api_token}`;
  } else {
    config.headers.Authorization = null;
  }
  return config;
});

export default axios;
