// External imports
import React, { useLayoutEffect, useState } from "react";
import PatchStyles from "patch-styles";
import { Row } from "react-bootstrap";
// Internal imports
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import { useSetErrorAlert } from "../../contexts/ErrorContext";
import ProjectCard from "./ProjectCard";
import appStyles from "../../App.module.css";
import styles from "../../styles/Dashboard.module.css";

/*
User's dashboard to display all related tasks and recent updates
*/
const Dashboard = () => {
  //  Variables
  const currentUser = useCurrentUser();
  const profile_id = currentUser.profile_id;
  const [projectsList, setProjectsList] = useState([]);
  const [contribProjectsList, setContribProjectsList] = useState([]);
  const setErrorAlert = useSetErrorAlert();

  // Fetch all related projects
  useLayoutEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axiosReq.get(
          `/projects/?creator__profile=${profile_id}`
        );
        setProjectsList(data.results);
        const contribProjects = await axiosReq.get(
          `/projects/?contributors__user__profile=${profile_id}`
        );
        setContribProjectsList(contribProjects.data.results);
      } catch (err) {
        setErrorAlert({ ...err.response, variant: "danger" });
      }
    };

    fetchProjects();
  }, [profile_id, setErrorAlert]);

  return (
    <PatchStyles classNames={styles}>
      <PatchStyles classNames={appStyles}>
        <Row className="BgGrey rounded Dashboard p-3 p-sm-5">
          <h1 className="pt-md-5 text-center">Dashboard</h1>

          <div className="BgLight rounded">
            <h2 className="py-2">My Projects</h2>

            {projectsList?.length ? (
              projectsList?.map((project) => (
                <ProjectCard project={project} key={project.id} />
              ))
            ) : (
              <p className="ms-2">No projects yet! Click the link in the menu to start your first project</p>
            )}
          </div>

          <div className="BgLight rounded mt-3">
            <h2 className="py-2">Contributing Projects</h2>
            {contribProjectsList?.length ? (
              contribProjectsList?.map((project) => (
                <ProjectCard project={project} key={project.id} />
              ))
            ) : (
              <p className="ms-2">No projects yet!</p>
            )}
          </div>
        </Row>
      </PatchStyles>
    </PatchStyles>
  );
};

export default Dashboard;
