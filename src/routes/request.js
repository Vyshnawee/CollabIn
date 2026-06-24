const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post(
     "/request/send/:status/:toUserId",
     userAuth,
     async (req, res) => {
          try {
               const fromUserId = req.user._id;
               const toUserId = req.params.toUserId;
               const status = req.params.status;

               const connectionRequest = new ConnectionRequest({
                    fromUserId,
                    toUserId,
                    status,
               });

               const allowedStatus = ["interested", "ignored"];
               if (!allowedStatus.includes(status)) {
                    throw new Error("Invalid status type");
               }

               const toUser = await User.findById(toUserId);
               if (!toUser) {
                    return res.status(404).json({ message: "user not found!" });
               }

               const existingConnections = await ConnectionRequest.findOne({
                    $or: [
                         { fromUserId, toUserId },
                         { fromUserId: toUserId, toUserId: fromUserId },
                    ],
               });

               if (existingConnections) {
                    return res.json({
                         message: "connection already exists...........",
                    });
               }

               const data = await connectionRequest.save();

               res.json({
                    message:
                         req.user.firstName +
                         " is " +
                         status +
                         " in " +
                         toUser.firstName,
                    data,
               });
          } catch (err) {
               res.status(400).send("Error: " + err.message);
          }
     },
);

requestRouter.post(
     "/request/review/:status/:requestId",
     userAuth,
     async (req, res) => {
          try {
               const loggedInUser = req.user;
               const { status, requestId } = req.params;

               const allowedStatus = ["accepted", "rejected"];
               if (!allowedStatus.includes(status)) {
                    return res.status(404).json({ message: "Invalid status" });
               }

               const connectionRequest = await ConnectionRequest.findOne({
                    _id: requestId,
                    toUserId: loggedInUser._id,
                    status: "interested",
               });

               if (!connectionRequest) {
                    return res
                         .status(404)
                         .json({ message: "Connection not found" });
               }

               connectionRequest.status = status;

               const data = await connectionRequest.save();

               res.json({ message: "Request is " + status, data });
          } catch (err) {
               res.status(400).send("Error: " + err.message);
          }
     },
);

module.exports = { requestRouter };
