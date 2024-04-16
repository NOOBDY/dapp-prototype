import { ethers } from "ethers";

declare global {
    interface Window {
        ethereum: ethers.Eip1193Provider | undefined;
    }
}

export const useProvider = () => {
    if (window.ethereum) {
        let provider = new ethers.BrowserProvider(window.ethereum);

        return provider;
    } else {
        // TODO: Maybe use `ethers.getDefaultProvider()` or something
        throw new Error("Metamask is not installed!");
    }
};
