export const ProfilePicture = (props: {profileImage: string}) => {
    return (
        <img src={props.profileImage} className="rounded-full aspect-square object-cover w-11 h-11 mr-5"
             alt="Your Profile Picture"/>
    );
}