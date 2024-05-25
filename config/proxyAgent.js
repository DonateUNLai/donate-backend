const { ProxyAgent, setGlobalDispatcher } = require("undici");

const proxyAgent = () => {
	const proxyAgent = new ProxyAgent(process.env.PROXY_ADDRESS);
	setGlobalDispatcher(proxyAgent);
};

module.exports = proxyAgent;
