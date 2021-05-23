const mongoose = require("mongoose");

const MONGOURI =
  "mongodb+srv://admin:purva123@cluster0.tkuul.mongodb.net/node-auth?retryWrites=true&w=majority";

const InitialteMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to db !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitialteMongoServer;
