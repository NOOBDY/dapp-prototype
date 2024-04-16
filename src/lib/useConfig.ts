import { useContext } from "solid-js";
import { WagmiContext } from "./WagmiProvider";

export function useConfig() {
    const context = useContext(WagmiContext);
    if (!context) {
        throw new Error("No context found");
    }

    return context;
}
