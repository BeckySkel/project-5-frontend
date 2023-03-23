// External imports
import React, { useEffect, useState } from "react";
import PatchStyles from "patch-styles";
import { Col, Button } from "react-bootstrap/";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
// Internal imports
import styles from "../../styles/Project.module.css";
import appStyles from "../../App.module.css";
import TaskContainer from "./TaskContainer";
import DeleteModal from "../../components/DeleteModal";

/*
Page to display the project identified in the url
*/
function ProjectPage() {
  // Variables
  const { id } = useParams();
  const [project, setProject] = useState({ results: [] });
  const containers = ["To do", "Complete"];

  // Get project on mount
  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: project }] = await Promise.all([
          axiosReq.get(`/projects/${id}`),
        ]);
        setProject({ results: project });
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  // Spread project values into props
  const { creator, task_count, title } = { ...project.results };

  

  return (
    <PatchStyles classNames={styles}>
      <PatchStyles classNames={appStyles}>
        <Col
          xs={{ span: 10, offset: 1 }}
          className="BgGrey text-start p-3 rounded mb-5"
        >
          <span className="EditOptions">
            <Button size="sm" variant="light" className="text-muted">
              <i className="fa-regular fa-pen-to-square"></i>
            </Button>
            <DeleteModal type="project" id={id}/>
          </span>
          <h1>{title}</h1>

          <h2>by {creator}</h2>
          <p>total tasks: {task_count}</p>

          {/* Todo and Complete containers */}
          {containers.map((container) => (
            <TaskContainer title={container} key={container} />
          ))}
          {/* End containers */}
        </Col>
      </PatchStyles>
    </PatchStyles>
  );
}

export default ProjectPage;

// contributors,
// created_on,
// description,
// is_contributor,
// profile_id,
// profile_ids,
// task_ids,
// updated_on,
// url_id,
