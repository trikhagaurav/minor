module.exports = function(req, res, next) {
    const {  first_name, middle_name, last_name, mobile_number, phone_number, date_of_birth, blood_group, house_number, street, city, pincode, state, gender, username, password } = req.body;
  
    if (req.path === "/register") {
      //console.log(!patient_id.length);
      if (![ first_name, last_name, mobile_number, phone_number, date_of_birth, blood_group, house_number, street, city, pincode, state, gender, username, password].every(Boolean)) {
        return res.json("Missing Credentials");
      } 
      if(mobile_number.length<13||mobile_number.length>14){
        return res.json("Invalid mobile number");
      }
      if(phone_number.length!=11){
        return res.json("Invalid phone number");
      }
      if(blood_group.length<2||blood_group.length>3||(blood_group.charAt(blood_group.length-1)!='+'&&(blood_group.charAt(blood_group.length-1)!='-'))){
        return res.json("Invalid blood group");
      }
      if(pincode.length!=6){
        return res.json("Invalid pincode");
      }
      if(gender.length!=1||(gender!='M'&&gender!='F'&&gender!='O')){
        return res.json("Invalid gender");
      }
      if(username.length>10){
        return res.json("Username is too long.");
      }
      var reg= /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      if(!reg.test(password)){
        return res.json("Password must contain a digit and a special character");
      }
    } else if (req.path === "/login") {
      if (![username, password].every(Boolean)) {
        return res.json("Missing Credentials");
      } 
    }
  
    next();
  };