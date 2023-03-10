// External imports
import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap/";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
// Internal imports
import appStyles from "../../App.module.css";

function ProjectPage() {
  // Variables
  const {id} = useParams();
  const [Project, setProject] = useState( {results: []} )

  useEffect(() => {
    const handleMount = async () => {
        try {
          const [{ data: project }] = await Promise.all([
            axiosReq.get(`projects/${id}`)
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
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles for mobile</p>
        <p>Post component</p>
        <Container className={appStyles.Content}>
          Comments
          {Project}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default ProjectPage;