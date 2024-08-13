const BoMon = require("../models/BoMon");
const { mongooseToObject } = require("../../util/mongoose");

class BoMonController {
  index(req, res, next) {
    //
    BoMon.aggregate([
      {
        $lookup: {
          from: "giangviens",
          localField: "truongBoMon",
          foreignField: "maGiangVien",
          as: "thongTinTruongBoMon",
        },
      },
      {
        $lookup: {
          from: "giangviens",
          localField: "phoBoMon",
          foreignField: "maGiangVien",
          as: "thongTinPhoBoMon",
        },
      },
      {
        $project: {
          _id: 0,
          maBoMon: 1,
          tenBoMon: 1,
          truongBoMonTen: {
            $reduce: {
              input: {
                $map: {
                  input: "$thongTinTruongBoMon",
                  as: "giangVien",
                  in: "$$giangVien.hoTen",
                },
              },
              initialValue: "",
              in: {
                $cond: {
                  if: { $eq: ["$$value", ""] },
                  then: "$$this",
                  else: { $concat: ["$$value", ", ", "$$this"] },
                },
              },
            },
          },
          phoBoMonTen: {
            $reduce: {
              input: {
                $map: {
                  input: "$thongTinPhoBoMon",
                  as: "giangVien",
                  in: "$$giangVien.hoTen",
                },
              },
              initialValue: "",
              in: {
                $cond: {
                  if: { $eq: ["$$value", ""] },
                  then: "$$this",
                  else: { $concat: ["$$value", ", ", "$$this"] },
                },
              },
            },
          },
          trangThai: {
            $cond: {
              if: { $eq: ["$trangThai", true] },
              then: "Còn dạy",
              else: "Ngừng dạy",
            },
          },
        },
      },
    ])

      .then((bomons) => {
        res.json(bomons);
      })
      .catch(next);
  }
}

module.exports = new BoMonController(); // Xuất ra đối tượng NewsController (như constructor)
