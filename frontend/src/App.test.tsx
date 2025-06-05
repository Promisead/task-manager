
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

// Mock fetch globally
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          _id: "1",
          title: "Test Task",
          description: "Task description",
          completed: false,
        },
      ]),
  })
) as jest.Mock;

describe("App Component", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // reset mocks
  });

  test("renders the main heading", async () => {
    render(<App />);
    const heading = screen.getByText(/Task Manager/i);
    expect(heading).toBeInTheDocument();
  });

  test("fetches and displays tasks", async () => {
    render(<App />);
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("/tasks"));

    const taskTitle = await screen.findByText("Test Task");
    expect(taskTitle).toBeInTheDocument();
  });

  test("adds a new task", async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: () => Promise.resolve([]), // for initial fetch
      })
      .mockResolvedValueOnce({
        json: () =>
          Promise.resolve({
            _id: "2",
            title: "New Task",
            description: "New Desc",
            completed: false,
          }),
      });

    render(<App />);
    fireEvent.change(screen.getByPlaceholderText("Task title"), {
      target: { value: "New Task" },
    });
    fireEvent.change(screen.getByPlaceholderText("Task description"), {
      target: { value: "New Desc" },
    });
    fireEvent.click(screen.getByText("Add Task"));

    const newTask = await screen.findByText("New Task");
    expect(newTask).toBeInTheDocument();
  });
});
