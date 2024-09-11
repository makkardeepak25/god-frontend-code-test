// import "../public/css/styles.css";
import React from "react";
import { StyleProvider, ThemeProvider } from "vcc-ui";
import volvo from "vcc-ui/dist/themes/volvo";
import App from "../src/App";
import { BrowserRouter } from "react-router-dom";

function HomePage() {
  return (
    <React.StrictMode>
      {typeof document !== "undefined" && (
        <StyleProvider>
          <ThemeProvider theme={volvo}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeProvider>
        </StyleProvider>
      )}
    </React.StrictMode>
  );
}

export default HomePage;
