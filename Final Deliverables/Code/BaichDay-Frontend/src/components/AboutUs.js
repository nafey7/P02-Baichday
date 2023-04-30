import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './about.css';

function AboutUs() {
  return (
    <div className="about-us">
      <div className="about-us-section" >
        <Container >
          <Row >
            <Col >
              <div className="about-us-text"  >
                <h1 className="about-us-title" style={{float: "left"}}>About Us</h1>
                <br></br>
                <div className="about-us-image">
                  <img src="logo.png" alt="about us" style={{width: "100%", height: "450px", marginTop: "10%", borderRadius: "8px", boxShadow: "5px 5px 15px"}}/>
                </div>
                <br></br>
                <br></br>
                <div style={{width: "50%"}}>
                <p className="about-us-description" style={{textAlign: "justify", float: "left"}}>At Baichday, we are passionate about providing a platform that enables buyers and sellers from all around the world to connect and conduct business in a safe and secure manner. Our team is dedicated to creating an online marketplace that is user-friendly, intuitive, and transparent. We believe that the key to success in the online bidding industry is trust, and that's why we have made it our top priority to establish a platform that fosters transparency and openness. We want our users to feel confident and secure when using our platform, which is why we have implemented a number of measures to protect both buyers and sellers. Our platform is designed to be easy to use, with a streamlined bidding process that ensures a smooth and hassle-free experience for all users. We have also implemented various features to enhance the overall user experience, such as a messaging system that allows buyers and sellers to communicate directly with each other. At Baichday, we believe that the world is a better place when people can connect and do business with each other, regardless of geographic location or cultural background. We are committed to fostering a global community of buyers and sellers who can rely on our platform to conduct transactions with confidence and ease.</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="features-section">
        <Container>
          <h2 className="section-title" style={{fontSize: "25px"}}>Our Promises</h2>
          <br></br>
          <Row>
            <Col md={4}>
              <div className="feature-box">
                <div className="feature-icon">
                  <i className="fas fa-gift" style={{height: "0px", width: "0px"}}></i>
                </div>
                <div className="feature-content">
                  <h4 style={{fontSize: '18px'}}>Quality Products</h4>
                  <p style={{fontSize: '12px'}}>Our team works tirelessly to ensure that you receive only the best quality products. We believe in delivering excellence and quality to our customers.</p>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="feature-box">
                <div className="feature-icon">
                  <i className="fas fa-heart"></i>
                </div>
                <div className="feature-content">
                  <h4 style={{fontSize: '18px'}}>User Experience</h4>
                  <p style={{fontSize: '12px'}}>We prioritize our customer's experience above all else. Our team works around the clock to make sure your experience with us is smooth and enjoyable.</p>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="feature-box">
                <div className="feature-icon">
                  <i className="fas fa-headset"></i>
                </div>
                <div className="feature-content">
                  <h4 style={{fontSize: '18px'}}>Customer Support</h4>
                  <p style={{fontSize: '12px'}}>We are committed to delivering top-notch customer support, with a focus on personalized assistance and timely resolution of issues.</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default AboutUs;
