

var loadSelectedPage = (type) => {
  var templateUrl;
  switch(type) {
      case 'login':
          templateUrl = 'templates/login.htm';
          break;
      case 'forgotPassword': 
          templateUrl = 'templates/forgotPassword.htm';
          break;
      case 'signup':
          templateUrl = 'templates/signup.htm';
          break;
      case 'productDetailsPage':
          templateUrl = 'templates/productDetailsPage.htm';
          break;
      case 'adminPage':
          templateUrl = 'templates/adminPage.htm';
          break;

  }

  loadFileData(templateUrl, type);
}

var loadFileData = (templateUrl, type) => {
  axios.get(templateUrl)
.then(function (response) {
  $('main').html(response.data);
  if(type == 'productDetailsPage'){
    getProductDetails();
  } 
  else if(type == 'login')
  {
    if(localStorage.getItem("userLoginDetails") != null)
    {
      var userDetails = JSON.parse(localStorage.getItem("userLoginDetails"));
      $("#accountId").val(userDetails.accountId);
      $("#accountpass").val(userDetails.accountpwd);
      $('#rememberCredentials').prop('checked', true);
    }
  }
})
.catch(function (error) {
  console.log(error);
})
.finally(function () {
  // always executed
});
}

axios.get("/ckeck/isLoggedIn").then((response) => {
   if(response.data && response.data.isUserLoggedIn)
   {
    loadSelectedPage('productDetailsPage');
   }
   else{
      loadSelectedPage('login');
   }
});


loadSelectedPage('login');

var registerNewUser = () => {
  var userLoginDetails = {};
  userLoginDetails.accountId = $("#accountId").val();
  userLoginDetails.accountpwd = $("#accountpass").val();
  userLoginDetails.email = $("#email").val();
  console.log(userLoginDetails);

  axios.post("/new/user/signup", userLoginDetails).then((response) => {
        console.log("Successfully registered");
        console.log(response);
        if(response.data.msg == 'Data inserted successfully')
        {
          $(".successMsg").show();
        }
  }).catch((error) => {
    console.log('Error while registering',error);
 
  })
}
 var logoutUser = () => {
  axios.get("/user/logOut").then (() => {
    loadSelectedPage('login');
  })  
 }