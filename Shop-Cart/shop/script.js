// const produtc = {
//   id: 1,
//   title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//   price: 109.95,
//   description:
//     "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//   category: "men's clothing",
//   image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//   rating: { rate: 3.9, count: 120 },
// };

var products = [];
var myCart = [];
var url = "https://fakestoreapi.com/products";

// fetch(url)
//   .then((res) => res.json())
//   .then((data) => {
//     // console.log(data);

//     localStorage.setItem("Products", JSON.stringify(data));
//   });

// products = JSON.parse(localStorage.getItem("Products"));
// console.log("Produt", products);

async function getApiData() {
  document.getElementById("loader-container").style.display = "flex";

  try {
    const res = await fetch("https://fakestoreapi.com/products");
    products = await res.json();
    localStorage.setItem("Products", JSON.stringify(products));

    if (products) {
      showItems(products);
      console.log("Products::", products);
      //   document.getElementById("loader-container").style.display = "none";
    }
  } catch (e) {
    console.log("Error", e);
  }
}

//--------------------------------------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", (ev) => {
  getApiData();

  //   ev.preventDefault();
});

//-------------------------------------------------------------------------------------------
// Search Filter
document.getElementById("search").addEventListener("input", () => {
  var newArr = products.filter((item) =>
    item.title
      .toLowerCase()
      .includes(document.getElementById("search").value.trim().toLowerCase())
  );

  console.log(newArr);
  showItems(newArr);
});

//-------------------------------------------------------------------------------------------------
function showItems(products) {
  document.getElementById("main-items").innerHTML = "";
  let innerHtml = "";
  products.forEach((product) => {
    //    card.setAttribute("id", `${product.id}`);
    //     card.setAttribute("class", "card");

    const sizes = ["S", "M", "L", "XL"];
    const randomSize = Math.floor(Math.random() * sizes.length);

    const colors = ["red", "blue", "blueviolet", "black"];
    const randomColor = Math.floor(Math.random() * sizes.length);

    innerHtml += `
                <div class="card">
                <img src="${product.image}"/>
                <div class="title"><strong>${product.title}</strong></div>
                <div class="price">₹${product.price}</div>
                <div class="rating">Rating: ${product.rating.rate}</div>
                <div class="size size-${sizes[randomSize]}">${sizes[randomSize]}</div>
                <div class="color color-${colors[randomColor]}" style='background-color:${colors[randomColor]}'> </div>
                <button class="addToCart buttons" id="btn-${product.id}" onClick=addToCart(${product.id})>Add to Cart</button>
                </div>
                  `;
  });
  document.getElementById("main-items").innerHTML = innerHtml;
}
//----------------------------------------------------------------

var all = document.getElementById("all");
var mens = document.getElementById("mens");
var womens = document.getElementById("womens");
var jewellery = document.getElementById("jewellery");
var electronics = document.getElementById("electronics");

all.onclick = function () {
  all.classList.add("active");
  mens.classList.remove("active");
  womens.classList.remove("active");
  jewellery.classList.remove("active");
  electronics.classList.remove("active");

  var allProds = JSON.parse(localStorage.getItem("Products"));
  showItems(allProds);
};
mens.onclick = function () {
  all.classList.remove("active");
  mens.classList.add("active");
  womens.classList.remove("active");
  jewellery.classList.remove("active");
  electronics.classList.remove("active");

  var newArr = products.filter((item) =>
    item.category.includes("men's clothing")
  );

  console.log(newArr);
  showItems(newArr);
};
womens.onclick = function () {
  all.classList.remove("active");
  mens.classList.remove("active");
  womens.classList.add("active");
  jewellery.classList.remove("active");
  electronics.classList.remove("active");

  var newArr = products.filter((item) =>
    item.category.includes("women's clothing")
  );

  console.log(newArr);
  showItems(newArr);
};
jewellery.onclick = function () {
  all.classList.remove("active");
  mens.classList.remove("active");
  womens.classList.remove("active");
  jewellery.classList.add("active");
  electronics.classList.remove("active");

  var newArr = products.filter((item) => item.category.includes("jewelery"));

  console.log(newArr);
  showItems(newArr);
};
electronics.onclick = function () {
  all.classList.remove("active");
  mens.classList.remove("active");
  womens.classList.remove("active");
  jewellery.classList.remove("active");
  electronics.classList.add("active");

  var newArr = products.filter((item) => item.category.includes("electronics"));

  console.log(newArr);
  showItems(newArr);
};
//---------------------------------------------------------------------------------------------------
//Slider Ratings
var range = document.getElementById("range");

range.addEventListener("input", (ev) => {
  console.log(range.value);
  //Filter

  function checkRatings(item) {
    if (item.rating.rate >= range.value) {
      return item;
    }
  }

  var newArr = products.filter(checkRatings);

  console.log(newArr);
  showItems(newArr);
});

//-----------------------------------------------------------------------------------------------
//Price range

var p025 = document.getElementById("0-25");
p025.addEventListener("change", () => {
  if (p025.checked) {
    p2550.checked = false;
    p5010.checked = false;
    p100.checked = false;

    var newArr = products.filter((item) => {
      if (item.price >= 0 && item.price <= 25) {
        return item;
      }
    });

    console.log(newArr);
    showItems(newArr);
  } else {
    showItems(products);
  }
});

//25-50
var p2550 = document.getElementById("25-50");
p2550.addEventListener("change", () => {
  if (p2550.checked) {
    p025.checked = false;
    p5010.checked = false;
    p100.checked = false;

    var newArr = products.filter((item) => {
      if (item.price >= 25 && item.price <= 50) {
        return item;
      }
    });

    console.log(newArr);
    showItems(newArr);
  } else {
    showItems(products);
  }
});

//50-100
var p5010 = document.getElementById("50-100");
p5010.addEventListener("change", () => {
  if (p5010.checked) {
    p025.checked = false;
    p2550.checked = false;
    p100.checked = false;

    var newArr = products.filter((item) => {
      if (item.price >= 50 && item.price <= 100) {
        return item;
      }
    });

    console.log(newArr);
    showItems(newArr);
  } else {
    showItems(products);
  }
});

//100 on

var p100 = document.getElementById("100on");
p100.addEventListener("change", () => {
  if (p100.checked) {
    p025.checked = false;
    p2550.checked = false;
    p5010.checked = false;

    var newArr = products.filter((item) => {
      if (item.price > 100) {
        return item;
      }
    });

    console.log(newArr);
    showItems(newArr);
  } else {
    showItems(products);
  }
});

//Add to Cart
function addToCart(num) {
  var cartItem = {};
  products.forEach((product) => {
    if (product.id == num) {
      cartItem = product;
    }
  });

  console.log(cartItem);

  myCart.push(cartItem);
  console.log(myCart);

  alert("Item Added to your cart");
  localStorage.setItem("MyCart", JSON.stringify(myCart));
}
