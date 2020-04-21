const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_key = "#295ismybikE";

router.post("/signup", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((users) => {
      if (users.length != 0) {
        return res.status(409).json({
          error: "This Email Already Exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
            });
            user
              .save()
              .then((response) => {
                res.status(201).json({
                  message: "User Created Successfully",
                  userData: {
                    _id: response._id,
                    email: response.email,
                    password: response.password,
                  },
                });
                console.log(response);
              })
              .catch((error) => {
                res.status(500).json({
                  error: error,
                });
              });
          }
        });
      }
    });
});

router.post("/login", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user < 1) {
        return res.status(401).json({
          message: "AUTH_FAILED",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "AUTH_FAILED",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            jwt_key,
            {
              expiresIn: "24h",
            }
          );
          return res.status(200).json({
            message: "AUTH_SUCCESSFUL",
            token: token,
          });
        }
        res.status(401).json({
          message: "AUTH_FAILED",
        });
      });
    })
    .catch((error) => {});
});

router.delete("/:userID", (req, res, next) => {
  User.deleteOne({ _id: req.params.userID })
    .exec()
    .then((response) => {
      res.status(200).json({
        message: "DELETED_SUCCESSFULLY",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
});
module.exports = router;
