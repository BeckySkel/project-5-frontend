// External imports
import PatchStyles from "patch-styles";
import React from "react";
import { Card } from "react-bootstrap";
import CreateEditModal from "../../components/modals/CreateEditModal";
import DeleteModal from "../../components/modals/DeleteModal";
// Internal imports
import styles from "../../styles/Project.module.css";

/*
Tasks displayed as draggable cards
*/
function Task({ task }) {
  // Variables
  const { body, summary, id, is_project_contrib, is_project_creator } = task;

  // Set data to transfer on drag
  const handleDrag = (ev) => {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.setData("item", JSON.stringify(task));
  };

  return (
    <PatchStyles classNames={styles}>
      <Card
        draggable={is_project_contrib || is_project_creator ? true : false}
        onDragStart={handleDrag}
        id={`task${id}`}
        className="m-2 TaskCard"
      >
        <Card.Header> 
          <span className="float-left text-break">{summary}</span>
          {is_project_contrib || is_project_creator ? (
            <span className="EditOptions">
              <CreateEditModal type="edit" id={id} item="task" />
              <DeleteModal item="task" id={id} />
            </span>
          ) : (
            <></>
          )}
        </Card.Header>
        <Card.Body className="text-break">
          <pre className="TaskBody">{body}</pre>
        </Card.Body>
      </Card>
    </PatchStyles>
  );
}

export default Task;
