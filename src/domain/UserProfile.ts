import {Notifications} from "./Notifications.ts";

export type Subscription = { type: "free" } | {type: "paid", expires: Date};

export type UserProfile = {
    name: string,
    notifications: Notifications,
    profilePicturePath: string
    subscription: Subscription,
    userEmail: string
};

export const defaultUserProfile: UserProfile = {
    name: "Byron Jenkins",
    userEmail: "bjenkins@acme.com",
    profilePicturePath: `${window.location}src/assets/profileImage.png`,
    subscription: { type: "free" },
    notifications: {
        email: {
            importantTasks: true,
            meetingSummary: true
        },
        slack: {
            importantTasks: true,
            meetingSummary: true,
            tasksDue: true,
            newChatTasks: true
        }
    }
}