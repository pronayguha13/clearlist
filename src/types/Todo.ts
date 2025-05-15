type ITODO = {
  title: string;
  description: string;
  createdAt: string;
  isComplete: boolean;
  status: "Completed" | "In Progress" | "Not started";
  priority: "Extreme" | "Moderate" | "Low";
};

export type { ITODO };
