import { Show, createSignal, onMount } from "solid-js";
import { useProvider } from "@lib/useProvider";

function Home() {
    const provider = useProvider();

    const [address, setAddress] = createSignal<string>();
    const [balance, setBalance] = createSignal<bigint>();

    onMount(async () => {
        const addresses = await provider.send("eth_accounts", []);

        setAddress(addresses[0]);
    });

    const handleButton = async () => {
        const addresses = await provider.send("eth_requestAccounts", []);
        const balance = await provider.getBalance(addresses[0]);

        setAddress(addresses[0]);
        setBalance(balance);
    };

    return (
        <>
            <h1 class="bg-black text-red-500">Test</h1>
            <Show when={address()} fallback={<button onClick={handleButton}>Connect</button>}>
                <code>{address()}</code>
                <br />
                {balance()?.toString()}
            </Show>
        </>
    );
}

export default Home;
