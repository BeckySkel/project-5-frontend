// External imports
import PatchStyles from "patch-styles";
import React from "react";
import { Card, ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";
// Internal imports
import appStyles from "../../App.module.css";
import styles from "../../styles/Dashboard.module.css";

/*
Displays user's related projects in dashboard
*/
function ProjectCard(props) {
  // Variables
  const { id, completed_tasks, description, task_count, title, updated_on } =
    props.project;

  // Calculate value for progress bar
  const progress = () => {
    const completed = parseInt(completed_tasks.length);
    const total = parseInt(task_count);
    const result = (completed / total) * 100;
    return isNaN(result) ? 0 : result;
  };

  return (
    <PatchStyles classNames={styles}>
      <PatchStyles classNames={appStyles}>
        <Card className="my-1">
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Last updated {updated_on}
            </Card.Subtitle>
            <Card.Text>{description}</Card.Text>
            <ProgressBar now={progress()} label={progress()} srOnly />
            <Link to={`/projects/${id}`}>View Project</Link>
          </Card.Body>
        </Card>
      </PatchStyles>
    </PatchStyles>
  );
}

export default ProjectCard;
