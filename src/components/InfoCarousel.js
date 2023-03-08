// External imports
import { Carousel, Row, Col } from 'react-bootstrap';
import React from 'react';
// Internal imports
import styles from '../styles/InfoCarousel.module.css';
import appStyles from '../App.module.css';
import PatchStyles from 'patch-styles';
import placeholder1 from "../assets/placeholderimage1.jpg";
import placeholder2 from "../assets/placeholderimage2.jpg";
import placeholder3 from "../assets/placeholderimage3.jpg";

// Carousel
function InfoCarousel() {
  return (
    <PatchStyles classNames={styles}>
      <PatchStyles classNames={appStyles}>

        <Row>
          <Col
            xs={{ span: 10, offset: 1 }}
            xl={{ span: 8, offset: 2 }}
          >
            <Carousel>
              <Carousel.Item>

              <div className='CarouselContainer'>
                <img
                  src={placeholder1}
                  alt="Placeholder 1"
                />
                </div>

                <Carousel.Caption className='CarouselText'>
                  <h3>Placeholder text</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>

                <div className='BgPurple CarouselContainer'>
                <img
                  src={placeholder2}
                  alt="Placeholder 2"
                />
                </div>

                <Carousel.Caption className='CarouselText'>
                  <h3>Second slide label</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                
                <div className='BgPurple CarouselContainer'>
                <img
                  src={placeholder3}
                  alt="Placeholder 3"
                />
                </div>
                <Carousel.Caption className='CarouselText'>
                  <h3>Third slide label</h3>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
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