import { ResolvedRegister } from "@wagmi/core";
import { FlowProps, createContext } from "solid-js";
import { config } from "./config";

export const WagmiContext = createContext<ResolvedRegister["config"] | undefined>();

function WagmiProvider(props: FlowProps) {
    return <WagmiContext.Provider value={config}>{props.children}</WagmiContext.Provider>;
}

export default WagmiProvider;
