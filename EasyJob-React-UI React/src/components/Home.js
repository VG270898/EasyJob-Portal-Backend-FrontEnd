import React, { useEffect } from "react";
import home from "../images/home.svg";
import "./style.css";

const Home = () => {
  useEffect(() => {
    document.title = "Home | EasyJob";
    localStorage.setItem("jwt", JSON.stringify(""));
    localStorage.setItem("user", JSON.stringify(""));
  });
  return (
    <section id="hero" className="hero d-flex align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 d-flex flex-column justify-content-center">
            <h1>Where Talent Meets Opportunity</h1>
            <h2>
              EasyJob helps candidate get their jobs, enables employers to
              recruit faster, and helps colleges streamline campus placements
            </h2>
            <div>
              <div className="text-center text-lg-start">
                <a
                  href="/register"
                  className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center"
                >
                  <span>Get Started</span>
                  <i className="bi bi-arrow-right" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-6 hero-img">
            <img src={home} className="img-fluid" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
