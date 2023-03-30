import React, { useEffect, useState } from "react";
import appStyles from "../../App.module.css";
import PatchStyles from "patch-styles";
import styles from "../../styles/Project.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import Task from "./Task";
import slugify from "react-slugify";
import Loading from "../../components/Loading";
import { useSetErrorAlert } from "../../contexts/ErrorContext";

function TaskContainer({ title }) {
  // Variables
  const { id } = useParams();
  const [tasks, setTasks] = useState({ results: [] });
  const [loaded, setLoaded] = useState(false);
  const status = slugify(title) === "complete";
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
    const target = ev.target;
    let container;

    if (target.classList.contains("container")) {
      container = target;
    } else {
      if (target.parentNode.classList.contains("container")) {
        container = target.parentNode;
      } else {
        if (target.parentNode.parentNode.classList.contains("container")) {
          container = target.parentNode.parentNode;
        } else {
          container = target.parentNode.parentNode.parentNode;
        }
      }
    }

    container.prepend(task);
    postTaskState(model, container.id);
  };

  // Set future task state in API
  const postTaskState = async (model, container) => {
    try {
      await axiosReq.patch(`/tasks/${model.id}`, {
        completed: container === "complete-container" ? true : false,
      });
    } catch (err) {
      setErrorAlert({ ...err.response, variant: "danger" });
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
        setErrorAlert({ ...err.response, variant: "danger" });
      }
      setLoaded(true);
    };

    fetchTasks();
  }, [id, status, setErrorAlert]);

  return (
    <PatchStyles classNames={styles}>
      <PatchStyles classNames={appStyles}>
        <div className="TaskContainer BgLight rounded my-2">
          <h3 className="fs-5">{title}:</h3>
          <div
            onDrop={handleDrop}
            onDragOver={allowDrop}
            className="p-2 container TaskContainerInner"
            id={`${slugify(title)}`}
          >
            {loaded ? (
              tasks.results.length ? (
                tasks.results?.map((task) => (
                  <Task task={task} container={slugify(title)} key={task.id} />
                ))
              ) : (
                <></>
              )
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </PatchStyles>
    </PatchStyles>
  );
}

export default TaskContainer;
