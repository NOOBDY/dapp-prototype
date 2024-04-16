import {
    GetAccountReturnType,
    connect,
    disconnect,
    getAccount,
    getBalance,
    reconnect,
    watchAccount
} from "@wagmi/core";
import { injected } from "@wagmi/connectors";
import { config } from "~/lib/config";
import { Match, Show, Switch, createResource, createSignal, onMount } from "solid-js";
import { Address } from "abitype";
import { formatEther } from "viem";

export default function Home() {
    const [address, setAddress] = createSignal<Address>();
    const [status, setStatus] = createSignal<GetAccountReturnType["status"]>("reconnecting");

    const [balanceString, { refetch }] = createResource(async () => {
        const a = address();

        if (a) {
            const { value, symbol } = await getBalance(config, { address: a });
            return formatEther(value) + " " + symbol;
        }
    });

    watchAccount(config, {
        onChange(account) {
            setAddress(account.address);
            setStatus(account.status);
            refetch();
        }
    });

    onMount(async () => {
        await reconnect(config, { connectors: [injected()] });
    });

    const handleConnect = async () => {
        await connect(config, { connector: injected() });
    };

    const handleDisconnect = async () => {
        await disconnect(config);

        setAddress(undefined);
    };

    return (
        <main class="py-20">
            <div class="mx-auto flex h-[40rem] w-[60rem] flex-col rounded-lg bg-slate-800 p-10 text-slate-100">
                <Switch>
                    <Match when={status() === "reconnecting"}>
                        <div class="flex grow justify-center p-20">
                            <h1 class="text-6xl text-slate-500">Reconnecting</h1>
                        </div>
                    </Match>

                    <Match when={status() === "disconnected"}>
                        <div class="flex grow justify-center p-20">
                            <h1 class="text-6xl text-slate-500">Connect to Metamask</h1>
                        </div>

                        <div class="flex w-full justify-center">
                            <button
                                onClick={handleConnect}
                                class="rounded bg-slate-600 px-4 py-2 text-slate-200
                                    transition-all hover:bg-slate-700 hover:text-slate-300"
                            >
                                Connect
                            </button>
                        </div>
                    </Match>

                    <Match when={status() === "connected"}>
                        <div class="grow">
                            <p class="text-lg">
                                Address:{" "}
                                <code class="rounded-sm bg-gray-600 px-1 text-slate-300">
                                    {address()?.toString()}
                                </code>
                            </p>

                            <p class="mb-10 text-lg">{balanceString()}</p>
                        </div>

                        <div class="flex w-full justify-center">
                            <button
                                onClick={handleDisconnect}
                                class="rounded bg-slate-600 px-4 py-2 text-slate-200
                            transition-all hover:bg-slate-700 hover:text-slate-300"
                            >
                                Disconnect
                            </button>
                        </div>
                    </Match>
                </Switch>
            </div>
        </main>
    );
}
