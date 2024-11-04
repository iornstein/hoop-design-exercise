import {ProfilePicture} from "../SharedComponents/ProfilePicture.tsx";
import {Input, SmallLightButton} from "../SharedComponents/FormComponents.tsx";
import {useState} from "react";
import {Subscription} from "../domain/UserProfile.ts";
import {SubscriptionInfo} from "./SubscriptionInfo.tsx";

type AccountSettingsProps = {
    name: string,
    userEmail: string,
    subscription: Subscription,
    profilePicturePath: string,
    updateUserEmail: (newEmail: string) => void,
}
export const AccountSettings = (props: AccountSettingsProps) => {

    const [emailBeingUpdated, setEmailBeingUpdated] = useState(false);
    const [userEmail, setUserEmail] = useState(props.userEmail);

    const saveEmail = () => {
        setEmailBeingUpdated(false);
        props.updateUserEmail(userEmail);
    };

    const RenderEmailSection = () => {
        if (emailBeingUpdated) {
            return (
                <form className="flex items-center flex-wrap gap-1" onSubmit={saveEmail}>
                    <Input value={userEmail} onUpdate={setUserEmail} classes="mr-2 w-3/4" autoFocus={true}/>
                    <SmallLightButton onClick={saveEmail} buttonText={"Save"} isActive={false}/>
                </form>
            );
        }
        return (
            <div className="flex items-center flex-wrap gap-1 w-full">
                <div className="pr-2 pl-1 truncate max-w-[75%]">{props.userEmail}</div>
                <div>
                    <SmallLightButton onClick={() => setEmailBeingUpdated(true)}
                                      buttonText={"Edit"} isActive={false}/>
                </div>
            </div>);
    }

    return (
        <>
            <div className="flex items-center mb-4">
                <ProfilePicture profileImage={props.profilePicturePath}/>
                <div className="flex-1">
                    <div className="text-slate-200 pl-1">{props.name}</div>
                    {RenderEmailSection()}
                </div>
            </div>
            <SubscriptionInfo subscription={props.subscription}/>
        </>
    );
};
