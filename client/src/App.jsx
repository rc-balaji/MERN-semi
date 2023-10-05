import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// Lets Start

function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([{ text: "No Task" }]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await axios.get("http://localhost:5000/api/tasks");
        setTaskList(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchTasks();
  }, []);

  const DeleteTask = async (id) => {
    await axios
      .delete(`http://localhost:5000/api/tasks/${id}`)
      .then((req, res) => {
        console.log("Deleted Succcessfully");
      });
  };

  const UpdateTask = async (id) => {
    await axios
      .put(`http://localhost:5000/api/tasks/${id}`, {
        text: prompt("Enter the text to be Updated"),
      })
      .then((req, res) => {
        console.log("Updated Succcessfully");
      });
  };

  const AddTask = async () => {
    await axios
      .post("http://localhost:5000/api/tasks", { text: task })
      .then((req, res) => {
        alert("Task Added");
        setTask("");
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h3>To-DO List</h3>
      <input
        type="text"
        placeholder="Enter Task"
        onChange={(e) => {
          setTask(e.target.value);
        }}
        value={task}
      />
      <button onClick={AddTask}>Add</button>
      <h5>Tasks:-</h5>
      <ol>
        {taskList.map((data, index) => (
          <li style={{ textAlign: "left" }} key={index}>
            {data.text}
            <button
              style={{ color: "red" }}
              onClick={() => DeleteTask(data._id)}
            >
              Delete
            </button>
            <button
              style={{ color: "Green" }}
              onClick={() => UpdateTask(data._id)}
            >
              Update
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
