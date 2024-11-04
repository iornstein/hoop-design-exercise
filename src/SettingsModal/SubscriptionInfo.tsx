import {Subscription} from "../domain/UserProfile.ts";

export const SubscriptionInfo = ({subscription}: { subscription: Subscription }) => {
    if (subscription.type === "free") {
        return (<>
            <div className="text-slate-200 mb-2">Subscription</div>
            <div>You have a free subscription courtesy of Hoop.</div>
        </>);
    }
    return (<>
        <div className="text-slate-200 mb-2">Subscription</div>
        <div> You have a premium subscription that expires on ${subscription.expires.toLocaleDateString()}.</div>
    </>);
}