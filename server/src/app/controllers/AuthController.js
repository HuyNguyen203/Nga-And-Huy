const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { multipleMongooseToObject } = require("../../util/mongoose");
let refreshTokens = [];
class AuthController {
  //REGISTER
  async registerUser(req, res) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      //Create new user
      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      });

      //Save to db
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  //LOGIN
  async loginUser(req, res) {
    try {
      const user = await User.findOne({ username: req.body.username }); //Find user by username
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      ); //Compare password
      if (!validPassword) {
        return res.status(400).json({ message: "Invalid password" });
      }
      if (user && validPassword) {
        const accessToken = jwt.sign(
          {
            id: user.id,
            admin: user.admin,
          },
          "capybara",
          {
            expiresIn: "1h",
          }
        );
        const refreshToken = jwt.sign(
          {
            id: user.id,
            admin: user.admin,
          },
          "capybara",
          {
            expiresIn: "365d",
          }
        );
        refreshTokens.push(refreshToken);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken, refreshToken });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  //Refresh token
  async refreshToken(req, res) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json("You are not authenticated");
    }
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is not valid");
    }
    jwt.verify(refreshToken, "capybara", (err, user) => {
      if (err) {
        console.log(err);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      const newAccessToken = jwt.sign(
        { id: user.id, admin: user.admin },
        "capybara",
        { expiresIn: "1h" }
      );
      const newRefreshToken = jwt.sign(
        { id: user.id, admin: user.admin },
        "capybara",
        { expiresIn: "1h" }
      );
      refreshTokens.push(newRefreshToken);
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({ accessToken: newAccessToken });
    });
  }
  //Logout
  async logout(req, res) {
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.refreshToken
    );
    res.status(200).json("Logged out successfully");
  }
}

module.exports = new AuthController();
