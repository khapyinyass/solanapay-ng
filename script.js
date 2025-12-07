let walletPublicKey = null;

document.getElementById("connectWallet").onclick = async () => {
  if (window.solana && window.solana.isPhantom) {
    const response = await window.solana.connect();
    walletPublicKey = response.publicKey.toString();
    document.getElementById("walletAddress").innerText = 
      "Connected: " + walletPublicKey;
  } else {
    alert("Please install Phantom Wallet");
  }
};

document.getElementById("generateQR").onclick = async () => {
  if (!walletPublicKey) {
    alert("Connect wallet first");
    return;
  }
  const amount = 0.1;
  const solanaPayURL = `solana:${walletPublicKey}?amount=${amount}`;
  QRCode.toCanvas(solanaPayURL, function (err, canvas) {
    if (err) console.error(err);
    document.getElementById("qrCode").innerHTML = "";
    document.getElementById("qrCode").appendChild(canvas);
  });
};
