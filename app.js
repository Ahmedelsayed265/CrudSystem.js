let parentTotal = document.querySelector(".total"),
  price = document.getElementById("price"),
  taxes = document.getElementById("taxes"),
  quantity = document.getElementById("quantity"),
  discount = document.getElementById("discount"),
  total = document.getElementById("total"),
  submit = document.getElementById("submit"),
  pname = document.getElementById("name"),
  type = document.getElementById("type"),
  date = document.getElementById("date"),
  tbody = document.getElementById("Tbody"),
  Delete = document.getElementById("Delete"),
  Search = document.getElementById("search"),
  dataProduct,
  mood = "add",
  indx;
//---------------------get price------------------
function getTotal() {
  if (price.value != "") {
    total.innerHTML = +price.value + +taxes.value - +discount.value;
    parentTotal.style.background = "#8de02c";
  } else {
    total.innerHTML = "";
    parentTotal.style.background = "#f00";
  }
}
//---------------create new product & save products to localStorage-------------
if (localStorage.product != null) {
  dataProduct = JSON.parse(localStorage.product);
} else {
  dataProduct = [];
}
submit.addEventListener("click", () => {
  let newProduct = {
    Name: pname.value.toLowerCase(),
    Type: type.value.toLowerCase(),
    Date: date.value,
    Price: price.value,
    Taxes: taxes.value,
    Discount: discount.value,
    Quantity: quantity.value,
    Total: total.innerHTML,
  };
  showData();
  if (
    pname.value != "" &&
    type.value != "" &&
    date.value != "" &&
    price.value != "" &&
    quantity.value <= 100
  ) {
    //---------counting---------
    if (mood === "add") {
      if (quantity.value > 1) {
        for (let i = 0; i < newProduct.Quantity; i++) {
          dataProduct.push(newProduct);
        }
      } else {
        dataProduct.push(newProduct);
      }
      clearInputs();
    } else {
      dataProduct[indx] = newProduct;
      mood = "add";
      submit.innerHTML = "Add New Device";
      clearInputs();
    }
    showData();
  } else {
    if (pname.value == "") {
      pname.focus();
    } else if (type.value == "") {
      type.focus();
    } else if (date.value == "") {
      date.focus();
    } else if (price.value == "") {
      price.focus();
    } else if (quantity > 100) {
      quantity.focus();
    }
  }
  //--------save in local storage------------//
  localStorage.setItem("product", JSON.stringify(dataProduct));
});
//claer
function clearInputs() {
  pname.value = "";
  type.value = "";
  price.value = "";
  taxes.value = "";
  discount.value = "";
  quantity.value = "";
  total.innerHTML = "";
}
//---------read (show function)---------
function showData() {
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    table += `
        <tr>
        <th scope="row">${i + 1}</th>
        <td>${dataProduct[i].Name}</td>
        <td>${dataProduct[i].Type}</td>
        <td>${dataProduct[i].Date}</td>
        <td>${dataProduct[i].Price}</td>
        <td>${dataProduct[i].Taxes}</td>
        <td>${dataProduct[i].Discount}</td>
        <td>${dataProduct[i].Total}</td>
        <td><button id="update" onclick="Update(${i})"><i class="fas fa-pencil"></i></button></td>
        <td><button id="delete" onclick="deleteProduct(${i})"><i class="far fa-trash-alt"></i></button></td>
        </tr>
        `;
  }
  tbody.innerHTML = table;
  if (dataProduct.length > 0) {
    let button;
    button = `
            <button onclick="deleteAll()">Delete ALL (${dataProduct.length} )</button>
        `;
    Delete.innerHTML = button;
  } else {
    Delete.innerHTML = "";
  }
  getTotal();
}
showData();
//----------Delete product-----------
function deleteProduct(i) {
  dataProduct.splice(i, 1);
  localStorage.product = JSON.stringify(dataProduct);
  showData();
}
//---------Delete All----------------
function deleteAll() {
  localStorage.clear();
  dataProduct = [];
  showData();
}
//update
function Update(i) {
  pname.value = dataProduct[i].Name;
  type.value = dataProduct[i].Type;
  date.value = dataProduct[i].Date;
  price.value = dataProduct[i].Price;
  taxes.value = dataProduct[i].Taxes;
  discount.value = dataProduct[i].Discount;
  getTotal();
  submit.innerHTML = "Update item";
  mood = "update";
  indx = i;
  scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
//search
function search(value) {
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    if (
      dataProduct[i].Name.includes(value.toLowerCase()) ||
      dataProduct[i].Date.includes(value) ||
      dataProduct[i].Type.includes(value.toLowerCase())
    ) {
      table += `
            <tr>
            <th scope="row">${i + 1}</th>
            <td>${dataProduct[i].Name}</td>
            <td>${dataProduct[i].Type}</td>
            <td>${dataProduct[i].Date}</td>
            <td>${dataProduct[i].Price}</td>
            <td>${dataProduct[i].Taxes}</td>
            <td>${dataProduct[i].Discount}</td>
            <td>${dataProduct[i].Total}</td>
            <td><button id="update" onclick="Update(${i})"><i class="fas fa-pencil"></i></button></td>
            <td><button id="delete" onclick="deleteProduct(${i})"><i class="far fa-trash-alt"></i></button></td>
            </tr>
            `;
    }
  }
  tbody.innerHTML = table;
}
