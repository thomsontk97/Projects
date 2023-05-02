// Write your script here
var users = [];
//Main Functions
//----------------------------------------------------------------------------------------------
// 1.Checking Signup Form Details
function checkDetails(ev) {
  ev.preventDefault();

  if (localStorage.getItem("Users")) {
    users = JSON.parse(localStorage.getItem("Users"));
  }

  var firstName = document.getElementById("first-name").value;
  var lastName = document.getElementById("last-name").value;
  var email = document.getElementById("email").value;
  var pass = document.getElementById("pass").value;
  var passCnfrm = document.getElementById("pass-cnfrm").value;

  console.log(firstName, lastName, email, pass, passCnfrm);

  //1.1. checking for empty fields and if the passwords are same
  if (!firstName || !lastName || !email || !pass || !passCnfrm) {
    alert("Please fill all the fields");
  } else if (pass != passCnfrm) {
    alert("Passwords do not match");
  } else if (duplicateEmail(email)) {
    //1.2.Checking for duplicate email id
    alert("Email already in use");
  } else {
    //1.3. Creating an new Object for the new user details
    var newUser = {
      Name: `${firstName} ${lastName}`,
      Email: email,
      Password: pass,
    };

    //1.4. Adding new user Obj to an Array
    users.push({
      Name: `${firstName} ${lastName}`,
      Email: email,
      Password: pass,
    });

    //1.5. Adding users Array to Local Storage
    // after Converting Array to JSON
    localStorage.setItem("Users", JSON.stringify(users));

    // ev.preventDefault();
    //1.6. Redirecting to Login Page
    window.location.replace("/profile/login.html");
  }
}

//Sub Functions
//----------------------------------------------------------------------------------------------------------
//(i) Checking if the user email already exists
function duplicateEmail(email) {
  if (localStorage.getItem("Users")) {
    var usersArrJson = localStorage.getItem("Users");
    var usersArr = JSON.parse(usersArrJson);

    console.log(usersArr, email);

    var ans = false;
    usersArr.forEach((user) => {
      if (user.Email === email) {
        console.log(user.Email, email, "hello");
        ans = true;
      }
    });

    return ans;
  }
}

//-------------------------------------------------------------------------------------------------
//Login

//Events
//---------------------------------------------------------------------------------------------------
//(a).Signup Event
var btnSignup = document.getElementById("btn-signup");
btnSignup.addEventListener("click", checkDetails);
