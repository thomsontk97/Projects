//--------------------------------------------------------------------------------------------
//Edit Names Function
function editProfile(ev) {
  //   ev.preventDefault();

  var fName = document.getElementById("profile-fname").value;
  var lName = document.getElementById("profile-lname").value;

  var currentUserJSON = localStorage.getItem("CurrentUser");
  var currUser = JSON.parse(currentUserJSON);

  var usersArrJson = localStorage.getItem("Users");
  var usersArr = JSON.parse(usersArrJson);

  //   var editObj = {};

  usersArr.forEach((user) => {
    if (user.Email === currUser.Email) {
      //   editObj = {
      //     Name: `${fName} ${lName}`,
      //     Email: user.Email,
      //     Password: user.Password,
      //   };

      user.Name = `${fName} ${lName}`;

      currUser = {
        Name: `${fName} ${lName}`,
        Email: user.Email,
        Password: user.Password,
        Token: user.Token,
      };
    }
  });

  //   usersArr.push(editObj);

  //   localStorage.removeItem("Users");
  localStorage.setItem("Users", JSON.stringify(usersArr));
  localStorage.setItem("CurrentUser", JSON.stringify(currUser));

  console.log("Obj", currUser);
  console.log("Arr", usersArr);
}

//-------------------------------------------------------------------------------------------------
//Edit password
function editPassword(ev) {
  //   ev.preventDefault();

  var oldPass = document.getElementById("old-pass").value;
  var newPass = document.getElementById("new-pass").value;
  var cnfrmNewPass = document.getElementById("cnfrm-new-pass").value;

  var currentUserJSON = localStorage.getItem("CurrentUser");
  var currUser = JSON.parse(currentUserJSON);

  var usersArrJson = localStorage.getItem("Users");
  var usersArr = JSON.parse(usersArrJson);

  if (currUser.Password != oldPass) {
    alert("Incorrect password");
  } else if (newPass != cnfrmNewPass) {
    alert("New Passwords do not match");
  } else {
    usersArr.forEach((user) => {
      if (user.Email === currUser.Email) {
        user.Password = newPass;

        currUser = {
          Name: user.Name,
          Email: user.Email,
          Password: newPass,
          Token: user.Token,
        };
      }
    });

    localStorage.setItem("Users", JSON.stringify(usersArr));
    localStorage.setItem("CurrentUser", JSON.stringify(currUser));

    console.log("Obj", currUser);
    console.log("Arr", usersArr);
  }
}

//------------------------------------------------------------------------------------------------------
//Logout
function logout(ev) {
  ev.preventDefault();
  window.location.replace("../index.html");
  localStorage.removeItem("CurrentUser");
}

//-----------------------------------------------------------------------------------------------
//Home
function goHome(ev) {
  ev.preventDefault();
  window.location.replace("../shop/index.html");
}
//----------------------------------------------------------------------------------------------
document.getElementById("btn-profile").addEventListener("click", editProfile);
document
  .getElementById("btn-edit-pass")
  .addEventListener("click", editPassword);
document.getElementById("log-out").addEventListener("click", logout);
document.getElementById("home").addEventListener("click", goHome);
