const express = require("express");
const fs = require("fs");
const ejs = require("ejs");
const path = require("path");
const { error } = require("console");
const app = express();
app.use(express.json());

app.use("/image", express.static(path.join(__dirname, "image")));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/register.html");
});

app.get("/factors_json", (req, res) => {
  const factors = JSON.parse(fs.readFileSync("factors.json"));
  res.json(factors);
});

app.get("/add_factor", (req, res) => {
  res.sendFile(__dirname + "/factor_form.html");
});

app.get("/factors", (req, res) => {
  try {
    const factors = JSON.parse(fs.readFileSync("factors.json"));

    res.render("factors", { factors });
  } catch (err) {
    res.send("No factors");
  }
});

app.get("/factor/:factor_id", (req, res) => {
  try {
    const factors = JSON.parse(fs.readFileSync("factors.json"));

    const factor_id = req.params.factor_id;

    const factor = factors.find((f) => f.factorId === Number(factor_id));

    if (factor) {
      res.render("factor", { factor });
    } else {
      res.send("Factor Not Found!");
    }
  } catch (err) {
    res.send("Error Occurred!");
  }
});

app.get("/add_product", (req, res) => {
  res.sendFile(__dirname + "/product_form.html");
});

app.get("/products", (req, res) => {
  try {
    const products = JSON.parse(fs.readFileSync("products.json"));

    res.render("products", { products });
  } catch (err) {
    res.send("No products");
  }
});

app.get("/products_json", (req, res) => {
  try {
    const products = JSON.parse(fs.readFileSync("products.json"));

    res.json({ products }); ///////
  } catch (err) {
    res.status(500).json({ error: "Failed to load products" });
  }
});

app.get("/users_json", (req, res) => {
  try {
    const users = JSON.parse(fs.readFileSync("users.json"));

    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: "Failed to load users" });
  }
});

app.post("/users_create", (req, res) => {
  /////////
  let users;
  try {
    users = JSON.parse(fs.readFileSync("users.json"));
  } catch (err) {
    users = [];
  }

  const lastUser = users[users.length - 1];
  const nextUserId = lastUser ? lastUser.user_id + 1 : 1;

  console.log(req.body);

  const newUser = { ...req.body, user_id: nextUserId };
  users.push(newUser);
  fs.writeFileSync("users.json", JSON.stringify(users));

  res.status(201).json({ user_id: nextUserId });
});

app.get("/sellers_json", (req, res) => {
  try {
    const sellers = JSON.parse(fs.readFileSync("sellers.json"));

    res.json({ sellers });
  } catch (err) {
    res.status(500).json({ error: "Failed to load products" });
  }
});

app.get("/customers_json", (req, res) => {
  try {
    const customers = JSON.parse(fs.readFileSync("customers.json"));

    res.json({ customers });
  } catch (err) {
    res.status(500).json({ error: "Failed to load products" });
  }
});

app.get("/view/:product_id", (req, res) => {
  try {
    const products = JSON.parse(fs.readFileSync("products.json"));

    const product_id = req.params.product_id;

    const product = products.find((p) => p.product_id === Number(product_id));

    if (product) {
      res.render("viewProduct", { product });
    } else {
      res.send("Product Not Found!");
    }
  } catch (err) {
    res.send("Error Occurred!");
  }
});

app.get("/edit/:product_id", (req, res) => {
  try {
    const products = JSON.parse(fs.readFileSync("products.json"));

    const product_id = req.params.product_id;

    const product = products.find((p) => p.product_id === Number(product_id));

    if (product) {
      res.render("editProduct", { product }); //////
    } else {
      res.send("Product Not Found!");
    }
  } catch (err) {
    res.send("Error Occurred!");
  }
});

app.post("/edit/:product_id", (req, res) => {
  /////////
  try {
    const products = JSON.parse(fs.readFileSync("products.json"));
    const product_id = req.params.product_id;
    const { name, price, description, unit } = req.body;

    const productIndex = products.findIndex(
      (p) => p.product_id === Number(product_id)
    );
    if (productIndex !== -1) {
      products[productIndex] = {
        product_id: Number(product_id),
        name,
        price,
        unit,
        description,
      };

      fs.writeFileSync("products.json", JSON.stringify(products, null, 2));
      res.redirect("/products"); /// بازگشت به متد
    } else {
      res.send("Product Not Found!");
    }
  } catch (err) {
    res.send("Error Occurred!");
  }
});

app.get("/delete/:product_id", (req, res) => {
  /////////////////
  try {
    const productId = req.params.product_id;
    let products = JSON.parse(fs.readFileSync("products.json"));

    products = products.filter(
      (product) => product.product_id !== Number(productId)
    );

    fs.writeFileSync("products.json", JSON.stringify(products, null, 2));

    res.redirect("/products");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to delete product");
  }
});

app.post("/products", (req, res) => {
  ///////////////
  let products;
  try {
    products = JSON.parse(fs.readFileSync("products.json"));
  } catch (err) {
    products = [];
  }

  const lastProduct = products[products.length - 1];
  const nextProductId = lastProduct ? lastProduct.product_id + 1 : 1;

  const { name, price, description, unit } = req.body;
  const product = {
    product_id: nextProductId,
    name,
    price,
    unit,
    description,
  };

  products.push(product);
  fs.writeFileSync("products.json", JSON.stringify(products));
  console.log(
    `Added product: ${product.product_id} - ${product.name} - ${product.price} - ${product.description}`
  );
  res.redirect("/");
});

function parseProducts(body) {
  //////////////
  const products = [];
  console.log(body);
  console.log(products);
  const productNames = Array.isArray(body["product_name[]"])
    ? body["product_name[]"]
    : [body["product_name[]"]];
  const productQuantities = Array.isArray(body["product_quantity[]"])
    ? body["product_quantity[]"]
    : [body["product_quantity[]"]];
  const productPrices = Array.isArray(body["product_price[]"])
    ? body["product_price[]"]
    : [body["product_price[]"]];
  const productDiscounts = Array.isArray(body["product_discount[]"])
    ? body["product_discount[]"]
    : [body["product_discount[]"]];

  for (let i = 0; i < productNames.length; i++) {
    if (productNames[i] && productQuantities[i] && productPrices[i]) {
      products.push({
        name: productNames[i],
        quantity: parseInt(productQuantities[i], 10),
        price: parseFloat(productPrices[i]),
        discount: parseFloat(productDiscounts[i]) || 0,
      });
    }
  }
  console.log(products);
  return products;
}

app.post("/factors", (req, res) => {
  try {
    const {
      seller_name,
      seller_economy_number,
      seller_national_id,
      seller_address,
      seller_county,
      seller_city,
      seller_postal_code,
      seller_phone_number,
      customer_name,
      customer_economy_number,
      customer_registeration_number,
      customer_address,
      customer_county,
      customer_city,
      customer_postal_code,
      customer_national_id,
      customer_phone_number,
      payment_type,
      description,
    } = req.body;
    const products = parseProducts(req.body);

    const factorsLength = fs.existsSync("factors.json")
      ? JSON.parse(fs.readFileSync("factors.json", "utf-8")).length
      : 0;
    const factorId = factorsLength + 1;

    const currentDate = new Date();
    const factor = {
      factorId,
      seller_name,
      seller_economy_number,
      seller_national_id,
      seller_address,
      seller_county,
      seller_city,
      seller_postal_code,
      seller_phone_number,
      customer_name,
      customer_economy_number,
      customer_registeration_number,
      customer_address,
      customer_county,
      customer_city,
      customer_postal_code,
      customer_national_id,
      customer_phone_number,
      payment_type,
      description,
      products,
      totalPrice: calculateTotalPrice(products),
      date: `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`,
    };

    if (!fs.existsSync("factors.json")) {
      fs.writeFileSync("factors.json", JSON.stringify([]));
    }

    const factors = JSON.parse(fs.readFileSync("factors.json", "utf-8"));
    factors.push(factor);

    fs.writeFileSync("factors.json", JSON.stringify(factors, null, 2));

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to store factor" });
  }
});

function calculateTotalPrice(products) {
  return products.reduce(
    (total, { price, quantity, discount }) =>
      total + price * quantity * (discount ? (100 - discount) / 100 : 1),
    0
  );
}

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
