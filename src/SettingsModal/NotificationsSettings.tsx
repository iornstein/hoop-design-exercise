import {SmallLightButton, Toggle, ToggleProps} from "../SharedComponents/FormComponents.tsx";
import {Notifications, EmailNotifications, SlackNotifications} from "../domain/Notifications.ts";



type NotificationsProps = {
    currentNotifications: Notifications,
    updateNotifications: (updatedNotifications: Notifications) => void
};

export const NotificationsSettings = ({currentNotifications, updateNotifications}: NotificationsProps) => {

    const updateEmailNotifications = (email: EmailNotifications) => updateNotifications({...currentNotifications, email});
    const updateSlackNotifications = (slack: SlackNotifications) => updateNotifications({...currentNotifications, slack});

    const setImportantTasksEmail = (shouldNotify: boolean) => updateEmailNotifications({...currentNotifications.email, importantTasks: shouldNotify});
    const setMeetingSummaryEmail = (shouldNotify: boolean) => updateEmailNotifications({...currentNotifications.email, meetingSummary: shouldNotify});
    const setImportantTasksSlack = (shouldNotify: boolean) => updateSlackNotifications({...currentNotifications.slack, importantTasks: shouldNotify});
    const setMeetingSummarySlack = (shouldNotify: boolean) => updateSlackNotifications({...currentNotifications.slack, meetingSummary: shouldNotify});
    const setTasksDueSlack = (shouldNotify: boolean) => updateSlackNotifications({...currentNotifications.slack, tasksDue: shouldNotify});
    const setNewChatTasks = (shouldNotify: boolean) => updateSlackNotifications({...currentNotifications.slack, newChatTasks: shouldNotify});

    const disableAllNotifications = () => {
        updateNotifications({
            email: {importantTasks: false, meetingSummary: false},
            slack: {importantTasks: false, meetingSummary: false, tasksDue: false, newChatTasks: false}
        });
    }

    return (
        <>
            <div className="flex pb-3">
                <div className="flex-1 font-bold text-slate-250">Notification Type:</div>
                <div className="w-20">Email</div>
                <div className="w-20">Slack</div>
            </div>
            <div className="flex-grow">
                <ToggleRow
                    rowLabel={`"Important" Tasks`}
                    firstToggle={{
                        id: "importantTasksEmail",
                        value: currentNotifications.email.importantTasks,
                        setValue: setImportantTasksEmail
                    }}
                    secondToggle={{
                        id: "importantTasksSlack",
                        value: currentNotifications.slack.importantTasks,
                        setValue: setImportantTasksSlack
                    }}
                />
                <ToggleRow
                    rowLabel={`Meeting summary`}
                    firstToggle={{
                        id: "meetingSummaryEmail",
                        value: currentNotifications.email.meetingSummary,
                        setValue: setMeetingSummaryEmail
                    }}
                    secondToggle={{
                        id: "meetingSummarySlack",
                        value: currentNotifications.slack.meetingSummary,
                        setValue: setMeetingSummarySlack
                    }}
                />
                <ToggleRow
                    rowLabel={`Tasks due`}
                    secondToggle={{
                        id: "tasksDueSlack",
                        value: currentNotifications.slack.tasksDue,
                        setValue: setTasksDueSlack
                    }}
                />
                <ToggleRow
                    rowLabel={`New chat tasks`}
                    secondToggle={{
                        id: "newChatTasksSlack",
                        value: currentNotifications.slack.newChatTasks,
                        setValue: setNewChatTasks
                    }}
                />
            </div>
            <div className="flex items-center">
                <SmallLightButton onClick={disableAllNotifications} buttonText="Disable All Notifications"
                                  isActive={false}/>
            </div>

        </>
    );
};

type ToggleRowProps = { rowLabel: string, firstToggle?: ToggleProps, secondToggle?: ToggleProps };
const ToggleRow = ({rowLabel, firstToggle, secondToggle}: ToggleRowProps) => {
    return (
        <div className="flex pb-3 last:pb-0">
            <div className="flex-1">{rowLabel}</div>
            <div className="w-20">{firstToggle && <Toggle {...firstToggle}/>}</div>
            <div className="w-20">{secondToggle && <Toggle {...secondToggle}/>}</div>
        </div>
    );
}
