var api = "http://y.id:8000/";
// var api = "http://192.168.43.140:8000/";
// var api = "http://47.254.248.35/api/api-mebel-apps/public/";
// var api = "http://47.254.248.35/api/api-malang-apps/public/";

var _default = (global.config = {
  endPoint: api,
  authLogin: api + "login",
  // show all data post
  shMonitorBarang: api + "barang/monitor",

  // other source
  shCategory: api + "kategori/show",
  actCategory: api + "kategori/update",
  actSliderImg: api + "kategori/image/upload"
});

exports["default"] = _default;
