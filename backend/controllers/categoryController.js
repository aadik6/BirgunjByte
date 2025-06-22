const categoryModel = require("../models/categoryModel");

const createCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const category = await categoryModel.create({
      name,
      description,
    });
    const toSend = {
        id: category._id,
        name: category.name,
        description: category.description,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
    };
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: toSend,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find({ isDeleted: false });
    const toSend = {
      categories: categories.map((category) => ({
        id: category._id,
        name: category.name,
        description: category.description,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      })),
    };
    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: toSend,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const updateCategory = async (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;

  try {
    const category = await categoryModel.findByIdAndUpdate(
      id,
      {
        name,
        description,
        updatedAt: Date.now(),
      },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Category updated successfully",
        data: category,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { isDeleted: true, updatedAt: Date.now() },
      { new: true }
    );
    if (!category) {
      res.status(404).json({
        success: false,
        message: "Category not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Category deleted successfully",
        data: category,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
