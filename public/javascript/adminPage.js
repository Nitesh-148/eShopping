
var productDetails = {};
var readProductDetails = () => {
    productDetails.id = Math.round(Math.random() * 100)
    productDetails.title = $("#title").val();
    productDetails.price = $("#price").val();
    productDetails.category = $("#category").val();
    productDetails.description = $("#description").val();

    console.log(productDetails);
    sendDataToserver(productDetails);

} 

var sendDataToserver = (pData) => {
    axios.post("/add/productData", pData).then((response) => {
        console.log(response);
        if(response.data.msg == 'Added')
        {
            $("#statusMsg").text("Product added successfully");
        }
    })
}

  var uploadProductImage = () => {
    let uploadfile = $("input[name= prodImage]")[0].files[0] // taking file from input
    let formData = new FormData(); // formData is the object using which we bind the file information. 
    formData.append("prodImage", uploadfile);

    var imageUploadReq = $.ajax({
        url: '/upload/resourceImage',
        type: 'POST',
        data: formData,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        dataType: 'JSON',
        success: (response) => {
        console.log("Response");
        console.log(response); 
        productDetails.image = response.file_path;
         
        }
    });
  }