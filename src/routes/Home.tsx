import { Show, createMemo, createSignal, onMount } from "solid-js";
import { useProvider } from "@lib/useProvider";
import { ethers } from "ethers";

function Home() {
    const provider = useProvider();

    const [address, setAddress] = createSignal<ethers.AddressLike | null>(null);
    const [balance, setBalance] = createSignal<ethers.BigNumberish>();

    const balanceString = createMemo(() => {
        const b = balance();
        if (!b) {
            return null;
        }
        return ethers.formatEther(b) + " ETH";
    });

    onMount(async () => {
        const addresses: ethers.AddressLike[] = await provider.send("eth_accounts", []);
        const balance = await provider.getBalance(addresses[0]);

        setAddress(addresses[0]);
        setBalance(balance);
    });

    const handleConnect = async () => {
        const addresses = await provider.send("eth_requestAccounts", []);
        const balance = await provider.getBalance(addresses[0]);

        setAddress(addresses[0]);
        setBalance(balance);
    };

    const handleDisconnect = async () => {
        await provider.send("wallet_revokePermissions", [{ eth_accounts: address() }]);
        setAddress(null);
    };

    return (
        <div class="py-20">
            <div class="mx-auto flex h-[40rem] w-[60rem] flex-col rounded-lg bg-slate-800 p-10 text-slate-100">
                <Show
                    when={address()}
                    fallback={
                        <>
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
                        </>
                    }
                >
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
                </Show>
            </div>
        </div>
    );
}

export default Home;
