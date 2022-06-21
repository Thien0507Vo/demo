// /////////////////////////THIẾT LẬP KẾT NỐI WEB/////////////////////////
const { Certificate } = require("crypto");
var express = require("express");
const { pool } = require("mssql/msnodesqlv8");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);
// Home calling
app.get("/", function(req, res){
    res.render("home")
});
// ///////////QUẢN LÝ CƠ SỞ DỮ LIỆU///////////
// SQl server
var sql = require("mssql/msnodesqlv8");
const config = {
    user: 'sa',
    password: '123456',
    server: '192.168.10.21,1433',
    database: 'SQL_Thien',
    port: 1433,
    driver: 'msnodesqlv8'
};

// Đọc dữ liệu từ SQL Processing
io.on("connection", function (socket) {
    socket.on("msg_SQL_Show", function (a) {
        sql.connect(config, function (err) {
            if (err) console.log("Lỗi kết nối");
            else console.log('Được process rồi nè');
            let sqlRequest = new sql.Request();
            let sqlQuery = 'SELECT * FROM SQL_Thien.dbo.Processing ;'
            sqlRequest.query(sqlQuery, function (err, data) {
                if (err) console.log("Lỗi gửi")
                else {
                    socket.emit('SQL_Show', data.recordset);
                }
                sql.close();
            });
                
        });
    });
});
// Đọc dữ liệu từ SQL Input
io.on("connection", function (socket) {
    socket.on("msg_SQL_ShowInput", function (a) {
        sql.connect(config, function (err) {
            if (err) console.log("Lỗi kết nối");
            else console.log('Được input rồi nè');
            let sqlRequest = new sql.Request();
            let sqlQuery = 'SELECT * FROM SQL_Thien.dbo.Input ;'
            sqlRequest.query(sqlQuery, function (err, data) {
                if (err) console.log("Lỗi gửi")
                else {
                    socket.emit('SQL_ShowInput', data.recordset);
                }
                sql.close();
            });

        });
    });
});
// Đọc dữ liệu từ SQL Output
io.on("connection", function (socket) {
    socket.on("msg_SQL_ShowOutput", function (a) {
        sql.connect(config, function (err) {
            if (err) console.log("Lỗi kết nối");
            else console.log('Được output rồi nè');
            let sqlRequest = new sql.Request();
            let sqlQuery = 'SELECT * FROM SQL_Thien.dbo.Output ;'
            sqlRequest.query(sqlQuery, function (err, data) {
                if (err) console.log("Lỗi gửi")
                else {
                    socket.emit('SQL_ShowOutput', data.recordset);
                }
                sql.close();
            });

        });
    });
});
// Đọc dữ liệu từ SQL Customer
io.on("connection", function (socket) {
    socket.on("msg_SQL_ShowCustomer", function (a) {
        sql.connect(config, function (err) {
            if (err) console.log("Lỗi kết nối");
            else console.log('Được customer rồi nè');
            let sqlRequest = new sql.Request();
            let sqlQuery = 'SELECT * FROM SQL_Thien.dbo.Customer ;'
            sqlRequest.query(sqlQuery, function (err, data) {
                if (err) console.log("Lỗi gửi")
                else {
                    socket.emit('SQL_ShowCustomer', data.recordset);
                }
                sql.close();
            });

        });
    });
});
// Đọc dữ liệu từ SQL Ship
io.on("connection", function (socket) {
    socket.on("msg_SQL_ShowShip", function (a) {
        sql.connect(config, function (err) {
            if (err) console.log("Lỗi kết nối");
            else console.log('Được Ship rồi nè');
            let sqlRequest = new sql.Request();
            let sqlQuery = 'SELECT * FROM SQL_Thien.dbo.Ship ;'
            sqlRequest.query(sqlQuery, function (err, data) {
                if (err) console.log("Lỗi gửi")
                else {
                    socket.emit('SQL_ShowShip', data.recordset);
                }
                sql.close();
            });

        });
    });
});
// Lọc dữ liệu từ SQL Processing
io.on("connection", function (socket) {
    socket.on("msg_SQL_Show_Processing_loc", function (a) {
        var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset time Việt Nam (GMT7+)
        // Lấy thời gian tìm kiếm từ date time piker
        var timeS = new Date(a[1]); // Thời gian bắt đầu
        var timeE = new Date(a[2]); // Thời gian kết thúc
        // Quy đổi thời gian ra định dạng cua MySQL
        var timeS1 = "'" + (new Date(timeS - tzoffset)).toISOString().slice(0, -1).replace("T", " ") + "'";
        var timeE1 = "'" + (new Date(timeE - tzoffset)).toISOString().slice(0, -1).replace("T", " ") + "'";
        sql.connect(config, function (err) {
            if (err) console.log("Lỗi kết nối");
            else console.log('Lọc Process rồi nè');
            let sqlRequest = new sql.Request();
            let sqlQuery = "SELECT * FROM SQL_Thien.dbo.Processing WHERE [Customer] = N'" + a[0] + "' AND [Datetime] BETWEEN " + timeS1 + " AND " + timeE1+";"
            sqlRequest.query(sqlQuery, function (err, data) {
                if (err) console.log("Lỗi gửi")
                else {;
                    socket.emit('SQL_Show_Processing_loc', data.recordset);
                }
                sql.close();
            });

        });
    });
});
// Lọc dữ liệu từ SQL Input
io.on("connection", function (socket) {
    socket.on("msg_SQL_Show_Input_loc", function (a) {
        var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset time Việt Nam (GMT7+)
        // Lấy thời gian tìm kiếm từ date time piker
        var timeS = new Date(a[1]); // Thời gian bắt đầu
        var timeE = new Date(a[2]); // Thời gian kết thúc
        // Quy đổi thời gian ra định dạng cua MySQL
        var timeS1 = "'" + (new Date(timeS - tzoffset)).toISOString().slice(0, -1).replace("T", " ") + "'";
        var timeE1 = "'" + (new Date(timeE - tzoffset)).toISOString().slice(0, -1).replace("T", " ") + "'";
        sql.connect(config, function (err) {
            if (err) console.log("Lỗi kết nối");
            else console.log('Lọc Input rồi nè');
            let sqlRequest = new sql.Request();
            let sqlQuery = "SELECT * FROM SQL_Thien.dbo.Input WHERE [Customer] = N'" + a[0] + "' AND [Datetime] BETWEEN " + timeS1 + " AND " + timeE1 + ";"
            sqlRequest.query(sqlQuery, function (err, data) {
                if (err) console.log("Lỗi gửi")
                else {
                    ;
                    socket.emit('SQL_Show_Input_loc', data.recordset);
                }
                sql.close();
            });

        });
    });
});
// Lọc dữ liệu từ SQL Output
io.on("connection", function (socket) {
    socket.on("msg_SQL_Show_Output_loc", function (a) {
        var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset time Việt Nam (GMT7+)
        // Lấy thời gian tìm kiếm từ date time piker
        var timeS = new Date(a[1]); // Thời gian bắt đầu
        var timeE = new Date(a[2]); // Thời gian kết thúc
        // Quy đổi thời gian ra định dạng cua MySQL
        var timeS1 = "'" + (new Date(timeS - tzoffset)).toISOString().slice(0, -1).replace("T", " ") + "'";
        var timeE1 = "'" + (new Date(timeE - tzoffset)).toISOString().slice(0, -1).replace("T", " ") + "'";
        sql.connect(config, function (err) {
            if (err) console.log("Lỗi kết nối");
            else console.log('Lọc Output rồi nè');
            let sqlRequest = new sql.Request();
            let sqlQuery = "SELECT * FROM SQL_Thien.dbo.Output WHERE [Customer] = N'" + a[0] + "' AND [Datetime] BETWEEN " + timeS1 + " AND " + timeE1 + ";"
            sqlRequest.query(sqlQuery, function (err, data) {
                if (err) console.log("Lỗi gửi")
                else {
                    ;
                    socket.emit('SQL_Show_Output_loc', data.recordset);
                }
                sql.close();
            });

        });
    });
});
////alert('aaaaaaaaaaaa');

