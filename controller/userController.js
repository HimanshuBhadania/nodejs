const User = require("../model/usermodel");

exports.getUsers = async (req, res) => {
  try {
    const extraFilds = ["sort", "page", "limit", "fields"];
    const queryObj = { ...req.query };

    extraFilds.forEach((field) => delete queryObj[field]);
    const query = JSON.stringify(queryObj);
    const newqueryObj = JSON.parse(
      query.replace(/\b(gte|gt|lte|lt)\b/, (match) => `$${match}`)
    );

    let response = User.find(newqueryObj);

    if (req.query.sort) {
      const soryBy = req.query.sort.split(",").join(" ");
      response = response.sort(soryBy);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      response = response.select(fields);
    }
    response = response.select("-__v");

    const page = req.query.page*1 || 1;
    const limit = req.query.limit*1 || 10;
    const skip = (page - 1) * limit;

    response = response.skip(skip).limit(limit);

    if (req.query.page) {
      const noOfUser = await User.countDocuments();
      if (skip >= noOfUser) {
        throw new Error("this page is not found");
      }
    }

    const users = await response;

    res
      .status(200)
      .json({ status: "success", length: users.length, data: { users } });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err.message });
  }
};

exports.addUser = async (req, res) => {
  try {
    const userData = await User.create(req.body);
    res.status(200).json({ status: "success", data: { user: userData } });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({ status: "success", data: { user } });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err.message });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.status(204).json({ status: "success", data: null });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ status: "success", data: { user: updatedUser } });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err.message });
  }
};
