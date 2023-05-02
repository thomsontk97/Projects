var currentUser = {};

//-------------------------------------------------------------------------------------------------------
//Generating a random string

function randomToken() {
  var chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()+-./:;<=>?@[]{}|\\";
  var token = "";
  for (var i = 0; i < 16; i++) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
}

//--------------------------------------------------------------------------------------------------
// 2.Verifying the User details
function verifyDetails(ev) {
  ev.preventDefault();

  var loginEmail = document.getElementById("login-email").value;
  var loginPass = document.getElementById("login-pass").value;

  var usersArrJson = localStorage.getItem("Users");
  var usersArr = JSON.parse(usersArrJson);

  console.log(usersArr);

  usersArr.forEach((user) => {
    if (loginEmail != user.Email && loginPass != user.Password) {
      // alert("Invalid Email and Password");
    } else {
      var token = randomToken();

      currentUser = {
        Name: user.Name,
        Email: user.Email,
        Password: user.Password,
        Token: token,
      };

      localStorage.setItem("CurrentUser", JSON.stringify(currentUser));
      console.log(currentUser);

      window.location.replace("../shop/index.html");
    }
  });
}

//-------------------------------------------------------------------------------------------------------
//(b).Login Event
var btnLogin = document.getElementById("btn-login");
btnLogin.addEventListener("click", verifyDetails);
