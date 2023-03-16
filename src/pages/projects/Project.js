import React from "react";
import { Card, Col, Container } from "react-bootstrap";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import appStyles from "../../App.module.css";
import PatchStyles from "patch-styles";

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
  const is_creator = currentUser?.username === creator;

  return (
    // <PatchStyles classNames={styles}>
    <PatchStyles classNames={appStyles}>
      <Col
        xs={{ span: 10, offset: 1 }}
        className="BgGrey text-start p-2 rounded mb-5"
      >
        <h1>{title}</h1>
        <h2>by {creator}</h2>
        <p>total tasks: {task_count}</p>
        {task_count > 1 ? 
        <>
        {task_ids.map((id) => (
          <Card key={id}>
            <Card.Header>{id}</Card.Header>
          </Card>
        ))}
        </>
        :
        task_count > 0 ?
        <>
        <Card>
            <Card.Header>{task_ids[0]}</Card.Header>
          </Card>
          </>
          :
        <p>No tasks yet!</p>
}
        </Col>
    </PatchStyles>
    //   </PatchStyles>
  );
}

export default Project;
