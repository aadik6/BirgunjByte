const express = require('express');
const router = express.Router();
const { getTotalSiteRecords } = require('../controllers/SiteRecordController'); 

router.get('/total', getTotalSiteRecords);

module.exports = router;