export const STATUS_CHOICES = Object.freeze({
  "NOTSTARTED": 3,
  "INPROGRESS": 2,
  "COMPLETED": 31
})

export const PRIORITY_CHOICES = Object.freeze({
  "EXTREME": 1,
  "MODERATE": 2,
  "LOW": 3
})


// Type helpers to extract the values from the enums
export type StatusValue = typeof STATUS_CHOICES[keyof typeof STATUS_CHOICES];
export type PriorityValue = typeof PRIORITY_CHOICES[keyof typeof PRIORITY_CHOICES]

export type ITODO = {
  id: number,
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate: Date;
  isComplete: boolean;
  status: StatusValue;
  priority: PriorityValue;
};


export const getStatusColor = (status: number) => {
  switch (status) {
    case STATUS_CHOICES.COMPLETED:
      return {
        color: "var(--color-status-completed)",
      };
    case STATUS_CHOICES.INPROGRESS:
      return {
        color: "var(--color-status-in-progress)",
      };
    default:
      return {
        color: "var(--color-status-not-started)",
      };
  }
};

export const getPriorityColor = (priority: number) => {
  switch (priority) {
    case PRIORITY_CHOICES.EXTREME:
      return {
        color: "var(--color-status-not-started)",
      };
    case PRIORITY_CHOICES.MODERATE:
      return {
        color: "var(--color-status-in-progress)",
      };
    default:
      return {
        color: "var(--color-status-completed)",
      };
  }
};

export const getStatus = (status: number) => {
  return Object.entries(STATUS_CHOICES).filter(status_choice => status_choice[1] === status)[0][0]
}

export const getPriority = (priority: number) => {
  return Object.entries(PRIORITY_CHOICES).filter(priority_choice => priority_choice[1] === priority)[0][0]
}

export const getStatusValue = (status: number) => {
  return Object.values(STATUS_CHOICES).filter(statusChoice => statusChoice === status)[0]
}

export const getPriorityValue = (priority: number) => {
  return Object.values(STATUS_CHOICES).filter(statusChoice => statusChoice === priority)[0]
}
export interface TaskStatus {
  completed: number;
  inProgress: number;
  notStarted: number;
}
