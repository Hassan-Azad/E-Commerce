function fetchData() {
  fetch('https://fakestoreapi.com/products/')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      // Process the fetched data here
      displayProducts(data);
      // get category 
      var categories = getCategories(data);
        console.log(categories)
        renderCategories(categories);
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('Error:', error);
    });
}

// render categegories data 
function renderCategories(categories) {
  var categoryList = document.getElementById('categoryList');

  // Iterate over the categories array and create checkbox elements
  categories.forEach(category => {
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = category;
    categoryList.appendChild(checkbox);

    var label = document.createElement('label');
    label.setAttribute('for', category);
    label.textContent = category;
    categoryList.appendChild(label);

    var lineBreak = document.createElement('br');
    categoryList.appendChild(lineBreak);
  });
}



function getCategories(products) {
  var categories = [];

  // Iterate over the products and extract unique categories
  products.forEach(product => {
    var category = product.category;
    if (!categories.includes(category)) {
      categories.push(category);
    }
  });

  return categories;
}
function displayProducts(products) {
  var productList = document.getElementById('productList');

  // Iterate over the products array and create product elements
  products.forEach(product => {
  
    var productElement = createProductElement(product);
    productList.appendChild(productElement);
  });
}

function createProductElement(product) {
  var productElement = document.createElement('div');
  productElement.classList.add('col1');

  var imageElement = document.createElement('img');
  imageElement.src = product.image;
  productElement.appendChild(imageElement);

  var nameElement = document.createElement('h4');
  nameElement.style.textAlign = 'center';
  nameElement.id = 'product_name';
  nameElement.textContent = product.title.substring(0, 20) + '...';
  ;
  productElement.appendChild(nameElement);

  var ratingElement = document.createElement('p');
  var ratingStarElement = document.createElement('span');
  ratingStarElement.innerHTML = '&#9733;&#9733;&#9733;&#9733;&#9733;';
  ratingElement.appendChild(ratingStarElement);
  productElement.appendChild(ratingElement);

  var priceElement = document.createElement('h4');
  priceElement.style.textAlign = 'center';
  priceElement.style.marginTop = '0.1rem';
  priceElement.style.paddingBottom = '0.2rem';
  priceElement.id = 'product_price';
  priceElement.textContent = 'Price: $' + product.price;
  productElement.appendChild(priceElement);

  var addButton = document.createElement('button');
  addButton.type = 'button';
  addButton.textContent = 'Add To Cart';
  addButton.addEventListener('click', function() {
    showProductDetails(product);
  });
  productElement.appendChild(addButton);

  return productElement;
}
function showProductDetails(product) {
  var productDetails = document.getElementById('productDetails');
  productDetails.innerHTML = '';

  var productElement = createProductElement(product);
  productElement.classList.remove('col1');
  productElement.style.margin = '0 auto';
  productDetails.appendChild(productElement);

  productDetails.style.display = 'block';
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
}
// Fetch data on page load
fetchData();
