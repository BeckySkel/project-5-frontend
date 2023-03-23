// External imports
import PatchStyles from "patch-styles";
import React from "react";
import { Button, Card } from "react-bootstrap";
// Internal imports
import styles from "../../styles/Project.module.css";

/*
Tasks displayed as draggable cards
*/
function Task(props) {
  // Variables
  const { body, summary, id } = props.task;

  // Set data to transfer on drag
  const handleDrag = (ev) => {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.setData("item", JSON.stringify(props.task));
  };

  return (
    <PatchStyles classNames={styles}>
      <Card
        draggable
        onDragStart={handleDrag}
        id={`task${id}`}
        className={`${props.container} m-2`}
      >
        <Card.Header>
          <span className="float-left">{summary}</span>

          <span className="EditOptions">
            <Button size="sm" variant="light" className="text-muted">
              <i className="fa-regular fa-pen-to-square"></i>
            </Button>
            <Button size="sm" variant="light" className="text-muted">
              <i className="fa-regular fa-trash-can"></i>
            </Button>
          </span>
        </Card.Header>
        <Card.Body>{body}</Card.Body>
      </Card>
    </PatchStyles>
  );
}

export default Task;

// completed,
// created_on,
// creator,
// due_date,
// is_creator,
// is_project_contrib,
// is_project_creator,
// profile_id,
// updated_on
