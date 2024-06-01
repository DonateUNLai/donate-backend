const { Project, User, Allocation } = require("../models/index");

async function addReceiver(req, res) {
	try {
		const { projectId, address, currency, amount } = req.body;

		const receiver = await User.findOne({ address });

		if (!receiver) {
			return res.status(500).send({ error: "The address has not been registered." });
		}

		const newAllocation = await Allocation.create({
			receiver: receiver._id,
			project: projectId,
			currency,
			amount,
		});

		const project = await Project.findById(projectId);
		if (!project) {
			return res.status(500).json({ error: "Project not found" });
		}

		project.allocations.push(newAllocation._id);
		await project.save();

		return res.status(200).send({ message: "success" });
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
