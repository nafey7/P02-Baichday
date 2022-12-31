import React from 'react'
import './about.css'

function AboutUs() {
  return (
    <div >
    <div class="aboutus-section">
        <div class="container">
            <div class="row">
                <div class="col-md-3 col-sm-6 col-xs-12">
                    <div class="aboutus">
                        <h2 class="aboutus-title">About Us</h2>
                        <p class="aboutus-text">It all started with a dream. A beautiful dream to allow every person the ability to improve their circumstances.</p>
                        <p class="aboutus-text">BaichDay promises to bring to you the chance to sell your products at the highest price. You will never have cause to doubt your decisions. </p>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6 col-xs-12">
                    <div class="aboutus-banner">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9IqoSvSkzDueGxTSssTGCUPxA_YucqEZ93w&usqp=CAU" alt=""/>
                    </div>
                </div>
                <div class="col-md-5 col-sm-6 col-xs-12">
                    <div class="feature">
                        <div class="feature-box">
                            <div class="clearfix">
                                <div class="iconset">
                                    <span class="glyphicon glyphicon-cog icon"></span>
                                </div>
                                <div class="feature-content">
                                    <h4>Get What You Pay For</h4>
                                    <p>Our team works tirelessly to ensure that you recieve what you pay for! It is our hope that we are able to bring a smile on your face.</p>
                                </div>
                            </div>
                        </div>
                        <div class="feature-box">
                            <div class="clearfix">
                                <div class="iconset">
                                    <span class="glyphicon glyphicon-cog icon"></span>
                                </div>
                                <div class="feature-content">
                                    <h4>User Experience</h4>
                                    <p>Our startup prides itself in our ability to ensure a wholesome and conducive environment. Our team works tirelessly to ensure that your experience with us is never compromised.</p>
                                </div>
                            </div>
                        </div>
                        <div class="feature-box">
                            <div class="clearfix">
                                <div class="iconset">
                                    <span class="glyphicon glyphicon-cog icon"></span>
                                </div>
                                <div class="feature-content">
                                    <h4>Great support</h4>
                                    <p>Our team is available around the clock for any issues you may face. We vow to address your concerns at the very first opportunity.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default AboutUs