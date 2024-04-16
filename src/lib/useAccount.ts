import { createSignal } from "solid-js";
import { useConfig } from "./useConfig";
import { watchAccount, type GetAccountReturnType } from "@wagmi/core";
import { createStore } from "solid-js/store";

// ! I think this creates a lot of duplicates
export function useAccount() {
    const [account, setAccount] = createSignal<GetAccountReturnType>();
    const config = useConfig();

    watchAccount(config, {
        onChange(account) {
            setAccount(account);
        }
    });

    return account;
}
