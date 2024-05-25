const { Project, User } = require("../models/index");
const { trackTransaction } = require("../helper/chainHelper");
const publicClient = require("../config/publicClient");
const donateContarct = require("../contract/donate.json");
const { getContract, getAddress, formatUnits } = require("viem");

async function addProject(req, res) {
	try {
		const { hash } = req.body;

		res.status(200).send({ message: "success" });

		trackTransaction(hash, async () => {
			const transaction = await publicClient.getTransactionReceipt({ hash });
			const contractAddress = transaction.logs.find((h) => hash == h.transactionHash).address;
			const contract = getContract({ address: contractAddress, abi: donateContarct.abi, client: publicClient });
			const [title, description, endTime, totalAmount] = await Promise.all([contract.read.title(), contract.read.description(), contract.read.endTime(), contract.read.totalAmount()]);
			const creator = await User.findOne({ address: getAddress(transaction.from) });

			await Project.create({
				address: contractAddress,
				title,
				description,
				endTime: Number(endTime),
				totalAmount: Number(totalAmount),
				hash,
				creator: creator._id,
			});
		});
	} catch (err) {
		return res.status(500).send({ error: err.message });
	}
}

async function getProjects(req, res) {
	try {
		const projects = await Project.find();
		return res.status(200).send(projects);
	} catch (err) {
		return res.status(500).send({ error: err.message });
	}
}

module.exports = { addProject, getProjects };
