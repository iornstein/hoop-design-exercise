import {ReactNode, useState} from "react";
import notificationIcon from "../assets/notification-icon.svg";
import notificationIconActive from "../assets/notification-icon-active.svg";
import accountIcon from "../assets/account-icon.svg";
import accountIconActive from "../assets/account-icon-active.svg";
import logoutIcon from "../assets/logout-icon.svg";
import {Button} from "../SharedComponents/FormComponents.tsx";
import {SettingsContent} from "./SettingsContent.tsx";
import {NotificationsSettings} from "./NotificationsSettings.tsx";
import {AccountSettings} from "./AccountSettings.tsx";
import {UserProfile} from "../domain/UserProfile.ts";
import {Notifications} from "../domain/Notifications.ts";


export const SettingsModal = (props: { closeModal: () => void , userProfile: UserProfile, updateNotifications: (notifications: Notifications) => void, logOut: () => void}) => {

    enum SettingsTab {
        Account,
        Notifications
    }

    const [userProfile, setUserProfile] = useState<UserProfile>(props.userProfile);

    const [currentSettingsTab, setCurrentSettingsTab] = useState<SettingsTab>(SettingsTab.Account)

    type SettingsNavigationButtonProps = {
        tabToNavigateTo: SettingsTab,
        navigationText: string,
        defaultImageSrc: string,
        activeImageSrc: string
    };

    const SettingsTabNavigation = ({
                                       tabToNavigateTo,
                                       navigationText,
                                       defaultImageSrc,
                                       activeImageSrc
                                   }: SettingsNavigationButtonProps) => {
        const isSelected = tabToNavigateTo === currentSettingsTab;
        return (
            <div className="mb-2 last-of-type:mb-0">
                <Button
                    onClick={() => setCurrentSettingsTab(tabToNavigateTo)}
                    buttonText={navigationText}
                    isActive={isSelected}
                    image={{src: isSelected ? activeImageSrc : defaultImageSrc, altText: ""}}
                    //This is a decorative image, so alt text empty is correct so screen readers ignore it
                />
            </div>
        )
    }

    const SettingsSideBar = () => {
        return (
            <div className="bg-gray-900 flex-none h-full w-60 px-4 py-2 flex flex-col">
                <h2 className="text-slate-200 font-bold px-4 py-2 mb-4">Settings</h2>
                <div className="flex flex-col h-full">
                    <div className="flex-1">
                        <SettingsTabNavigation
                            tabToNavigateTo={SettingsTab.Account}
                            navigationText={"Account"}
                            defaultImageSrc={accountIcon}
                            activeImageSrc={accountIconActive}
                        />
                        <SettingsTabNavigation
                            tabToNavigateTo={SettingsTab.Notifications}
                            navigationText={"Notifications"}
                            defaultImageSrc={notificationIcon}
                            activeImageSrc={notificationIconActive}
                        />
                    </div>
                    <div>
                        <Button
                            onClick={props.logOut}
                            buttonText="Log out"
                            isActive={false}
                            //This is a decorative image, so alt text empty is correct so screen readers ignore it
                            image={{src: logoutIcon, altText: ""}}/>
                    </div>
                </div>
            </div>
        );
    };

    const updateNotifications = (updatedNotifications: Notifications) => {
        props.updateNotifications(updatedNotifications);
        // setUserProfile({...userProfile, notifications: updatedNotifications});
        //TODO: call to server to persist the notification settings
    }

    const getTabTitleAndContent = (): [string, ReactNode] => {
        switch (currentSettingsTab) {
            case SettingsTab.Account:
                return ["Account", <AccountSettings
                    name={userProfile.name} userEmail={userProfile.userEmail} subscription={userProfile.subscription}
                    profilePicturePath={userProfile.profilePicturePath}
                    updateUserEmail={(newEmail: string) => setUserProfile({...userProfile, userEmail: newEmail})}
                />];
            case SettingsTab.Notifications:
                return ["Notifications", <NotificationsSettings currentNotifications={props.userProfile.notifications}
                                                                updateNotifications={updateNotifications}
                />];
        }
    }

    const [settingsTabTitle, SettingsTabContent] = getTabTitleAndContent();
    return (
        <div className="w-6/12 min-w-[700px] h-[500px] bg-slate-900 flex flex-row border-slate-600 p-2 rounded-xl">
            <SettingsSideBar/>
            <SettingsContent headerText={settingsTabTitle} closeSettingsPage={props.closeModal}>
                {SettingsTabContent}
            </SettingsContent>
        </div>
    )
}