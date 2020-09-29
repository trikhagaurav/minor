const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");

//authorizeentication

router.post("/register", validInfo, async (req, res) => {
  const { patient_id, name, mob_no, dob, blood_grp, house_no, street, city, state, record_id, gender, username, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM patient WHERE username = $1", [
      username
    ]);

    if (user.rows.length > 0) {
      return res.status(401).json("User already exist!");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    let newUser = await pool.query(
      `INSERT INTO patient ( name, mob_no, dob, blood_grp, address, record_id, gender, username, password) VALUES ( '${name}', '${mob_no}', '${dob}', '${blood_grp}',('${house_no}', '${street}', '${city}', '${state}'), null, '${gender}', '${username}', '${bcryptPassword}') RETURNING *`

    );
      console.log(newUser.rows[0].patient_id);
    const jwtToken = jwtGenerator(newUser.rows[0].patient_id);

    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/login", validInfo, async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM patient WHERE username = $1", [
      username
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }
    console.log(user.rows[0].patient_id);
    const jwtToken = jwtGenerator(user.rows[0].patient_id);
    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/verify", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;