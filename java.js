const header = document.querySelector("header");

window.addEventListener ("scroll", function(){
    header.classList.toggle ("sticky", this.window.scrollY > 0);
})

let menu = document.querySelector('#menu-icon');
let navmenu = document.querySelector('.navmenu');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navmenu.classList.toggle('open');
}

const productsMenuItem = document.getElementById('products');
const productsSubMenu = productsMenuItem.querySelector('.submenu');

productsMenuItem.addEventListener('click', function(event) {
  event.preventDefault();
  productsMenuItem.classList.toggle('active');
});








document.addEventListener("DOMContentLoaded", () => {
  const categoryContainer = document.getElementById("categoryContainer");

  // Fetch and create category buttons
  fetchCategories().then(categories => {
      categories.forEach(category => {
          const button = document.createElement("button");
          button.textContent = category;
          button.className = "category-button";
          button.addEventListener("click", () => fetchProductsByCategory(category));
          categoryContainer.appendChild(button);
      });

      // Load products of the first category initially
      const initialCategory = categories[0];
      fetchProductsByCategory(initialCategory);
  });
});

async function fetchCategories() {
  try {
      const response = await fetch("https://fakestoreapi.com/products/categories");
      const categories = await response.json();
      return categories;
  } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
  }
}

async function fetchProductsByCategory(category) {
  try {
      const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
      const data = await response.json();

      const productContainer = document.getElementById("productContainer");
      productContainer.innerHTML = ""; // Clear existing content

      data.forEach(product => {
          const productItem = document.createElement("div");
          productItem.className = "product-item";

          const productImage = document.createElement("img");
          productImage.src = product.image;
          productImage.alt = product.title;

          const productName = document.createElement("h3");
          productName.textContent = product.title;

          const productDescription = document.createElement("p");
          productDescription.textContent = product.description;

          productItem.appendChild(productImage);
          productItem.appendChild(productName);
          productItem.appendChild(productDescription);

          productContainer.appendChild(productItem);
      });
  } catch (error) {
      console.error("Error fetching products:", error);
  }
}

