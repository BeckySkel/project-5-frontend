import React from 'react'

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

  return (
    <div>Task: {summary}</div>
  )
}

export default Task