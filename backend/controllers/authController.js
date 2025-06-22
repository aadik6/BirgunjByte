const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const signup = async (req, res) => {
  const { firstName, lastName, userName, email, avatar, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS) || 12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const user = await UserModel.create({
      firstName,
      lastName,
      userName,
      email,
      avatar,
      password: hashedPassword,
    });

    // Create payload for JWT
    const payLoad = {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
    };

    // Generate access and refresh tokens
    const accessToken = jwt.sign(payLoad, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payLoad, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Save refresh token to the user
    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    // Send response
    res.status(201).json({
      success: true,
      message: "User created successfully",
      accessToken,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    // Create payload for JWT
    const payLoad = {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
    };
    // Generate access and refresh tokens
    const accessToken = jwt.sign(payLoad, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payLoad, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // Save refresh token to the user
    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    // Send response
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      accessToken,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "No refresh token found",
      });
    }
    const user = await UserModel.findOne({ refreshToken });
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }
    user.refreshToken = null;
    await user.save();
    res.clearCookie("refreshToken");
    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  }catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}

const update = async (req, res) => {
  const { firstName, lastName, userName, email, avatar } = req.body;
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.userName = userName || user.userName;
    user.email = email || user.email;
    user.avatar = avatar || user.avatar;

    await user.save();
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { id } = req.params;
  try {
    const user = UserModel.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS) || 12);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//admin actions

const createUserByAdmin = async (req, res) => {
  const { firstName, lastName, userName, role, email, avatar, password } =
    req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS) || 12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const user = await UserModel.create({
      firstName,
      lastName,
      userName,
      email,
      avatar,
      role,
      password: hashedPassword,
      createdBy: req.user.id,
      createdAt: Date.now(),
    });

    // Send response
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const updateUserByAdmin = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, userName, email, avatar, role } = req.body;
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.userName = userName || user.userName;
    user.email = email || user.email;
    user.avatar = avatar || user.avatar;
    user.role = role || user.role;
    user.updatedBy = req.user.id;
    user.updatedAt = Date.now();

    await user.save();
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select(
      "-password -refreshToken"
    );
    if (!users) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }
    const userList = users.map((user) => ({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
    }));
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: userList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id).select("-password -refreshToken");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const refreshToken = async (req, res) => {
  const {refreshToken} = req.cookies;
  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "Refresh token is required",
    });
  }
  try {
    const user = await userModel.findOne({ refreshToken });
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "forbidden",
      });
    }
    jwt.verify(refreshToken, process.env.JWT_SECRET, async(err, decoded) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "forbidden",
        });
      }
      const payLoad = {
        user: {
          id: decoded.user.id,
          firstName: decoded.user.firstName,
          lastName: decoded.user.lastName,
          userName: decoded.user.userName,
          email: decoded.user.email,
          avatar: decoded.user.avatar,
          role: decoded.user.role,
        },
      };
      const accessToken = jwt.sign(payLoad, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      const newRefreshToken = jwt.sign(payLoad, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      user.refreshToken = newRefreshToken;
      await user.save();
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      });

      res.status(200).json({
        success: true,
        message: "Access token generated successfully",
        accessToken,
      });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};
module.exports = {
  signup,
  login,
  logout,
  update,
  refreshToken,
  updatePassword,
  createUserByAdmin,
  updateUserByAdmin,
  getAllUsers,
  getUserById,
};
