const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/whatsapp";
async function main() {
  await mongoose.connect(MONGO_URL);
}
main()
  .then(() => {
    console.log("connect to Db");
  })
  .catch((err) => {
    console.log(err);
  });

let allChats = [
  {
    from: "neha",
    to: "Priya",
    msg: "send me your exam sheets",
    create_at: new Date(),
  },
  {
    from: "krunal",
    to: "priyankaa",
    msg: "send me photo",
    create_at: new Date(),
  },
  {
    from: "apu",
    to: "pabel",
    msg: "send me your number",
    create_at: new Date(),
  },
  {
    from: "dipto",
    to: "arpa",
    msg: "accept my request",
    create_at: new Date(),
  },
];

Chat.insertMany(allChats);
