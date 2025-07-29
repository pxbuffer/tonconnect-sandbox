import { toNano } from "@ton/core";
import { TonConnectUI } from "@tonconnect/ui";
import "./App.css";

const tonConnect = new TonConnectUI({
  manifestUrl: "https://15a08885a8c5.ngrok-free.app/tonconnect-manifest.json",
  actionsConfiguration: {
    modals: [],
  },
});

function App() {
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
                redirectToWallet();
              },
            }
          )
        }
      >
        send transaction
      </button>
    </>
  );
}

export default App;
