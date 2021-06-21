import { ColorModeScript, CSSReset } from "@chakra-ui/react";
import { css, Global } from "@emotion/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import tz from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import * as React from "react";
import ReactDOM from "react-dom";
import App from "./App";
dayjs.extend(utc);
dayjs.extend(tz);
dayjs.extend(relativeTime);

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript />
    <CSSReset />
    <Global
      styles={css`
        html {
          width: 100%;
          height: 100%;
          max-width: 100%;
          max-height: 100%;
          overflow: hidden;
        }
        html,
        body,
        #root {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
      `}
    />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
