import store from "../redux/Store";

var api = "http://y.id:8000/";
// var api = "http://192.168.43.140:8000/";
// var api = "http://47.254.248.35/api/api-mebel-apps/public/";
// var api = "http://api.belanjamalang.com/public/";

// LOCAL STORAGE JWT
// var authorization = JSON.parse(localStorage.getItem("user"));
// if (authorization === null) {
//   authorization = "abc";
// } else {
//   authorization = authorization.data.api_token;
// }

// REDUX JWT
var authorization = store.getState().auth;
console.log("reduxAuth outer", authorization);

if (authorization.length !== 0) {
  authorization = authorization[0].api_token;
  console.log("reduxAuth", authorization);
} else {
  authorization = "abc";
  console.log("reduxAuth", authorization);
}

export default global.config = {
  bearer: authorization, // Header JWT
  endPoint: api,

  authLogin: api + "login",
  authRegister: api + "register",

  authReset: api + "reset",
  authResetPass: api + "reset/password",

  authUpdateUser: api + "update-user",
  authDelUser: api + "del-user",

  authActUser: api + "user-active",
  authRole: api + "role-users",
  authShowUser: api + "show-user",

  // show barang tbl_barang
  sh_barang: api + "barang/all",

  // show all data post
  shMonitorBarang: api + "barang/monitor",

  // masuk
  sh_brg_masuk: api + "barang/masuk",
  input_brg_masuk: api + "barang/masuk/input",
  update_brg_masuk: api + "barang/masuk/update",
  delete_brg_masuk: api + "barang/masuk/delete",

  // keluar
  sh_brg_keluar: api + "barang/keluar",
  input_brg_keluar: api + "barang/keluar/input",
  update_brg_keluar: api + "barang/keluar/update",
  delete_brg_keluar: api + "barang/keluar/delete",

  // barang
  sh_brg: api + "barang/list",
  input_brg: api + "barang/all/input",
  update_brg: api + "barang/all/update",
  delete_brg: api + "barang/all/delete",

  actUploadImg: api + "act-post-img"
};
