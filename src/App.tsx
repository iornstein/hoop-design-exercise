import {useState} from 'react'
import logo from './assets/logo.svg'
import gearIcon from './assets/gear-icon.svg'
import './App.css'
import {SettingsModal} from "./SettingsModal/SettingsModal.tsx";
import {ProfilePicture} from "./SharedComponents/ProfilePicture.tsx";
import {Button} from "./SharedComponents/FormComponents.tsx";
import {Notifications} from "./domain/Notifications.ts";
import {defaultUserProfile, UserProfile} from "./domain/UserProfile.ts";


const App = () => {
    const [settingsWindowOpen, setSettingsWindowOpen] = useState(true);

    const showSettings = () => {
        setSettingsWindowOpen(true);
    }

    const [loggedInUser, setLoggedInUser] = useState<UserProfile | null>(defaultUserProfile);

    const updateNotifications = (updatedNotifications: Notifications) => {
        if (loggedInUser === null) {
            return;
        }
        setLoggedInUser({...loggedInUser, notifications: updatedNotifications});
        //TODO: Update this function to persist the notification settings, perhaps a call to a server?
    }

    const AppHeader = (props: {loggedInUser: UserProfile | null}) => {
        return (
            <div className={`flex ${settingsWindowOpen ? 'opacity-75' : ''}`}>
                <div className="flex-1"><img src={logo} alt="Hoop logo"/></div>
                {!settingsWindowOpen &&
                    <div className="pr-2"><Button onClick={showSettings} buttonText="Settings"
                        //This is a decorative image, so alt text empty is correct so screen readers ignore it
                                                  image={{src: gearIcon, altText: ""}}
                    /></div>}
                {props.loggedInUser && <ProfilePicture profileImage={props.loggedInUser.profilePicturePath}/>}
            </div>
        );
    }

    if (!loggedInUser) {
        return (
            <div className="bg-black p-3 text-slate-300 h-svh max-h-svh">
                <AppHeader loggedInUser={loggedInUser}/>
                <div className="w-full flex flex-col items-center">
                    You logged out! Please refresh the page to simulate logging back in
                </div>
            </div>
        );
    }

    return (
        <div className="bg-black p-3 text-slate-300 h-svh max-h-svh">
            <AppHeader loggedInUser={loggedInUser}/>
            <div className="w-full flex flex-col items-center">
                {settingsWindowOpen
                    ? <SettingsModal
                        closeModal={() => setSettingsWindowOpen(false)}
                        userProfile={loggedInUser}
                        updateNotifications={updateNotifications}
                        logOut={() => setLoggedInUser(null)}
                    />
                    :
                    <div className={`p-40 w-3/4 ${settingsWindowOpen ? 'opacity-75' : ''}`}> {messageAboutDesign}</div>
                }
            </div>
        </div>
    )
}

const messageAboutDesign = "The top \"settings\" button in the toolbar should probably be displayed at all times, " +
    "or perhaps accessible through a drop down clicking on your profile in the top right. In the interest of matching the figma, I am hiding the \"show settings\" button when the settings are open. But a better design would be to always show the button to get to settings, regardless on whether the settings \"modal\" is open.";

export default App
