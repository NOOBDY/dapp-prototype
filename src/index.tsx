/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";

import "./index.css";

import Home from "./routes/Home";

const root = document.getElementById("root");

render(
    () => (
        <Router>
            <Route path="/" component={Home} />
        </Router>
    ),
    root!
);
