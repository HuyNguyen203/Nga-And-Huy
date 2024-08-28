//Khai báo - khởi tạo
const express = require("express"); //Sử dụng thư viện express đã dược cài ở node_modules
const morgan = require("morgan"); //Sử dụng thư viện morgan đã cài ở node_modules
const methodOverride = require("method-override");
const handlebars = require("express-handlebars").engine; //Sử dụng thư viện express-handlebars đã cài ở node_modules
const { engine } = require("express-handlebars");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express(); // Gọi tới function express, biến khởi tạo được dùng đại diện cho ứng dụng của chương trình
const port = 4000; // Số port

const route = require("./routes");
const db = require("./config/db");
const cors = require("cors");

//Connect to DB
db.connect();

// Sử lý các file tĩnh
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// HTTP logger
app.use(morgan("combined")); // Sử dụng morgan để nhận request từ web

// Template engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs", //Config lại đuôi file .handlebars
    helpers: {
      sum: (a, b) => a + b, //Cấu hình
    },
  })
); // app đang sử dụng template engine là engine() với name là handlebars (hbs)
// app.set("view engine", "hbs"); // app sử dụng chính handlebars (hbs) ở dòng trên làm view engine
// app.set("views", path.join(__dirname, "resources/views"));

route(app);

app.listen(port, () => {
  // Lắng nghe trển cổng trình duyệt của bạn
  console.log(`App listening at http://localhost:${port}`);
});
