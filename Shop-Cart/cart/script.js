var cartArr = JSON.parse(localStorage.getItem("MyCart"));
console.log(cartArr);

//---------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------
//Cart List
function cartList() {
  document.getElementById("items-list").innerHTML = "";
  let innerHtml = "";
  cartArr.forEach((cart) => {
    const sizes = ["S", "M", "L", "XL"];
    const randomSize = Math.floor(Math.random() * sizes.length);

    const colors = ["red", "blue", "blueviolet", "black"];
    const randomColor = Math.floor(Math.random() * sizes.length);

    innerHtml += `
                <div class="card">
                <img src="${cart.image}"/>
                <div class="title"><strong>${cart.title}</strong></div>
                <div class="price">₹${cart.price}</div>
                <div class="rating">Rating: ${cart.rating.rate}</div>
                <div class="size size-${sizes[randomSize]}">${sizes[randomSize]}</div>
                <div class="color color-${colors[randomColor]}" style='background-color:${colors[randomColor]}'> </div>
                <button class="addToCart buttons" id="btn-${cart.id}" onClick=addToCart(${cart.id})></button>
                </div>
                  `;
  });
  document.getElementById("items-list").innerHTML = innerHtml;
}

cartList();
var cost = 0;
//----------------------------------------------------------------------------------------------
//price list
function priceList() {
  document.getElementById("price-list").innerHTML = "";
  let innerHtml = `<div id="check-list">Checkout List</div>`;
  cartArr.forEach((cart) => {
    console.log(cart);
    innerHtml += `
                <ul>
                <li class="li-class">
                <div class="chk-lst-item">(i) ${cart.title}</div><div class="chk-lst-item prce">-- ₹${cart.price}</div>
                </li>
                </ul>
                
                  `;
    cost += cart.price;
  });
  innerHtml += `<hr>
                <ul>
                    <li class="li-class">
                        <div class="chk-lst-item">Total</div><div class="chk-lst-item prce">-- ₹${Math.floor(
                          cost
                        )}</div>
                    </li>
                </ul>
                <hr>
                <button id="checkout-btn" >Checkout</button>
                    `;
  document.getElementById("price-list").innerHTML = innerHtml;
}

priceList();

document.getElementById("checkout-btn").onclick = function (e) {
  var options = {
    key: "rzp_test_PV1oQ0oMtgXOsq", // Enter the Key ID generated from the Dashboard
    amount: `${cost}` * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "MyShop Checkout",
    description: "This is your order", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    theme: {
      color: "#000",
    },
    image:
      "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
  };

  var rzpy1 = new Razorpay(options);
  rzpy1.open();
  // clear mycart - localStorage
  clearCart();
  e.preventDefault();
};

function clearCart() {
  document.getElementById("items-list").innerHTML = "";
  document.getElementById("price-list").innerHTML = "";
  localStorage.removeItem("MyCart");
}

//---------------------------------------------------------------------------------------
document.getElementById("home").onclick = () => {
  alert("dfhsh");
  //   window.location.replace(".");
};
