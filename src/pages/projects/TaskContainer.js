import React, { useEffect, useState } from "react";
import appStyles from "../../App.module.css";
import PatchStyles from "patch-styles";
import styles from "../../styles/Project.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import Task from "./Task";
import slugify from "react-slugify";
import Loading from "../../components/Loading";
import CreateEditModal from "../../components/CreateEditModal";
import { useSetErrorAlert } from "../../contexts/ErrorContext";

function TaskContainer(props) {
  // Variables
  const { id } = useParams();
  const [tasks, setTasks] = useState({ results: [] });
  const [loaded, setLoaded] = useState(false);
  const status = slugify(props.title) === "complete";
  const setErrorAlert = useSetErrorAlert(); 

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
    if (ev.target.parentNode.classList.contains("card")) {
      ev.target.parentNode.parentNode.prepend(task);
    } else {
      ev.target.prepend(task);
    }

    postTaskState(model, container);
  };

  // Set future task state in API
  const postTaskState = async (model, container) => {
    try {
      await axiosReq.patch(`/tasks/${model.id}`, {
        completed: container === "complete-container" ? true : false,
      });
    } catch (err) {
      setErrorAlert({ ...err.response, variant: "danger"});
    }
  };

  // Get tasks on mount and updated
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axiosReq.get(
          `/tasks/?project=${id}&completed=${status}`
        );
        setTasks(data);
      } catch (err) {
        setErrorAlert({ ...err.response, variant: "danger"});
      }
      setLoaded(true);
    };

    fetchTasks();
  }, [id, status]);

  return (
    <PatchStyles classNames={styles}>
      <PatchStyles classNames={appStyles}>
        <div className="TaskContainer BgLight rounded my-2">
          <h3 className="fs-5 text-break">{props.title}:</h3>
          <div
            onDrop={handleDrop}
            onDragOver={allowDrop}
            className="p-2"
            id={`${slugify(props.title)}-container`}
          >
            {loaded ? (
              tasks.results.length ? (
                tasks.results?.map((task) => (
                  <Task
                    task={task}
                    container={slugify(props.title)}
                    key={task.id}
                  />
                ))
              ) : (
                <p>No tasks</p>
              )
            ) : (
              <Loading />
            )}
          </div>
          {props.permission ? (
            <CreateEditModal item="task" type="create" />
          ) : (
            <></>
          )}
        </div>
      </PatchStyles>
    </PatchStyles>
  );
}

export default TaskContainer;
