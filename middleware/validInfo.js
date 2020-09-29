module.exports = function(req, res, next) {
    const {  name, mob_no, dob, blood_grp, house_no, street, city, state, record_id, gender, username, password } = req.body;
  
    /*function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }*/
  
    if (req.path === "/register") {
      //console.log(!patient_id.length);
      if (![ name, mob_no, dob, blood_grp, house_no, street, city, state, record_id, gender, username, password].every(Boolean)) {
        return res.json("Missing Credentials");
      } /*else if (!validEmail(email)) {
        return res.json("Invalid Email");
      }*/
    } else if (req.path === "/login") {
      if (![username, password].every(Boolean)) {
        return res.json("Missing Credentials");
      } /*else if (!validEmail(email)) {
        return res.json("Invalid Email");
      }*/
    }
  
    next();
  };