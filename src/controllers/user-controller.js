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
      err: error
    });
  }
};

module.exports = {
    create
}
