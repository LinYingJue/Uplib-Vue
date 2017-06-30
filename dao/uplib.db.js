//DB
var mysql = require('mysql')
var mysqlConfig = require('./mysql.config')
var uplibDBPool = mysql.createPool(mysqlConfig.uplibdb)
var async = require('async')

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
          console.log("Query error:" + err);
          callback(false);
          connection.release();
        }else{
          var bookList = '';
          bookList = JSON.stringify(results);
          callback(true, bookList);
          connection.release();
        }
      });
    });
  },
  getBookDetail: function (id, callback) {
    var getConnTask = function(cb){
      uplibDBPool.getConnection(function(err, conn) {
        if(err) {
          cb(new Error("getConnection error:" + err), null, conn);
        }else{
          cb(null, conn);
        }
      });
    };
    var getDetailTask = function(conn, cb){
      var sql = "select * from tbl_book where id = ?";
      conn.query(sql, [id], function(err, results) {
        if(err) {
          cb(new Error("Query error:" + err), null, conn);
        } else {
          cb(null, results[0], conn);
        }
      });
    };
    var getBorrowTask = function(bookDetail, conn, cb){
      if(bookDetail.status == '01'){
        var sql = "select tu.empname as name, tbbf.end_time as end_time from tbl_book_borrow_flow as tbbf, tbl_user as tu where book_id = ? and status = '00' and tbbf.reader_id = tu.uid";
        conn.query(sql, [bookDetail.id], function(err, results) {
          if(err) {
            cb(new Error("Query error:" + err), null, null, conn);
          } else if(results.length > 0) {
            cb(null, bookDetail, results[0], conn);
          } else {
            cb(null, bookDetail, null, conn);
          }
        });
      }else{
        cb(null, bookDetail, null, conn);
      }
    };
    var getCommentTask = function(bookDetail, bookBorrow, conn, cb){
      var sql = "select * from tbl_review where book_id = ? order by review_time desc limit 3";
      conn.query(sql, [bookDetail.id], function(err, results) {
        if(err) {
          cb(new Error("Query error:" + err), null, conn);
        } else {
          bookDetail = JSON.stringify(bookDetail);
          bookBorrow = JSON.stringify(bookBorrow);
          var bookComment = JSON.stringify(results);
          var jsonRes = '{"bookDetail":'+bookDetail+',"bookComment":'+bookComment+',"bookBorrow":'+bookBorrow+'}';
          jsonRes = JSON.parse(jsonRes);
          cb(null, jsonRes, conn);
        }
      });
    };
    async.waterfall([getConnTask, getDetailTask, getBorrowTask, getCommentTask],
      function(err, bookDetail, conn){
        if(err){
          console.log(err);
          callback(false);
        }else{
          conn.release();
          callback(true, bookDetail);
        }
      }
    );
  },
  getAllBookAndUserList: (callback) => {
    var getConnTask = function(cb){
      uplibDBPool.getConnection(function(err, conn) {
        if(err) {
          cb(new Error("getConnection error:" + err), null, conn);
        }else{
          cb(null, conn);
        }
      });
    }
    var getUserListTask = function(conn, cb){
      var sql = "select * from tbl_user";
      conn.query(sql, function(err, results) {
        if(err) {
          cb(new Error("Query error:" + err), null, conn);
        }else{
          cb(null, results, conn);
        }
      });
    }
    var getUserCountTask = function(userList, conn, cb){
      var sql = "select count(*) as count from tbl_book where status in ('00','01') and owner_id = ?";
      var index = 0;
      for(var i = 0; i<userList.length;i++){
        conn.query(sql, userList[i].uid, function(err, rows, fields){
          if(err){
            console.log(err);
          }else{
            userList[index].score = rows[0].count;
            index++;
          }
        });
      }
      cb(null, userList, conn);
    }
    var getBookListTask = function(userList, conn, cb){
      var sql = "select * from book_info_view where status in ('00','01')";
      conn.query(sql, function(err, results) {
        if(err) {
          cb(new Error("Query error:" + err), userList, conn);
        }else{
          cb(null, userList, results, conn);
        }
      });
    }
    async.waterfall([getConnTask, getUserListTask, getUserCountTask, getBookListTask],
      function(err, userList, bookList, conn){
        if(err){
          console.log(err);
          callback(false);
        }else{
          conn.release();
          bookList = JSON.stringify(bookList);
          userList = JSON.stringify(userList);
          var jsonRes = '{"bookList":'+bookList+',"userList":'+userList+'}';
          jsonRes = JSON.parse(jsonRes);
          callback(true, jsonRes);
        }
      }
    );
  }
};
