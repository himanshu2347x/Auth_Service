const UserRepository = require("../repository/user-repository");
var jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/serverConfig");
const bcrypt = require("bcrypt");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("something went wrong in the service layer");
      throw error; // Directly throwing the error
    }
  }

  async signIn(email, plainPassword) {
    try {
      const user = await this.userRepository.getUserByEmail(email); // Add await here
      console.log(user);
      const passwordsMatch = await this.checkPassword(
        plainPassword,
        user.password
      ); // Add await here

      if (!passwordsMatch) {
        console.log("password doesnt match");
        throw new Error("incorrect password"); // Throw an Error object
      }
      //if match then create token
      const jwtToken = this.createToken({
        email: user.email,
        id: user.id,
      });
      return jwtToken;
    } catch (error) {
      console.log("something went wrong in signin process");
      throw error; // Directly throwing the error
    }
  }

  async isAuthenticated(token) {
    try {
      const response = await this.verifyToken(token);
      if (!response) {
        throw new Error("invalid token"); // Throw an Error object
      }
      const user = await this.userRepository.getById(response.id);
      if (!user) {
        throw new Error("No user found with this token id"); // Throw an Error object
      }
      return user.id;
    } catch (error) {
      console.log("something went wrong in auth process");
      throw error; // Directly throwing the error
    }
  }

  async checkPassword(plainPassword, encryptedPassword) {
    try {
      return await bcrypt.compare(plainPassword, encryptedPassword); // Add await here
    } catch (error) {
      console.log("password didnt match");
      throw error; // Directly throwing the error
    }
  }

  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "1d" });
      return result;
    } catch (error) {
      console.log("Something went wrong in token creation");
      throw error; // Directly throwing the error
    }
  }

  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("token is not valid");
      throw error; // Directly throwing the error
    }
  }
}

module.exports = UserService;
