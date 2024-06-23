const express = require("express");
const app = express();
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const mongoose = require("mongoose");
const { error } = require("console");
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

//index route for mongodb
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  // console.log(chats);
  res.render("index.ejs", { chats });
});

//newchat route

app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

//create route

app.post("/chats", (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    create_at: new Date(),
  });

  newChat
    .save()
    .then((res) => {
      console.log("chat is saved");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/chats");
});

//edit route

app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

//update route

app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newMsg } = req.body;
  try {
    await Chat.findByIdAndUpdate(
      id,
      { msg: newMsg },
      { runValidators: true, new: true }
    );
    console.log("Chat updated");
    res.redirect("/chats");
  } catch (err) {
    console.error("Error updating chat:", err);
    res.status(500).send("Internal Server Error");
  }
});

//delete route
app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let deleteChat = await Chat.findByIdAndDelete(id);
  console.log(deleteChat);
  res.redirect("/chats");
});

app.get("/", (req, res) => {
  res.send("root is working");
});
app.listen(8080, () => {
  console.log("server is listening port 8080");
});
