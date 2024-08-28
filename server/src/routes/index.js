const homeRouter = require("./home");
const coursesRouter = require("./courses");
const lopHocPhanRouter = require("./lopHocPhan");
const giangVienRouter = require("./giangVien");
const chuongTrinhKhungRouter = require("./chuongTrinhKhung");
const elosRouter = require("./elos");
const closRouter = require("./clos");
const bomonRouter = require("./bomon");
const authRouter = require("./auth");
const userRouter = require("./user");

function route(app) {
  app.use("/courses", coursesRouter);
  app.use("/", homeRouter);
  app.use("/lophocphan", lopHocPhanRouter);
  app.use("/giangvien", giangVienRouter);
  app.use("/chuongtrinhkhung", chuongTrinhKhungRouter);
  app.use("/elos", elosRouter);
  app.use("/clos", closRouter);
  app.use("/bomon", bomonRouter);
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
}

//Json web token

module.exports = route;
