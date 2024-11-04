
type ButtonImage = {src: string, altText: string};

type ButtonProps = { onClick: () => void, buttonText: string, isActive?: boolean, image?: ButtonImage};
export const Button = ({onClick, buttonText, image, isActive}: ButtonProps) => {
    return (<ButtonBase onClick={onClick} buttonText={buttonText} image={image} isActive={isActive} />);
};

export const SmallLightButton = ({onClick, buttonText}: ButtonProps) => {
    return (<ButtonBase onClick={onClick} buttonText={buttonText} buttonColorClass="bg-slate-600" buttonPaddingClasses="px-2 py-1"/>);
};

type ButtonBaseProps = ButtonProps & {buttonColorClass?: string, buttonPaddingClasses?: string}
const ButtonBase = ({onClick, buttonText, image, isActive,
                        buttonColorClass="bg-slate-800", buttonPaddingClasses="px-4 py-2"}: ButtonBaseProps) => {
    return (
        <div className={`${buttonColorClass} hover:bg-slate-600 hover:text-slate-250 rounded-lg ${isActive ? 'text-slate-250 bg-slate-600 border border-highlightBlue' : ''}`}>
            <button className={`bg-gray-800 w-full rounded-md ${buttonPaddingClasses}`} onClick={onClick}>
                <div className="flex items-center">
                    {image && <img src={image.src} alt={image.altText} className="pr-2"/> }
                    <div>{buttonText}</div>
                </div>
            </button>
        </div>
    );
};

type InputProps = {value: string, onUpdate: (newValue: string) => void, autoFocus?: boolean, classes?: string};
export const Input = ({value, onUpdate, classes="", autoFocus=false}: InputProps) => {
    return (<input autoFocus={autoFocus} className={`p-1 rounded bg-slate-400 text-slate-250 ${classes}`}
           value={value} onChange={(event) => onUpdate(event.target.value)}/>);
}

export type ToggleProps = { value: boolean, setValue: (value: boolean) => void, id: string };
export const Toggle = (props: ToggleProps) => {

    const toggle = () => {
        props.setValue(!props.value);
    };

    return (
        <div className="relative inline-block w-12 h-6">
            <input checked={props.value}
                   id={props.id} type="checkbox"
                   className="peer appearance-none w-12 h-6 rounded-full checked:bg-slate-550 bg-slate-700 cursor-pointer transition-colors duration-300"
                   onChange={toggle}
            />
            <label htmlFor={props.id}
                   className="absolute top-0 left-0 w-5 h-5 m-0.5 peer-checked:bg-teal bg-slate-500 rounded-full border border-slate-500 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-teal cursor-pointer">
            </label>
        </div>
    );
};