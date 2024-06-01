const { Donation, projectId, Project, User } = require("../models/index");
const { trackTransaction } = require("../helper/chainHelper");
const { decodeFunctionData, getAddress, formatEther } = require("viem");
const donateContarct = require("../contract/donate.json");

async function getAllDonors(req, res) {
	try {
		const { projectId } = req.params;
		const project = await Project.findById(projectId).populate("users");
		if (!project) {
			return res.status(500).json({ error: "Project not found" });
		}

		return res.status(200).send({ donors: project.donors });
	} catch (err) {
		return res.status(500).send({ error: err.message });
	}
}

async function addDonation(req, res) {
	try {
		const { hash } = req.body;

		res.status(200).send({ message: "success" });

		trackTransaction(hash, async (transaction) => {
			const decodedInput = decodeFunctionData({
				abi: donateContarct.abi,
				data: transaction.input,
			});

			const functionName = decodedInput.functionName;

			let currency;
			let amount;
			if (functionName === "donateETH") {
				currency = "ETH";
				amount = formatEther(transaction.value);
			}

			const donor = await User.findOne({ address: getAddress(transaction.from) });
			const project = await Project.findOne({ address: transaction.to });

			const newDonation = await Donation.create({
				donor: donor._id,
				project: project._id,
				currency,
				amount,
				hash,
			});
			project.donations.push(newDonation._id);
			await project.save();
		});
	} catch (err) {
		return res.status(500).send({ error: err.message });
	}
}

module.exports = { getAllDonors, addDonation };
