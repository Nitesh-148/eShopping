
var productDataTemplate;
var productDataList = [];

var getProductDetails = (categoryType) => {
    var dataApi = '/get/productDetails';
    var data = {};
    if(categoryType)
    {
        data.categoryType = categoryType;
    }
    axios ({
        method: 'GET',
        url: dataApi, 
           params: {
             data: data
           }
    }).then((response) => {
        console.log(response);
        productDataList = response.data;
        showProductsData(categoryType)
    }).catch((error) => {
        console.error(error);
    })
}

 /* var showProductsData =() =>{
     for (var i = 0; i< productDataList.length; i++)
     {
        var pTemplate = productDataTemplate(productDataList[i]);
        $(".productDetailsContainer").append(pTemplate);
     }
} */

var showProductsData = (categoryType) => {
    // Clear previous products
    $(".productDetailsContainer").empty();

    // Filter products based on categoryType if available
    var filteredProducts = categoryType ? productDataList.filter(product => product.category === categoryType) : productDataList;

    // Render filtered products
    filteredProducts.forEach(product => {
        var pTemplate = productDataTemplate(product);
        $(".productDetailsContainer").append(pTemplate);
    });
}


var getProductTemplate = () => {
    axios({
        method: 'GET',
        url: 'templates/singleProductData.htm'
    }).then((responseTemplate) => {
        console.log(responseTemplate);
        productDataTemplate  = Handlebars.compile(responseTemplate.data);
    }).catch((error) => {
        console.error(error);
    }); 
}

var PrductDetails = () => {
    alert("Page under construction");
}

var addProductToCart = (productId) => {
    alert("Page under construction");
}

getProductTemplate();

var getCategoryProducts = (categoryType) => {
    getProductDetails(categoryType);
}