const express = require("express");
const uuid = require("uuid");
const cors = require('cors')

const port = 3001;

const app = express();
app.use(express.json());
app.use(cors())
/*
-Query Params=> mysite.com/users?nome=iago&age=30 //filters
-Route Params=> /users/2  //SEARCH, DELETE, OR UPDATE SOMETHING SPECIFIC
-Request Body => {name: 'Iago', age: 30} //CREATE or UPDATE

-Get  => Search for information on the back-end
-Post => Create a new information on the back-end   
-Put/Patch => Update a information
-Delete => Delete a information from the back-end

-middleware =>INTERCEPTOR => Has the power to stop or change request data
 */

const users = [];

const checkUserId = (request, response, next) => {
  const { id } = request.params;

  const index = users.findIndex((user) => user.id == id);
  if (index < 0) {
    return response.status(404).json({ message: "User not found" });
  }

  request.userIndex = index;
  request.userId = id

  next()
};

app.get("/users", (request, response) => {
  return response.json(users);
});

app.post("/users", (request, response) => {
  const { name, age } = request.body;

  const user = { id: uuid.v4(), name, age };

  users.push(user);

  return response.status(201).json(user);
});

app.put("/users/:id", checkUserId, (request, response) => {
  const { name, age } = request.body;
  const index = request.userIndex;
  const id = request.userId
  const updatedUser = { id, name, age };

  users[index] = updatedUser;

  return response.json(updatedUser);
});

app.delete("/users/:id", checkUserId, (request, response) => {
  const index = request.userIndex;

  users.splice(index, 1);

  return response.status(204).json();
});

app.listen(port, () => {
  console.log(`🚀🚀 Server started on port ${port} 🚀🚀`);
});
