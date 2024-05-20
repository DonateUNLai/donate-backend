const { createPublicClient, http } = require("viem");

const { sepolia } = require("viem/chains");

const client = createPublicClient({
	chain: sepolia,
	transport: http(`https://sepolia.infura.io.infura.io/v3/${process.env.INFURA_API_KEY}`),
});

module.exports = client;
