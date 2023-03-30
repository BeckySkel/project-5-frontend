// External imports
import { Carousel, Row, Col } from "react-bootstrap";
import React from "react";
import PatchStyles from "patch-styles";
// Internal imports
import styles from "../styles/InfoCarousel.module.css";
import appStyles from "../App.module.css";
import dashboard from "../assets/dashboard.png";
import projectview from "../assets/projectview.png";

/*
Carousel which displays screenshots and information of app features
*/
function InfoCarousel() {
  return (
    <PatchStyles classNames={styles}>
      <PatchStyles classNames={appStyles}>
        <Row className="d-flex align-items-center h-100">
          <Col xs={{ span: 10, offset: 1 }} xl={{ span: 6, offset: 3 }}>
            <Carousel>
              <Carousel.Item>
                <div className="BgPurple CarouselContainer">
                  <img src={dashboard} alt="View of dashboard" />
                </div>

                <Carousel.Caption className="CarouselText rounded">
                  <h3>View your projects at a glance</h3>
                  <p>
                    Check on progress at the dashboard.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <div className="BgPurple CarouselContainer">
                  <img src={projectview} alt="View of the project layout" />
                </div>

                <Carousel.Caption className="CarouselText rounded">
                  <h3>Share your thoughts and plans with others</h3>
                  <p>
                    Keep a project private or share with other users!
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </PatchStyles>
    </PatchStyles>
  );
}

export default InfoCarousel;
