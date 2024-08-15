const lopHocPhan = require("../models/LopHocPhan");
const { multipleMongooseToObject } = require("../../util/mongoose");

class LopHocPhanController {
  index(req, res, next) {
    const id = req.params.id;

    lopHocPhan
      .aggregate([
        {
          $lookup: {
            from: "monhocs",
            localField: "maMonHoc",
            foreignField: "maMonHoc",
            as: "thongTinMonHoc",
          },
        },
        {
          $unwind: {
            path: "$thongTinMonHoc",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 0,
            maLopHocPhan: 1,
            tenLopHocPhan: 1,
            trangThai: 1,
            maGiangVien: 1,
            maMonHoc: 1,
            thongTinMonHoc: {
              tenMonHocTiengViet: 1,
              tenMonHocTiengAnh: 1,
            },
          },
        },
      ])
      .then((lopHocPhan) => {
        res.json(lopHocPhan);
      })
      .catch(next);
  }

  ChiTietLopHocPhan(req, res, next) {
    const id = req.params.id;

    lopHocPhan
      .aggregate([
        {
          $match: {
            maLopHocPhan: id,
          },
        },
        {
          $unwind: "$danhSachSinhVien",
        },
        {
          $lookup: {
            from: "sinhviens",
            localField: "danhSachSinhVien.maSinhVien",
            foreignField: "maSinhVien",
            as: "thongTinSinhVien",
          },
        },
        {
          $unwind: "$thongTinSinhVien",
        },
        {
          $group: {
            _id: "$danhSachSinhVien.maSinhVien",
            mssv: { $first: "$danhSachSinhVien.maSinhVien" },
            hoTen: { $first: "$thongTinSinhVien.hoTen" },
            ngaySinh: {
              $first: {
                $dateToString: {
                  format: "%d/%m/%Y",
                  date: "$thongTinSinhVien.ngaySinh",
                  timezone: "Asia/Ho_Chi_Minh",
                },
              },
            },
            lopDanhNghia: { $first: "$thongTinSinhVien.lopDanhNghia" },
            clos: { $first: "$danhSachSinhVien.clos" },
            trangThai: {
              $first: {
                $cond: {
                  if: { $eq: ["$thongTinSinhVien.trangThai", true] },
                  then: "Còn học",
                  else: "Đã nghỉ",
                },
              },
            },
            thongTinMonHoc: { $first: "$thongTinMonHoc" },
          },
        },
        {
          $project: {
            _id: 0,
            mssv: 1,
            hoTen: 1,
            ngaySinh: 1,
            lopDanhNghia: 1,
            clos: 1,
            trangThai: 1,
            thongTinMonHoc: 1,
          },
        },
      ])

      .then((chiTietHocPhan) => {
        res.json(chiTietHocPhan);
      })
      .catch(next);
  }
}

module.exports = new LopHocPhanController();
