// External imports
import PatchStyles from "patch-styles";
import React from "react";
import { Card } from "react-bootstrap";
import CreateEditModal from "../../components/CreateEditModal";
import DeleteModal from "../../components/DeleteModal";
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
            <CreateEditModal type="edit" taskId={id} />
            <DeleteModal type="task" id={id}/>
          </span>
        </Card.Header>
        <Card.Body><pre>{body}</pre></Card.Body>
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
