const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const taskRoutes = require("../routes/taskRoutes");
const Task = require("../models/Task");

let app;
let mongod;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app = express();
  app.use(express.json());
  app.use("/tasks", taskRoutes);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

afterEach(async () => {
  await Task.deleteMany(); // Clean DB between tests
});

describe("Task Routes", () => {
  test("should create a new task", async () => {
    const res = await request(app).post("/tasks").send({
      title: "Test Task",
      description: "Test Description",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test Task");
  });

  test("should not create a task without title", async () => {
    const res = await request(app).post("/tasks").send({
      description: "Missing title",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Title is required");
  });

  test("should fetch all tasks", async () => {
    await Task.create({ title: "Task 1", description: "Desc 1", completed: false });
    await Task.create({ title: "Task 2", description: "Desc 2", completed: true });

    const res = await request(app).get("/tasks");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0]).toHaveProperty("title");
  });

  test("should update a task", async () => {
    const task = await Task.create({ title: "Old", description: "Old", completed: false });

    const res = await request(app)
      .put(`/tasks/${task._id}`)
      .send({ title: "Updated", completed: true });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Updated");
    expect(res.body.completed).toBe(true);
  });

  test("should delete a task", async () => {
    const task = await Task.create({ title: "Delete me", description: "", completed: false });

    const res = await request(app).delete(`/tasks/${task._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Task deleted");
  });
});
