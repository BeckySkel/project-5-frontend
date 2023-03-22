import React, { useEffect, useState } from "react";
import appStyles from "../../App.module.css";
import PatchStyles from "patch-styles";
import styles from "../../styles/Projects.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import Task from "./Task";
import slugify from "react-slugify";

function TaskContainer(props) {
  // Variables
  const { id } = useParams();
  const [tasks, setTasks] = useState({ results: [] });

  // Drag and drop functions
  const allowDrop = (ev) => {
    ev.preventDefault();
  };

  // https://www.tabnine.com/code/javascript/functions/react/DragEvent/dataTransfer
  const handleDrop = (ev) => {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const model = JSON.parse(ev.dataTransfer.getData("item"));
    const task = document.getElementById(data);
    const container = ev.target.id;
    console.log(container);
    if (task.classList.contains("to-do")) {
      task.classList.replace("to-do", "complete");
    } else {
      task.classList.replace("complete", "to-do");
    }
    ev.target.appendChild(task);
    postTaskState(model, container);
  };

  // Set future menu state in API
  const postTaskState = async (model, container) => {
    try {
      await axiosReq.patch(`/tasks/${model.id}`, {
        completed: container === "complete-container" ? true : false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Get tasks on mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axiosReq.get("/tasks/", { project: id });
        setTasks(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTasks();
  }, [id]);

  return (
    <PatchStyles classNames={styles}>
      <PatchStyles classNames={appStyles}>
        <div className="TaskContainer BgLight rounded my-2">
          <h3 className="fs-5">{props.title}:</h3>
          <div onDrop={handleDrop} onDragOver={allowDrop} className="p-2" id={`${slugify(props.title)}-container`}>
            {/* Add cards */}
            {tasks.results?.map((task) => {
              if (!task.completed && props.title === "To do") {
                return (
                  <Task
                    task={task}
                    container={slugify(props.title)}
                    key={task.id}
                  />
                );
              } else if (task.completed && props.title === "Complete") {
                return (
                  <Task
                    task={task}
                    container={slugify(props.title)}
                    key={task.id}
                  />
                );
              } else {
                return null
              }
            })}
          </div>
        </div>
      </PatchStyles>
    </PatchStyles>
  );
}

export default TaskContainer;
