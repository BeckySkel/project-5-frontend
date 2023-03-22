import React from "react";
import { Card } from "react-bootstrap";

function Task(props) {
  // Variables
  const { body, summary, id } = props.task;

  // Prevent dropping tasks in one another
  // https://stackoverflow.com/questions/39325413/how-can-i-set-child-element-as-droppable-to-false
  const noAllowDrop = (ev) => {
    ev.stopPropagation();
  };

  // Set data to transfer
  // https://www.w3schools.com/html/html5_draganddrop.asp
  const handleDrag = (ev) => {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.setData("item", JSON.stringify(props.task));
  };


  return (
    <Card
      draggable
      onDragStart={handleDrag}
      onDragOver={noAllowDrop}
      id={`task${id}`}
      className={`${props.container} m-2`}
    >
      <Card.Header>{summary}</Card.Header>
      <Card.Body>{body}</Card.Body>
    </Card>
  );
}

export default Task;


// body,
// completed,
// created_on,
// creator,
// due_date,
// id,
// is_creator,
// is_project_contrib,
// is_project_creator,
// profile_id,
// project,
// project_title,
// summary,
// updated_on
