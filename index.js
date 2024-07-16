// const express = require("express");
// const cors = require('cors');
// const users = require("./MOCK_DATA.json");
// const app = express();
// const PORT = 8000;

// app.use(cors());

// app.get("/api/users", (req, res) => {
//   return res.json(users);
// });

// app
//  .route("/api/users/:id")
//  .get((req, res) =>{
//   const id = Number(req.params.id);
//   const user = users.find((user) => user.id === id);
//   return res.json(user);
// })
// .patch((req, res) =>{
//   return res.json({status:"pending"});
// })
// .delete((req, res) =>{
//   return res.json({status:"pending"});
// });
// app.post("/api/users",(req, res) =>{
//   return res.json({status:"pending"});
// })

// app.listen(PORT, () => console.log(`Server started at port :${PORT}`));





// const express = require("express");
// const cors = require('cors');
// const users = require("./MOCK_DATA.json");
// const app = express();
// const fs  =require("fs");
// const PORT = 8000;

// app.use(express.urlencoded({extended : false}));

// app.use(cors());

// app.get("/api/users", (req, res) => {
//   return res.json(users);
// });

// app
//  .route("/api/users/:id")
//  .get((req, res) =>{
//   const id = Number(req.params.id);
//   const user = users.find((user) => user.id === id);
//   return res.json(user);
// })
// .patch((req, res) =>{
//   return res.json({status:"pending"});
// })
// .delete((req, res) =>{
//   return res.json({status:"pending"});
// });
// app.post("/api/users",(req, res) =>{
//   const body = req.body;
//   users.push({ ...body, id:users.length+1});
//   fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
//     return res.json({status:"Successfull", id:users.length});
//   });

// });

// app.listen(PORT, () => console.log(`Server started at port :${PORT}`));



const express = require("express");
const cors = require('cors');
const users = require("./MOCK_DATA.json");
const app = express();
const fs = require("fs");
const PORT = 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (user) {
      return res.json(user);
    } else {
      return res.status(404).json({ status: "Error", message: "User not found" });
    }
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex !== -1) {
      const updatedData = req.body;
      users[userIndex] = { ...users[userIndex], ...updatedData };

      fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ status: "Error", message: "Failed to update user" });
        }
        return res.json({
          status: "Success",
          message: "User updated successfully",
          user: users[userIndex],
        });
      });
    } else {
      return res.status(404).json({ status: "Error", message: "User not found" });
    }
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex !== -1) {
      users.splice(userIndex, 1);

      fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ status: "Error", message: "Failed to delete user" });
        }
        return res.json({
          status: "Success",
          message: "User deleted successfully",
        });
      });
    } else {
      return res.status(404).json({ status: "Error", message: "User not found" });
    }
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  const newUser = { ...body, id: users.length + 1 };
  users.push(newUser);

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ status: "Error", message: "Failed to add user" });
    }
    return res.json(newUser);
  });
});

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));


