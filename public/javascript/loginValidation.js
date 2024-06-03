


var validateUserCredentials = () => {
    var accountDetails = {};
    accountDetails.accountId = $("#accountId").val();
    accountDetails.accountpwd = $("#accountpass").val();

// axious using get method
// axios({
//     method: 'GET',
//     url: 'http://localhost:3080/userLoginData/validate',
//     params: accountDetails
//   }).then((response) => {
//       console.log(response);
//     }).catch(() => {

//     })

var isChecked = document.querySelector("#rememberCredentials").checked;
if(isChecked)
{
  localStorage.setItem("userLoginDetails", JSON.stringify(accountDetails));
}
else{
  localStorage.removeItem("userLoginDetails");
}

axios({
        method: 'POST',
        url: 'http://localhost:3080/userLoginData/validate',
        data: accountDetails // when use 'POST' use data instead params.
    
      }).then((response) => {
          console.log(response);
          if(response.data.msg == 'Valid')
          {
            if(response.data.isAdmin)
            {
              loadSelectedPage('adminPage');
            }
            else{
            loadSelectedPage('productDetailsPage');
            }
          }
          else{ 
            $('.invalidCredentials').show();
          }
        }).catch((error) => {
          console.log(error);
    
        })
}