import React, { useEffect, useRef, useState } from "react";
import { Card, Col } from "react-bootstrap";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import appStyles from "../../App.module.css";
import PatchStyles from "patch-styles";
import styles from "../../styles/Projects.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import Task from "./Task";
import { useParams } from "react-router-dom/cjs/react-router-dom";

function TaskContainer(props) {
  // Variables
  const { id } = useParams();
  const [tasks, setTasks] = useState({ results: [] });

  // Drag and drop functions
  const allowDrop = (ev) => {
    ev.preventDefault();
  };

  const handleDrag = (ev) => {
    ev.dataTransfer.setData("text", ev.target.id);
  };

  const handleDrop = (ev) => {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const task = document.getElementById(data);
    console.log(task);
    task.classList.replace("todo", "complete");
    ev.target.appendChild(task);
  };

  // Get tasks on mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axiosReq.get("/tasks/", { project: id });
        setTasks(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTasks();
  }, [id]);

  return (
    <PatchStyles classNames={styles}>
      <PatchStyles classNames={appStyles}>
        <div
          className="TaskContainer BgLight rounded my-2"
          onDrop={handleDrop}
          onDragOver={allowDrop}
        >
          <h3 className="fs-5">{props.title}:</h3>

          {/* Add cards */}
          {props.title === "To do" ? (
            <Card
              draggable
              onDragStart={handleDrag}
              id="task1"
              className="todo"
            >
              <Card.Header>Summary</Card.Header>
              <Card.Body>Body</Card.Body>
            </Card>
          ) : tasks.results.length ? 
          tasks.results.map(task => (
            <Card
              draggable
              onDragStart={handleDrag}
              className="complete"
            >
              <Card.Header>{task.summary}</Card.Header>
              <Card.Body>{task.body}</Card.Body>
            </Card>
          )) :
          <></>
          }
          {/* End of cards */}
        </div>
      </PatchStyles>
    </PatchStyles>
  );
}

export default TaskContainer;
