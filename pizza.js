//CS320 Homework 2 - Laurel Anderson

//class that holds the attributes for each pizza
class MenuItem {
  //assigns attributes to the MenuItem
  constructor (name, ingredients, price){
    this.name = name;
    this.ingredients = ingredients;
    this.price = price;
  }
}

//class Menu is an item that holds the different types of pizzas.
class Menu {
  //creates an array to store the items in
  constructor() {
    this.menu = [];
  }

  //adds an item to the menu
  addMenuItem(item) {
    this.menu.push(item);
  }

  //returns an array of all menu items that have the given ingredient.
  findMenuItems(ingredient) {
    let retArr = [];
    for (let x of this.menu){
      for (let y of x.ingredients){
        if (y === ingredient){ retArr.push(x);}
      }
    }
    return retArr;
  }
}

//creates a new order item.
class Pizza {
  constructor (MenuItem, size, type) {
    this.Item = MenuItem;
    this.size = size;
    this.type = type;
  }
}

//compiles all items into a single order.
class Order {
  constructor() {
    this.orderList = [];
  }

  //this adds pizzas to the order list for this order
  addOrderItem(item) {
    this.orderList.push(item);
  }

  //this computes the cost of an order
  currentOrderCost(){
    let total = 0;
    //looks in each element in orderList
    for (let x of this.orderList){
      //looks at the index of each price element in Item
      for (let y in x.Item.price){
        //looks up the size of the order in the table of the type of pizza, then adds it
        if (y === x.size){
          total = total + x.Item.price[x.size];
        }
      }
    }
    //total amount paid for the pizzas
    return "Kes " + total;
  }
}

//creates an inventory class
class Inventory {
  //creates a lookup table for the inventory.
  constructor(inventory) {
    this.inventory = inventory;
  }
}

//creates a store class
class Store {
  //creates a storeInventory instance and an array to return
  constructor(storeInven) {
    this.storeInven = storeInven;
    this.retArr = [];
  }

  placeOrder(userOrder) {

    //x is the pizza item
    for (let x of userOrder.orderList) {
      //If we can make the pizza,
      if (this.cheakInven(x)){
        //add it to retArr,
        this.retArr.push(x);
        //and update the inventory. y is the singular ingredients
        for (let y of x.Item.ingredients) {
          switch (x.size) {
            case "small":
              this.storeInven.inventory[x] -= 1;
              break;
            case "medium":
              this.storeInven.inventory[y] -= 2;
              break;
            case "large":
              this.storeInven.inventory[y] -= 3;
              break;
          }
        }
      }
    }
    return this.retArr;
  }

  cheakInven(pizza){
    let check = true;
    // y is the singular ingredients
    for (let y of pizza.Item.ingredients) {
      switch (pizza.size) {
        case "small":
          if((this.storeInven.inventory[y] - 1) < 0) { check = false }
          break;
        case "medium":
          if((this.storeInven.inventory[y] - 2) < 0) { check = false }
          break;
        case "large":
          if((this.storeInven.inventory[y] - 3) < 0) { check = false }
          break;
      }
    }
    return check;
  }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Tests

let p1 = new MenuItem("Regina", ["beefHam", "mushrooms"], {"small": 650, "medium": 850, "large": 1050});
let p2 = new MenuItem("Hawaiian", ["beefHam", "pineapple"], {"small": 650, "medium": 850, "large": 1050} );
let p3 = new MenuItem("Veggie", ["tomatoes", "onions", "peppers", "mushrooms", "olives"], {"small": 750,"medium": 950, "large": 1150});
let p4 = new MenuItem("Zzesty Pepperoni Passion", ["pepperoni", "redChili"], {"small": 750,"medium": 950, "large": 1150});
let p5 = new MenuItem("Chicken Bali",["chicken", "redChili", "mushrooms", "pineapple"], {"small": 650, "medium": 850, "large": 1050} );
let p6 = new MenuItem("BBQ Chicken",["chicken", "onions", "corn"], { "small": 950,"medium": 1150,"large": 1350} );

let menu1 = new Menu();

menu1.addMenuItem(p1);
menu1.addMenuItem(p2);
menu1.addMenuItem(p3);
menu1.addMenuItem(p4);
menu1.addMenuItem(p5);
menu1.addMenuItem(p6);

//console.log(menu1.findMenuItems("pineapple"));

// console.log(p1.price["small"]);
// console.log(p2);
// console.log(p3);
// console.log(p4);
// console.log(p5);
// console.log(p6);

//console.log(menu1);

let pizza1 = new Pizza(p1, "large", "thin");
let pizza2 = new Pizza(p5, "small", "hand tossed");
let pizza3 = new Pizza(p6, "medium", "thin");
let order1 = new Order();
order1.addOrderItem(pizza1);
order1.addOrderItem(pizza2);
order1.addOrderItem(pizza3);
//console.log(order1.currentOrderCost());

let i1 = {"pineapple": 0, "beefHam": 3, "mushrooms": 3, "peppers": 3, "olives": 4, "tomatoes": 5, "pepperoni": 6, "redChili": 7, "chicken": 8, "corn": 9, "onions": 10};
let inventory1 = new Inventory(i1);

let store1 = new Store(inventory1);

console.log(store1.placeOrder(order1));

