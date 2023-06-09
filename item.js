const items = require("./fakeDb")

class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
    items.push(this);
  }

  static findItems(){
    return items;
  }

  static update(name, data){
    let foundItem = Item.find(name);
    if(foundItem === undefined){
        throw { message: "404 Not Found", status: 404 }
    }
    foundItem.name = data.name;
    foundItem.price = data.price;

    return foundItem;
  }

  static find(name, data){
    let foundItem = items.find(item => item.name === name);
    if(foundItem === undefined){
        throw { message: "404 Not Found", status: 404 }
      }
      return foundItem;
  }

  static delete(name){
    let foundI = items.find(item => item.name === name);
    if(foundI === -1){
        throw { message: "404 Not Found", status: 404 }
      }
      items.splice(foundI, 1)
  }

}

module.exports = Item;