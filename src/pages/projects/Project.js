import React, { useEffect, useState } from "react";
import { Card, Col } from "react-bootstrap";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import appStyles from "../../App.module.css";
import PatchStyles from "patch-styles";
import styles from "../../styles/Projects.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import Task from "./Task";

function Project(props) {
  // Variables
  const {
    contributors,
    created_on,
    creator,
    description,
    id,
    is_contributor,
    // is_creator,
    profile_id,
    profile_ids,
    task_count,
    task_ids,
    title,
    updated_on,
    url_id,
  } = props;
  const currentUser = useCurrentUser;
  const [task, setTask] = useState({results: []});

  // Get tasks
  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: task }] = await Promise.all([
          axiosReq.get("/tasks/", { params: {project_id : id} }),
        ]);
        setTask({ results: [task] });
        console.log(task);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <PatchStyles classNames={styles}>
      <PatchStyles classNames={appStyles}>
        <Col
          xs={{ span: 10, offset: 1 }}
          className="BgGrey text-start p-3 rounded mb-5"
        >
          <h1>{title}</h1>
          <h2>by {creator}</h2>
          <p>total tasks: {task_count}</p>
          <div className="TaskContainer BgLight rounded">
            <h3 className="fs-5">To do:</h3>
            {task_count > 1 ? (
              <>
                {task.map((id) => (
                  <Task {...task.results} />
                ))}
              </>
            ) : task_count > 0 ? (
              <>
                <Task {...task.results[0]} />
              </>
            ) : (
              <p>No tasks yet!</p>
            )}
          </div>
        </Col>
      </PatchStyles>
    </PatchStyles>
  );
}

export default Project;
