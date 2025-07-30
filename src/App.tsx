import { toNano } from "@ton/core";
import { TonConnectUI } from "@tonconnect/ui";
import { useRef } from "react";
import "./App.css";

const tonConnect = new TonConnectUI({
  manifestUrl: "https://25a399acc8e4.ngrok-free.app/tonconnect-manifest.json",
  actionsConfiguration: {
    modals: [],
  },
});

function App() {
  const ref = useRef();

  return (
    <>
      <button onClick={() => tonConnect.openModal()}>connect wallet</button>
      <button
        onClick={() =>
          tonConnect.sendTransaction(
            {
              validUntil: Math.floor(Date.now() / 1000 + 5 * 60), // 5 min
              messages: [
                {
                  address: "UQBavWKo_zUUpi1Rl-6UwJ1uHTtQ4IUvWcGC1eF-oMfgYMsL",
                  amount: toNano(1).toString(),
                },
              ],
            },
            {
              onRequestSent: (redirectToWallet) => {
                ref.current = redirectToWallet;
              },
            }
          )
        }
      >
        send transaction
      </button>
      <button onClick={() => ref.current()}>send tx second time</button>
    </>
  );
}

export default App;
