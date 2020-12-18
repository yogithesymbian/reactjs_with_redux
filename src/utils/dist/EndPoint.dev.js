// var api = "http://y.id:8000/";
// var api = "http://192.168.43.140:8000/";
// var api = "http://47.254.248.35/api/api-mebel-apps/public/";
var api = "http://47.254.248.35/api/api-malang-apps/public/";

var _default = (global.config = {
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
  actUploadImg: api + "act-post-img",

  // other source
  shCategory: api + "show-kategori",
  actCategory: api + "category",
  actSliderImg: api + "act-slider-img"
});

exports["default"] = _default;
