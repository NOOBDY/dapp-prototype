/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import { lazy } from "solid-js";

import "./index.css";

const Home = lazy(() => import("./routes/Home"));

const root = document.getElementById("root");

render(
    () => (
        <Router>
            <Route path="/" component={Home} />
        </Router>
    ),
    root!
);
