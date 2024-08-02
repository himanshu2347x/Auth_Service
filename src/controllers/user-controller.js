const UserService = require("../services/user-service");

const userService = new UserService();
const create = async (req, res) => {
  try {
    const response = await userService.create({
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(201).json({
      success: true,
      data: response,
      message: "successfully created a new user",
      err: {},
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "something went wrong",
      data: {},
      success: false,
      err: error,
    });
  }
};

const Signin = async (req, res) => {
  try {
    const response = await userService.signIn(req.body.email, req.body.password);
    return res.status(200).json({
      success: true,
      data: response,
      message: "succesfully signed in ",
      error:{},
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      data: {},
      message: "Could not sign in",
      err:error
    })
  }
};

const isAuthenticated = async (req, res) => {
  try {
    const token = req.headers['x-access-token'];
    const response = await userService.isAuthenticated(token);
    return res.status(201).json({
      data: response,
      success: true,
      error: {},
      message:"user is authenticated"
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      err: error,
      success: false,
      message:'token is invalid user is not authenticated'
    })
  }
}

module.exports = {
  create,
  Signin,
  isAuthenticated
};
