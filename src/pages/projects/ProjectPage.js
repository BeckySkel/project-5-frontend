// External imports
import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap/";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
// Internal imports
// import appStyles from "../../App.module.css";
import Project from "./Project";

function ProjectPage() {
  // Variables
  const {id} = useParams();
  const [project, setProject] = useState( {results: []} )

  useEffect(() => {
    const handleMount = async () => {
        try {
          const [{ data: project }] = await Promise.all([
            axiosReq.get(`/projects/${id}`)
        ])
        setProject({results: [project]})
        console.log(project);
        } catch (err) {
          console.log(err);
        }
      };
  
      handleMount();
  }, [id]);

  return (
    <Row className="h-100">
          <Project {...project.results[0]} setProject={setProject} />
    </Row>
  );
}

export default ProjectPage;