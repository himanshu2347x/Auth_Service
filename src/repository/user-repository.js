const { User} = require('../models/index');
class UserRepository {
  async create(data) {
    try {
      const result = await User.create(data);
      return result;
    } catch (error) {
      console.log("something went wrong in the repository Layer");
      throw { error };
    }
  }

  async destroy(userId) {
    try {
      await User.destroy({
        where: {
          id: userId,
        },
      });
      return true;
    } catch (error) {
      console.log("something went wrong in the repository Layer");
      throw { error };
    }
  }

  async getById(userId) {
    try {
      const result = await User.findByPk(userId, {
        attributes: ["email", "id"],
      });
      return result;
    } catch (error) {
      console.log("something went wrong in the repository Layer");
      throw { error };
    }
  }
  async getUserByEmail(userEmail) {
    try {
      const user = await User.findOne({
        where: {
          email: userEmail,
        },
      });
      return user;
    } catch (error) {
      console.log("Something went wrong on repository layer");
      throw error;
    }
  }
}
module.exports = UserRepository;