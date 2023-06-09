process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");

let items = require("../fakeDb")
let item = { name: "testItem", price: 30 }

beforeEach(async () => {
    items.push(item)
  });
  
afterEach(async () => {
    items = []
  });

describe("GET /items", async function (){
    test("Gets all items", async function(){
        let resp = await request(app).get("/items");
        let {items} = resp.body;
        expect(resp.statusCode).toBe(200);
        expect(items.length).toBe(1);
    })
})

describe("GET /items/:name", async function (){
    test("Gets specified item by name", async function(){
        let resp = await request(app).get(`/items/${item.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body.item).toEqual(item);
    })

    test("404 error if item not found", async function(){
        let resp = await request(app).get(`/items/x`);
        expect(resp.statusCode).toBe(404);
    })
})

describe("POST /items", async function (){
    test("Creates new item", async function(){
        let resp = (await request(app).post(`/items`))
        .send({
            name: Blanket,
            price: 6
        });
        expect(resp.statusCode).toBe(200);
        expect(resp.body.item).toHaveProperty("name");
        expect(resp.body.item).toHaveProperty("price");
        expect(resp.body.item.name).toEqual("Blanket");
        expect(resp.body.item.price).toEqual(6);

    })
})

describe("PATCH /items/:name", async function (){
    test("Updates item", async function(){
        let resp = (await request(app).patch(`/items/${item.name}`))
        .send({
            name: TeddyBear
        });
        expect(resp.statusCode).toBe(200);
        expect(resp.body.item).toEqual({name: TeddyBear});
    })

    test("404 error if item not found", async function(){
        let resp = await request(app).patch(`/items/x`);
        expect(resp.statusCode).toBe(404);
    })
})

describe("DELETE /items/:name", async function () {
    test("Deletes specified item", async function () {
      const resp = await request(app).delete(`/items/${item.name}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ message: `Deleted ${resp.item.name}`});
    });
  });
  
 
