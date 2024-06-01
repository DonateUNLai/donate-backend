const { Project, User, Allocation } = require("../models/index");
const { decodeFunctionData, getAddress, formatEther } = require("viem");

async function addReceiver(req, res) {
	try {
		const { hash } = req.body;

		res.status(200).send({ message: "success" });

		trackTransaction(hash, async (transaction) => {
			const decodedInput = decodeFunctionData({
				abi: donateContarct.abi,
				data: transaction.input,
			});

			const [receiverAddress, amount, currency] = decodedInput.args;

			const receiver = await User.findOne({ address: getAddress(receiverAddress) });
			const project = await Project.findOne({ address: transaction.to });
			if (!project) {
				return res.status(500).json({ error: "Project not found" });
			}

			const newAllocation = await Allocation.create({
				receiver: receiver._id,
				project: project._id,
				currency,
				amount,
			});

			project.allocations.push(newAllocation._id);
			await project.save();
		});
	} catch (err) {
		return res.status(500).send({ error: err.message });
	}
}

async function getAllReceivers(req, res) {
	const { projectId } = req.params;
	const project = await Project.findById(projectId).populate("allocations");
	if (!project) {
		return res.status(500).json({ error: "Project not found" });
	}

	return res.status(200).send({ allocations: project.allocations });
}

module.exports = { addReceiver, getAllReceivers };
