const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
     {
          firstName: {
               type: String,
               required: true,
               minLength: 4,
               maxLength: 50,
               trim: true,
          },
          lastName: {
               type: String,
               minLength: 4,
               maxLength: 40,
               trim: true,
          },
          email: {
               type: String,
               required: true,
               lowercase: true,
               unique: true,
               validate(value) {
                    if (!validator.isEmail(value)) {
                         throw new Error("Invalid email address");
                    }
               },
          },
          password: {
               type: String,
               required: true,
               trim: true,
               validate(value) {
                    if (!validator.isStrongPassword(value)) {
                         throw new Error("Enter a strong password: " + value);
                    }
               },
          },
          age: {
               type: Number,
               min: 18,
          },
          gender: {
               type: String,
               enum: {
                    values: ["male", "female", "others"],
                    message: `{VALUE} is not a valid gender type`,
               },
               //  validate(value) {
               //    if (!["male", "female", "others"].includes(value)) {
               //      throw new Error("Gender data is not valid");
               //    }
               //  },
          },
          photoUrl: {
               type: String,
               default: "https://images.search.yahoo.com/search/images;_ylt=AwrKEu24Cy5qRQIAmreJzbkF;_ylc=X1MDOTYwNjI4NTcEX3IDMgRhY3RuA2tleWJvYXJkBGZyA21jYWZlZQRmcjIDc2ItdG9wBGdwcmlkAzhvTFZiOFZfUnpTdHZ4MFd6YWlfNEEEbl9yc2x0AzAEbl9zdWdnAzEwBG9yaWdpbgNpbWFnZXMuc2VhcmNoLnlhaG9vLmNvbQRwb3MDMARwcXN0cgMEcHFzdHJsAzAEcXN0cmwDMTAEcXVlcnkDdXNlciUyMGljb25zBHNlYwNzZWFyY2gEc2xrA2J1dHRvbgR0MgNzZWFyY2gEdDQDa2V5Ym9hcmQEdF9zdG1wAzE3ODE0MDI2NTc-?p=user+icons&fr=mcafee&fr2=sb-top&imgurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F000%2F439%2F863%2Foriginal%2Fvector-users-icon.jpg",
               validate(value) {
                    if (!validator.isURL(value)) {
                         throw new Error("Invalid photo url:" + value);
                    }
               },
          },
          about: {
               type: String,
               default: "This is a default about of the user",
          },
          skills: {
               type: [String],
          },
     },
     {
          timestamps: true,
     },
);

userSchema.index({ firstName: 1 });

module.exports = mongoose.model("User", userSchema);
