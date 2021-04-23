const express = require("express");
const router = express.Router();
const db = require("../db");


router.get("/",(req, res) => {
	db.query("SELECT * FROM `images`", (err, result) => {
		if (err) {
			res.send({ err: err });
		} else if (result) {
			res.send(result);
		}
	});
});

module.exports = router;