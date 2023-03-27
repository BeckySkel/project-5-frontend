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
import PageNotFound from "../home/PageNotFound";
import Loading from "../../components/Loading";
import ServerError from "../home/ServerError";

/*
Page to display the project identified in the url
*/
function ProjectPage() {
  // Variables
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [project, setProject] = useState({ results: null });
  const containers = ["To do", "Complete"];
  const history = useHistory();
  const [errorPage, setErrorPage] = useState(null);

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
          if (err.response.status === 404) {
            setErrorPage(<PageNotFound />);
          }
          if (err.response.status === 500) {
            setErrorPage(<ServerError />);
          }
        }
        setLoaded(true);
      } else {
        history.push("/login");
      }
    };

    handleMount();
  }, [currentUser, history, id]);

  // Spread project values into props
  const {
    creator,
    task_count,
    title,
    profile_names,
    is_creator,
    is_contributor,
    description,
  } = { ...project.results };

  return (
    <PatchStyles classNames={styles}>
      <PatchStyles classNames={appStyles}>
        {loaded ? (
          project.results ? (
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

              {/* testing */}
              <span className="EditOptions">
                <CreateEditModal type="edit" item="project" id={id} />
                <DeleteModal item="project" id={id} />
              </span>

              <h1 className="text-break">{title}</h1>

              <h2 className="text-break">by {creator}</h2>
              <h3 className="text-break">
                contributors {profile_names.join(", ")}
              </h3>
              <h4>{description}</h4>
              <p>total tasks: {task_count}</p>

              {containers.map((container) => (
                <TaskContainer
                  title={container}
                  key={container}
                  count={task_count}
                  permission={is_contributor || is_creator}
                />
              ))}
            </Col>
          ) : (
            <>{errorPage}</>
          )
        ) : (
          <Loading />
        )}
      </PatchStyles>
    </PatchStyles>
  );
}

export default ProjectPage;

// created_on,
// profile_id,
// task_ids,
// updated_on,
// url_id,
