const publicClient = require("../config/publicClient");

const POLLING_INTERVAL = 1000;

async function trackTransaction(hash, callback) {
	let confirmed = false;

	while (!confirmed) {
		const transaction = await publicClient.getTransaction({ hash });

		if (transaction && transaction.blockNumber) {
			confirmed = true;
			callback(transaction);
		} else {
			console.log("loading...");
		}

		if (!confirmed) {
			await new Promise((resolve) => setTimeout(resolve, POLLING_INTERVAL));
		}
	}
}

module.exports = { trackTransaction };
