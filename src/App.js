// import React from "react";
import React, {  useState, useCallback, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { connectWithMetamask, getBalance, sendMoni } from "./utils";
const { ethereum } = window
// import Avalan che from "avalanche"
function App() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [userName, setUserName] = useState();
  const [score, setScore] = useState();

  const { unityProvider, isLoaded, loadingProgression,  addEventListener, removeEventListener, sendMessage } = useUnityContext({
    loaderUrl: "builds/builds.loader.js",
    dataUrl: "builds/builds.data",
    frameworkUrl: "builds/builds.framework.js",
    codeUrl: "builds/builds.wasm",
  });

  // We'll round the loading progression to a whole number to represent the
  // percentage of the Unity Application that has loaded.
  const loadingPercentage = Math.round(loadingProgression * 100);

   const handleGameOver = useCallback((userName, score) => {
    setIsGameOver(true);
    setUserName(userName);
    setScore(score);
  }, []);
  let i = 1;

  useEffect(() => {
    addEventListener("GameOver", handleGameOver);
    return () => {
      removeEventListener("GameOver", handleGameOver);
    };
  }, [addEventListener, removeEventListener, handleGameOver]);

  useEffect(() => {
    addEventListener("connectWithMetamask", connectWithMetamask);
    return () => {
      removeEventListener("connectWithMetamask", connectWithMetamask);
    };
  }, [addEventListener, removeEventListener, connectWithMetamask]);

  async function handleGetBalance() {
    // let accounts = [];
    // accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    // console.log(accounts);
    // console.log("yes");
    sendMoni(0.01.toString());
    var x = await getBalance();
    sendMessage("GameObject", "receiveBalance", x.toString());
    console.log(x);
  }
  useEffect(() => {
    addEventListener("getBalance", handleGetBalance);
    return () => {
      removeEventListener("getBalance", handleGetBalance);
    };
  }, [addEventListener, removeEventListener, handleGetBalance]);

  return (
    <div className="container">
      {isLoaded === false && (
        // We'll conditionally render the loading overlay if the Unity
        // Application is not loaded.
        <div className="loading-overlay">
          <p>Loading... ({loadingPercentage}%)</p>
        </div>
      )}
      <Unity className="unity" unityProvider={unityProvider} style={{ width: 800, height: 600 }} />
      {isGameOver === true && (
        <p>{`Game Over ${userName}! You've scored ${i} points.`}</p>
      )}
    </div>
  );
}
export default App;
