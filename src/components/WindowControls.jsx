import useWindowStore from "#store/Window.js";

const WindowControls = ({target}) => {
    const {closeWindow} = useWindowStore();


    return (
        <div id="window-controls">
            <div className="close" onClick={() => closeWindow(target)}/>
            <div className="minimize" onClick="TODO"/>
            <div className="maximize" onClick="TODO"/>
        </div>
    )
}
export default WindowControls
