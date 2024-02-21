import "./LandingStyle.css";
import ship from "../../assets/rmship.png";
import header from "../../assets/rmLogo.png";
import Stars from "../stars";

function Landing() {
  function handleClick() {
    window.scroll({
      top: document.body.offsetHeight,
      left: 0,
    });
  }

  return (
    <div className="landing">
      <div className="headLine">
        <img src={header} alt="Rick & Morty" className="header" />
      </div>
      <div className="midContainer">
        <div className="textContainer">
          <div className="text">
            <h1>Welcome to my Rick & Morty API Project</h1>
            <p>
              Here you can find a lot of information about your favourite Rick &
              Morty character. <br />
              You'll find several options to filter i used the "react modern
              drawer" package for the drawer on the mobile Version. <br />
              The shown character Cards are presented with a Swiper.js
              component.
            </p>
          </div>
          <div className="btnContainer">
            <button onClick={handleClick}>
              Scroll smooth to the API information !!
            </button>
          </div>
        </div>
        <img src={ship} alt="Rick & Morty in a spaceship" className="ship" />
      </div>
      <div className="lowContainer">
        <div className="lowText">
          This is my personal approach to create a react app with the infamous
          Rick & Morty API.
        </div>
      </div>
      <Stars />
    </div>
  );
}

export default Landing;
