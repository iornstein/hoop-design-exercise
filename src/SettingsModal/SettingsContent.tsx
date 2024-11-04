import {PropsWithChildren} from "react";
import cancelIcon from "../assets/x.svg";

type SettingsContentProps = PropsWithChildren<{ headerText: string, closeSettingsPage: () => void}>;
export const SettingsContent = ({headerText, children, closeSettingsPage}: SettingsContentProps) => {
    return (
        <div className="bg-slate-800 w-full rounded-xl pl-10 pt-4 p-6 flex flex-col">
            <div className="flex pb-8">
                <h2 className="text-slate-200 font-bold flex-1">{headerText}</h2>
                <div>
                    <button onClick={closeSettingsPage}>
                        <img src={cancelIcon} alt={"Close the Settings page"}/>
                    </button>
                </div>
            </div>
            {children}
        </div>
    );
}