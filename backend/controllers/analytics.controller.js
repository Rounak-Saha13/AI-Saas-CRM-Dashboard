import { Lead } from "../models/Lead.js";
import { Contact } from "../models/Contact.js";
import { Task } from "../models/Task.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const leadStages = ["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"];

export const getOverview = asyncHandler(async (req, res) => {
	const owner = req.user._id;

	const [leads, contactCount, openTasks] = await Promise.all([
		Lead.find({ owner }),
		Contact.countDocuments({ owner }),
		Task.countDocuments({ owner, status: { $ne: "Completed" } }),
	]);

	const byStage = Object.fromEntries(
		leadStages.map((stage) => [stage, { count: 0, value: 0 }])
	);
	let totalValue = 0;
	let wonValue = 0;

	for (const lead of leads) {
		const bucket = byStage[lead.status] || (byStage[lead.status] = { count: 0, value: 0 });
		bucket.count += 1;
		bucket.value += lead.value || 0;
		totalValue += lead.value || 0;

		if (lead.status === "Won") {
			wonValue += lead.value || 0;
		}
	}

	const won = byStage.Won.count;
	const lost = byStage.Lost.count;
	const closed = won + lost;
	const conversionRate = closed ? Math.round((won / closed) * 100) : 0;
	const trend = buildLeadTrend(leads);
	const recentLeads = [...leads]
		.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
		.slice(0, 6)
		.map((lead) => ({
			id: lead._id,
			name: lead.name,
			company: lead.company,
			status: lead.status,
			value: lead.value,
			updatedAt: lead.updatedAt,
		}));

	res.json({
		success: true,
		stats: {
			revenuewon: wonValue,
			pipelineValue: totalValue,
			totalLeads: leads.length,
			totalContacts: contactCount,
			openTasks,
			conversionRate,
			pipeline: leadStages.map((stage) => ({
				stage,
				count: byStage[stage].count,
				value: byStage[stage].value,
			})),
			trend,
			recentLeads,
		},
	});
});

const buildLeadTrend = (leads) => {
	const months = lastSixMonths();
	const trend = months.map(({ key, label }) => ({
		key,
		month: label,
		leads: 0,
		won: 0,
	}));
	const indexByKey = Object.fromEntries(months.map((month, index) => [month.key, index]));

	for (const lead of leads) {
		const date = new Date(lead.createdAt);
		const key = `${date.getFullYear()}-${date.getMonth()}`;
		const index = indexByKey[key];

		if (index === undefined) {
			continue;
		}

		trend[index].leads += 1;
		if (lead.status === "Won") {
			trend[index].won += 1;
		}
	}

	return trend;
};

const lastSixMonths = () => {
	const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const now = new Date();
	const months = [];

	for (let index = 5; index >= 0; index -= 1) {
		const date = new Date(now.getFullYear(), now.getMonth() - index, 1);
		months.push({
			key: `${date.getFullYear()}-${date.getMonth()}`,
			label: labels[date.getMonth()],
		});
	}

	return months;
};