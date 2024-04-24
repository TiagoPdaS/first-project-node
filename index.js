const express = require("express");
const uuid = require("uuid");
const port = 3000;

const app = express();
app.use(express.json());

/*
-Query Params=> mysite.com/users?nome=iago&age=30 //filters
-Route Params=> /users/2  //SEARCH, DELETE, OR UPDATE SOMETHING SPECIFIC
-Request Body => {name: 'Iago', age: 30} //CREATE or UPDATE

-Get  => Search for information on the back-end
-Post => Create a new information on the back-end   
-Put/Patch => Update a information
-Delete => Delete a information from the back-end

-middleware =>INTERCEPTADOR => Tem o poder de parar ou alterar dados da requisição
 */

const users = [];

app.get("/users", (request, response) => {
  return response.json(users);
});

app.post("/users", (request, response) => {
  const { name, age } = request.body;

  const user = { id: uuid.v4(), name, age };

  users.push(user);

  return response.status(201).json(user);
});

app.put("/users/:id", (request, response) => {
  const { id } = request.params;
  const { name, age } = request.body;
  const updatedUser = { id, name, age };

  const index = users.findIndex((user) => user.id == id);
  if (index < 0) {
    return response.status(404).json({ message: "User not found" });
  }

users[index] = updatedUser

  return response.json(updatedUser);
});

app.delete("/users/:id", (request, response) => {
    const { id } = request.params;

    const index = users.findIndex((user) => user.id == id);
    if (index < 0) {
        return response.status(404).json({ message: "User not found" });
      }

      users.splice(index,1);

    return response.status(204).json();
  });






app.listen(port, () => {
  console.log(`🚀🚀 Server started on port ${port} 🚀🚀`);
});
