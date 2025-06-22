//get total news, ads, users, visits present in the database and not deleted
const SiteRecord = require("../models/siteRecordsModel");

const getTotalSiteRecords = async (req, res) => {
  try {
    // Aggregate totals from all SiteRecord documents
    const totals = await SiteRecord.aggregate([
      {
        $group: {
          _id: null,
          totalUsers: { $sum: "$totalUsers" },
          totalNews: { $sum: "$totalNews" },
          totalAds: { $sum: "$totalAds" },
          siteVisits: { $sum: "$siteVisits" },
        },
      },
    ]);

    const result = totals[0] || {
      totalUsers: 0,
      totalNews: 0,
      totalAds: 0,
      siteVisits: 0,
    };

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching site records:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getTotalSiteRecords };

