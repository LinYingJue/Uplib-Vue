//DB
var mysql = require('mysql')
var mysqlConfig = require('./mysql.config')
var uplibDBPool = mysql.createPool(mysqlConfig.uplibdb)

module.exports = {
  getBooksByLimits: function (limit, callback) {
    var sql = "select * from book_info_view where status in ('00','01') order by like_nums desc limit ?";
    uplibDBPool.getConnection(function(err, connection) {
      if(err) {
        console.log("getConnection error:" + err);
        callback(false);
      }
      connection.query(sql, [limit], function(err, results) {
        if(err) {
          console.log("Quert error:" + err);
          callback(false);
        }
        var bookList = '';
        bookList = JSON.stringify(results);
        callback(true, bookList);
      });
    });
  },
  getBookDetail: function (id, callback) {
    var sql = "select * from tbl_book where id = ?";
    uplibDBPool.getConnection(function(err, connection) {
      if(err) {
        console.log("getConnection error:" + err);
        callback(false);
      }
      connection.query(sql, [id], function(err, results) {
        if(err) {
          console.log("Quert error:" + err);
          callback(false);
        }
        var bookDetail = '';
        bookDetail = JSON.stringify(results);
        callback(true, bookDetail);
      });
    });
  }
};
