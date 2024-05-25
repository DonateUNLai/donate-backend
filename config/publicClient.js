const { createPublicClient, webSocket } = require("viem");

const { sepolia } = require("viem/chains");

const client = createPublicClient({
	chain: sepolia,
	transport: webSocket(`wss://sepolia.infura.io/ws/v3/${process.env.INFURA_API_KEY}`),
});

module.exports = client;
