import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import WagmiProvider from "./lib/WagmiProvider";

export default function App() {
    return (
        <Router
            root={props => (
                <WagmiProvider>
                    <Suspense>{props.children}</Suspense>
                </WagmiProvider>
            )}
        >
            <FileRoutes />
        </Router>
    );
}
