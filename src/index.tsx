import "./styles/index.css";
import { render } from "preact";
import Router from "preact-router";
import { Home } from "./pages/Home.tsx";
import NavigationBar from "./components/NavigationBar.tsx";
import { FallingSnippets } from "./components/FallingSnippets.tsx";

function Index() {
  return (
    <>
      <NavigationBar />
      <FallingSnippets />
      <Router>
        <Home path="/" />
      </Router>
    </>
  );
}

render(<Index />, document.getElementById("home")!);
