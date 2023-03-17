import React from 'react'
import { Card } from 'react-bootstrap';

function Task(props) {
    // Variables
    const {
        body,
        completed,
        created_on,
        creator,
        due_date,
        id,
        is_creator,
        is_project_contrib,
        is_project_creator,
        profile_id,
        project,
        project_title,
        summary,
        updated_on
      } = props;
      console.log(props);
      
  return (
    <Card>
      <Card.Header>
        {summary}
      </Card.Header>
      <Card.Body>
        {body}
      </Card.Body>
    </Card>
  )
}

export default Task