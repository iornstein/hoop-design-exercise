import {act, render, screen} from "@testing-library/react";
import {SettingsModal} from "../SettingsModal.tsx";
import {defaultUserProfile} from "../../domain/UserProfile.ts";



describe("Settings Modal", () => {
    it("should be able to switch between the settings tabs", async () => {
        render(<SettingsModal closeModal={vi.fn()} logOut={vi.fn()} updateNotifications={vi.fn()} userProfile={defaultUserProfile}/>);

        act( () => screen.getByText("Notifications").click());
        expect(await screen.findByText(/Notification Type/i)).toBeInTheDocument()
        expect(screen.queryByText(/Subscription/i)).not.toBeInTheDocument()

        act( () => screen.getByText("Account").click());
        expect(screen.getByText(/You have a free subscription/i)).toBeInTheDocument()
        expect(screen.queryByText(/Notification Type/i)).not.toBeInTheDocument()
    });

    it("defaults to the account tab being open", async () => {
        render(<SettingsModal closeModal={vi.fn()} logOut={vi.fn()} updateNotifications={vi.fn()} userProfile={defaultUserProfile}/>);

        expect(screen.getByText(/You have a free subscription/i)).toBeInTheDocument()
        expect(screen.queryByText(/Notification Type/i)).not.toBeInTheDocument()
    });

    it("allows user to disable all notifications", async () => {
        const updateNotifications = vi.fn();
        render(<SettingsModal closeModal={vi.fn()} logOut={vi.fn()} updateNotifications={updateNotifications} userProfile={defaultUserProfile}/>);

        act( () => screen.getByText("Notifications").click());
        act( () => screen.getByText("Disable All Notifications").click());

        expect(updateNotifications).toHaveBeenCalledWith({
            email: {importantTasks: false, meetingSummary: false},
            slack: {importantTasks: false, meetingSummary: false, tasksDue: false, newChatTasks: false}
        });
    });
});