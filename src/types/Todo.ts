type ITODO = {
	id: string;
	task: TASK_DETAILS;

type TASK_DETAILS = {
		title: string;
		description: string;
		createdAt: string;
		isComplete: boolean;
		status: "Completed" | "In Progress" | "Not started";
		priority: "Extreme" | "Moderate" | "Low";

	}
export type { ITODO, TASK_DETAILS };
