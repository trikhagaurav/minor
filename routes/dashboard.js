const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");

router.post("/", authorize, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT first_name,middle_name,last_name FROM patient WHERE patient_id = $1",
      [req.user.id] 
    ); 
    var f_name=user.rows[0].first_name;
    var m_name=user.rows[0].middle_name;
    var l_name=user.rows[0].last_name;
    console.log(f_name);
    console.log(m_name);
    console.log(l_name);
    var ret_name;
    if(m_name==""){
      ret_name=f_name+" "+l_name;
    }
    else{
      ret_name=f_name+" "+m_name+" "+l_name;
    }
    user_name={
      "name": ret_name
    }
    res.json(user_name);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;