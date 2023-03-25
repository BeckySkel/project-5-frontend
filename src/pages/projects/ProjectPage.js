// External imports
import React, { useEffect, useState } from "react";
import PatchStyles from "patch-styles";
import { Col } from "react-bootstrap/";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
// Internal imports
import styles from "../../styles/Project.module.css";
import appStyles from "../../App.module.css";
import TaskContainer from "./TaskContainer";
import DeleteModal from "../../components/DeleteModal";
import CreateEditModal from "../../components/CreateEditModal";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

/*
Page to display the project identified in the url
*/
function ProjectPage() {
  // Variables
  const currentUser = useCurrentUser();
  // const loaded = useUserLoaded();
  const { id } = useParams();
  const [project, setProject] = useState({ results: [] });
  const containers = ["To do", "Complete"];
  const history = useHistory();

  // Get project on mount, redirect if not logged in
  useEffect(() => {
    const handleMount = async () => {
      if (currentUser) {
        try {
          const [{ data: project }] = await Promise.all([
            axiosReq.get(`/projects/${id}`),
          ]);
          setProject({ results: project });
        } catch (err) {
          console.log(err);
        }
      } else {
        history.push("/login");
      }
    };

    handleMount();
  }, [id]);

  // Spread project values into props
  const { creator, task_count, title, is_creator } = { ...project.results };

  return (
    <PatchStyles classNames={styles}>
      <PatchStyles classNames={appStyles}>
        <Col
          xs={12}
          sm={{ span: 10, offset: 1 }}
          className="BgGrey text-start p-3 rounded mb-5"
        >
          {is_creator ? (
            <span className="EditOptions">
              <CreateEditModal type="edit" item="project" id={id} />
              <DeleteModal item="project" id={id} />
            </span>
          ) : (
            <></>
          )}

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
