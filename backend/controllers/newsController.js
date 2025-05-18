const News = require("../models/newsModel");
const NepaliDate = require("nepali-date");
const striptags = require("striptags");

const createNews = async (req, res) => {
  const {
    heading,
    description,
    image,
    isBreaking,
    isFeatured,
    category,
    author,
  } = req.body;
  const Np = new NepaliDate();
  const npDate = Np.format("YYYY-MM-DD");
  const plainText = striptags(heading);

  try {
    const news = await News.create({
      heading: plainText,
      description,
      image,
      isBreaking,
      isFeatured,
      category,
      npDate,
      author,
      createdBy: req.user._id,
    });
    const toSend = {
      id: news._id,
      heading: news.heading,
      description: news.description,
      image: news.image,
      author: news.author,
      isBreaking: news.isBreaking,
      isFeatured: news.isFeatured,
      npDate: news.npDate,
      category: news.category,
      createdAt: news.createdAt,
      updatedAt: news.updatedAt,
    };

    res.status(201).json({
      success: true,
      message: "News created successfully",
      news: toSend,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getFeaturedNews = async (req, res) => {
  try {
    const news = await News.find({ isFeatured: true, isDeleted: false })
      .populate("category")
      .sort({ createdAt: -1 })
      .limit(3); // Fetch only the top 3 featured news

    const toSend = news.map((news) => ({
      id: news._id,
      heading: news.heading,
      description: news.description,
      image: news.image,
      isBreaking: news.isBreaking,
      npDate: news.npDate,
      views: news.views,
      category: news.category,
    }));

    res.status(200).json({
      success: true,
      message: "Featured News fetched successfully",
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

const getAllNews = async (req, res) => {
  try {
    const news = await News.find({ isDeleted: false }).populate("category");
    const toSend = {
      news: news.map((news) => ({
        id: news._id,
        heading: news.heading,
        description: news.description,
        image: news.image,
        isBreaking: news.isBreaking,
        npDate: news.npDate,
        views: news.views,
        category: news.category,
        createdAt: news.createdAt,
      })),
    };
    // const recentNews = News.find({ isDeleted: false })
    //   .populate("category")
    //   .sort({ createdAt: -1 })
    //   .limit(4);

    // const toSendRecentNews = recentNews.map((news) => ({
    //   id: news._id,
    //   heading: news.heading,
    //   image: news.image,
    // }));

    const topTechNews = await News.find({
      isDeleted: false,
      isFeatured: false,
      category: "6810ad8d98bf251c0c79b742",
    })
      .populate("category")
      .sort({ createdAt: -1 })
      .limit(1);

    // if(!topTechNews){
    //   topTechNews = await News.find({
    //     isDeleted: false,
    //     isFeatured:false,
    //     category: "6810ad8d98bf251c0c79b742",
    // })
    // .populate("category")
    // .sort({ createdAt: -1 })
    // .limit(1);
    // }
    const toSendTopTechNews = topTechNews.map((news) => ({
      id: news._id,
      heading: news.heading,
      description: news.description,
      image: news.image,
      isBreaking: news.isBreaking,
      npDate: news.npDate,
      views: news.views,
      category: news.category,
      createdAt: news.createdAt,
    }));
    res.status(200).json({
      success: true,
      message: "News fetched successfully",
      data: toSend,
      topTechNews: toSendTopTechNews,
      // recentNews: toSendRecentNews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getNewsById = async (req, res) => {
  const { id } = req.params;
  try {
    const news = await News.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { $inc: { views: 1 } },
      { new: true, runValidators: true }
    ).populate("category");
    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }
    const toSend = {
      id: news._id,
      heading: news.heading,
      description: news.description,
      image: news.image,
      isBreaking: news.isBreaking,
      views: news.views,
      npDate: news.npDate,
      category: news.category,
      createdAt: news.createdAt,
      updatedAt: news.updatedAt,
    };
    res.status(200).json({
      success: true,
      message: "News fetched successfully",
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

const updateNews = async (req, res) => {
  const { id } = req.params;
  const { heading, description, image, isBreaking, npDate, category } =
    req.body;
  try {
    const news = await News.findByIdAndUpdate(
      id,
      {
        heading,
        description,
        image,
        isBreaking,
        npDate,
        category,
        updatedBy: req.user._id,
        updatedAt: Date.now(),
      },
      { new: true }
    );
    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }
    const toSend = {
      id: news._id,
      heading: news.heading,
      description: news.description,
      image: news.image,
      isBreaking: news.isBreaking,
      npDate: news.npDate,
      category: news.category,
      createdAt: news.createdAt,
      updatedAt: news.updatedAt,
    };
    res.status(200).json({
      success: true,
      message: "News updated successfully",
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

const deleteNews = async (req, res) => {
  const { id } = req.params;
  try {
    const news = await News.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
        updatedBy: req.user._id,
        updatedAt: Date.now(),
      },
      { new: true }
    );
    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "News deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getNewsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    // Fetch all news in the category
    const allNews = await News.find({
      category: categoryId,
      isDeleted: false,
    }).populate("category");

    if (!allNews || allNews.length === 0) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    // Fetch the 5 most recent news in the category
    const recentNews = await News.find({
      category: categoryId,
      isDeleted: false,
    })
      .populate("category")
      .sort({ createdAt: -1 })
      .limit(5);

    if (!recentNews || recentNews.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Recent news not found",
      });
    }

    // Filter out recent news from all news
    const recentNewsIds = recentNews.map((news) => news._id.toString());
    const filteredNews = allNews.filter(
      (news) => !recentNewsIds.includes(news._id.toString())
    );

    // Prepare the response
    const toSend = {
      news: filteredNews.map((news) => ({
        id: news._id,
        heading: news.heading,
        description: news.description,
        image: news.image,
        isBreaking: news.isBreaking,
        npDate: news.npDate,
        category: news.category,
        createdAt: news.createdAt,
        updatedAt: news.updatedAt,
      })),
      recentNews: recentNews.map((news) => ({
        id: news._id,
        heading: news.heading,
        image: news.image,
        description: news.description,
        npDate: news.npDate,
      })),
    };

    res.status(200).json({
      success: true,
      message: "News fetched successfully",
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

const mostViewedNews = async (req, res) => {
  try {
    const news = await News.find({ isDeleted: false })
      .populate("category")
      .sort({ views: -1 })
      .limit(5);
    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }
    const toSend = {
      news: news.map((news) => ({
        id: news._id,
        heading: news.heading,
        description: news.description,
        image: news.image,
        npDate: news.npDate,
        views: news.views,
        category: news.category,
      })),
    };
    res.status(200).json({
      success: true,
      message: "News fetched successfully",
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

module.exports = {
  createNews,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNews,
  getNewsByCategory,
  getFeaturedNews,
  mostViewedNews,
};
