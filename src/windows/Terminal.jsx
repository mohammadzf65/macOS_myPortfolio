import WindowWarpper from "#hoc/WindowWarpper";
import {WindowControls} from "#components/index.js";

const Terminal = () => {
    return (
        <>
            <div id="window-header">
                <WindowControls target="terminal"/>
                <h2>Tech stack</h2>
            </div>
            <div>
                <p className="techstack">
                    <span className="font-bold">@mohammad %</span>
                    show tech stack
                </p>
            </div>
        </>
    );
};

const TerminalWindow = WindowWarpper(Terminal, "terminal");

export default TerminalWindow;
