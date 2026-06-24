const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const USER_SAFE_DATA = "firstName lastName age photoUrl gender about skills";

userRouter.post("/user/requests/received", userAuth, async (req, res) => {
     const loggedInUser = req.user;

     const connections = await ConnectionRequest.find({
          toUserId: loggedInUser._id,
          status: "interested",
     }).populate(
          "fromUserId",
          "firstName lastName age gender photoUrl about skills",
     );

     if (connections.length == 0) {
          return res.status(404).json({ message: "connections not found" });
     }
     res.json({ message: "connections found", data: connections });
});

userRouter.post("/user/connection", userAuth, async (req, res) => {
     try {
          const loggedInUser = req.user;

          const connectionRequest = await ConnectionRequest.find({
               $or: [
                    { toUserId: loggedInUser._id, status: "accepted" },
                    { fromUserId: loggedInUser._id, status: "accepted" },
               ],
          })
               .populate("fromUserId", USER_SAFE_DATA)
               .populate("toUserId", USER_SAFE_DATA);

          const data = connectionRequest.map((row) => {
               if (
                    row.fromUserId._id.toString() == loggedInUser._id.toString()
               ) {
                    return row.toUserId;
               }
               return row.fromUserId;
          });
          res.json({ data });
     } catch (err) {
          res.status(404).send("Error: " + err.message);
     }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
     const page = parseInt(req.query.page) || 1;
     let limit = parseInt(req.query.limit) || 10;
     limit = limit > 50 ? 50 : limit;
     const skip = (page - 1) * limit;
     try {
          const loggedInUser = req.user;

          const connections = await ConnectionRequest.find({
               $or: [
                    { fromUserId: loggedInUser._id },
                    { toUserId: loggedInUser._id },
               ],
          }).select("fromUserId toUserId");

          const hideUsersFromFeed = new Set();

          connections.forEach((user) => {
               hideUsersFromFeed.add(user.fromUserId.toString());
               hideUsersFromFeed.add(user.toUserId.toString());
          });

          const users = await User.find({
               $and: [
                    { _id: { $nin: Array.from(hideUsersFromFeed) } },
                    { _id: { $ne: loggedInUser._id } },
               ],
          })
               .select(USER_SAFE_DATA)
               .skip(skip)
               .limit(limit);

          res.send(users);
     } catch (err) {
          res.status(400).send("Error: " + err.message);
     }
});

module.exports = { userRouter };
