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
    var sql = "select * from tbl_book where id = ?";
    uplibDBPool.getConnection(function(err, connection) {
      if(err) {
        console.log("getConnection error:" + err);
        callback(false);
      }
      connection.query(sql, [id], function(err, results) {
        if(err) {
          console.log("Query error:" + err);
          callback(false);
          connection.release();
        } else {
          var bookDetail = '';
          bookDetail = JSON.stringify(results);
          callback(true, bookDetail);
          connection.release();
        }
      });
    });
  },
  getAllBookAndUserList: (callback) => {

    var connection = '';
    uplibDBPool.getConnection(function(err, conn) {
      if(err) {
        console.log("getConnection error:" + err);
        callback(false);
      }else{
        connection = conn;
      }
    };

    var getUserListTask = function(taskCallBack){
      var sql = "select * from tbl_user";
      connection.query(sql, function(err, results) {
        if(err) {
          console.log("Query error:" + err);
          taskCallBack(false);
          connection.release();
        }else{
          taskCallBack(true, results);
        }
      });
    }

    var getBookListTask = function(userListRes, taskCallBack){

    }

    uplibDBPool.getConnection(function(err, connection) {
      if(err) {
        console.log("getConnection error:" + err);
        callback(false);
        return;
      }
      var sql = "select * from book_info_view where status in ('00','01')";
      connection.query(sql, function(err, results) {
        if(err) {
          console.log("Query error:" + err);
          callback(false);
          connection.release();
          return;
        }else{
          var bookList = '';
          bookList = JSON.stringify(results);
          sql = "select * from tbl_user";
          connection.query(sql, function(err, results) {
            if(err) {
              console.log("Query error:" + err);
              callback(true, bookList, null);
              connection.release();
              return;
            }else{
              var userList = results;
              for(var i = 0;i < userList.length; i++){
                console.log('first:'+userList[i].score);
                sql = "select count(*) as count from tbl_book where owner_id = '" + userList[i].uid + "'";
                connection.query(sql, function(err, countRes) {
                  if(err){
                    console.log("Query error:" + err);
                    connection.release();
                  }else{
                    console.log('second:'+userList[i].score);
                    userList[i].score = countRes[0].count;
                    console.log('third:'+userList[i].score+';'+countRes[0].count);
                  }
                });
              }
              userList = JSON.stringify(userList);
              callback(true, bookList, userList);
              connection.release();
            }
          });
        }
      });
    });
  }
};
