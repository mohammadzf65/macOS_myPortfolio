import useWindowStore from "#store/Window";
import {useGSAP} from "@gsap/react";
import {useLayoutEffect, useRef} from "react";
import gsap from "gsap";
import {Draggable} from "gsap/Draggable";


const WindowWrapper = (Component, windowKey) => {
    const Wrapped = (props) => {
        const {focusWindow, windows} = useWindowStore();
        const {isOpen, zIndex} = windows[windowKey] || {isOpen: false, zIndex: 1000};
        const ref = useRef(null);


        useGSAP(() => {
            const el = ref.current;
            if (!el || !isOpen) return;

            gsap.fromTo(
                el,
                {
                    scale: 0.8,
                    opacity: 0,
                    y: 40,
                },
                {scale: 1, opacity: 1, duration: 0.4, y: 20, ease: "power3.out"}
            );

        }, [isOpen]);
        useGSAP(() => {
            const el = ref.current;
            if (!el) return;
            const [instence] = Draggable.create(el, {onPress: () => focusWindow(windowKey)});

            return () => instence.kill();
        });

        useLayoutEffect(() => {
            const el = ref.current;
            if (!el) return;
            el.style.display = isOpen ? "block" : "none";
        }, [isOpen]);

        return (
            <section id={windowKey} ref={ref} style={{zIndex}} className="absolute">
                <Component {...props} />
            </section>
        );
    };

    Wrapped.displayName = `WindowWrapper(${
        Component.displayName || Component.name || "Component"
    })`;
    return Wrapped;
};

export default WindowWrapper;
