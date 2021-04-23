const express = require("express");
const router = express.Router();
const db = require("../db");


router.post("/",(req, res) => {
    const id = req.body.id;
    const status = req.body.status;
	db.query("UPDATE `images` SET `status` = ? WHERE id = ?",[status-1, id], (err, result) => {
		if (err) {
			res.send({ err: err });
		} else if (result) {
			res.send(result);
		}
	});
});

module.exports = router;