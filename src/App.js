import logo from "./logo.svg";
import { useState } from "react";
import "./App.css";
import axios from "axios";
import { saveAs } from "file-saver";
import env from "react-dotenv";

function App() {
  const [websiteUrl, setWebsiteURL] = useState();
  const [image, setImage] = useState();
  const [loading, setLoading] = useState();
  const downloadImage = () => {
    saveAs("Screenshot", "screenshot.jpg"); // Put your image url here.
  };

  const getScreenShot = async () => {
    setLoading(true);
    axios({
      method: "GET",
      url: `https://shot.screenshotapi.net/screenshot?token=${env.SCREEN_SHOT_API}=${websiteUrl}`,
    })
      .then((res) => {
        setImage(res.data.screenshot);
        setLoading(false);
        // console.log(res.data.screenshot, "this is data");
      })
      .catch((Err) => {
        alert("Some error occurred!");
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <h1>Make Amazing Screenshot!</h1>
      <input
        type="text"
        onChange={(e) => setWebsiteURL(e.target.value)}
        style={{ width: "90%", padding: "12px" }}
        placeholder="Enter URL to take screenshot"
      />
      <button
        style={{
          width: "50vw",
          padding: "12px",
          background: "black",
          color: "white",
          fontWeight: "bold",
          marginTop: "30px",
          cursor: "pointer",
        }}
        onClick={getScreenShot}
      >
        {loading ? "Loading..." : "Get Screenshot"}
      </button>

      {image ? (
        <>
          <img
            src={image}
            alt="no"
            style={{ width: "50%", height: "50%", marginTop: "40px" }}
          />{" "}
          <button
            onClick={downloadImage}
            style={{
              width: "50vw",
              padding: "12px",
              background: "black",
              color: "white",
              fontWeight: "bold",
              marginTop: "30px",
              cursor: "pointer",
            }}
          >
            Download
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
