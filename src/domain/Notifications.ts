export type EmailNotifications = {
    importantTasks: boolean,
    meetingSummary: boolean
};

export type SlackNotifications = {
    importantTasks: boolean,
    meetingSummary: boolean,
    tasksDue: boolean,
    newChatTasks: boolean
};

export type Notifications = {
    email: EmailNotifications,
    slack: SlackNotifications
};