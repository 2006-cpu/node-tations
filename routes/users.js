const usersRouter = require('express').Router();
// const { loginUser, registerUser } = require('../db/users');
usersRouter.post("/login", async (req, res, next) => {
    const { username, password } = req.body
    try {
      const user = await loginUser(username, password);
      if(user.token) localStorage.setItem('token', JSON.stringify(user.token));
      console.log("products:", products)
      res.send({
        message: `Welcome back ${user.username}!`
      });
    } catch (error) {
    }
});
  
usersRouter.post("/register", async (req, res, next) => {
    const { username, password } = req.body
    try {
      const user = await registerUser(username, password);
      if(user) localStorage.setItem('token', JSON.stringify(user));
      console.log("products:", products)
      res.send({
        message: `Thank you for signing up ${user.username}!`
      });
    } catch (error) {
    }
});
  
usersRouter.get("/me", async (req, res, next) => {
    const { username } = req.body
    const { token } = req.headers
    try {
      const user = await usersMe(username, token);
      if(user) localStorage.setItem('token', JSON.stringify(user));
      console.log("products:", products)
      res.send({
        user: user
      });
    } catch (error) {
    }
});

module.exports = { usersRouter }