const navLinks = [
    {id: 1, name: "Portfolio"},
    {id: 2, name: "Contact"},
    {id: 3, name: "Projects"},
];

const navIcons = [
    {id: 1, icon: "/icons/wifi.svg", alt: "wifi Icon"},
    {id: 2, icon: "/icons/search.svg", alt: "search Icon"},
    {id: 3, icon: "/icons/user.svg", alt: "user Icon"},
    {id: 4, icon: "/icons/mode.svg", alt: "mode Icon"},
];

const dockApps = [
    {id: "finder", name: "portfolio", icon: "/finder.png", canOpen: true},
    {id: "safari", name: "articles", icon: "/safari.png", canOpen: true},
    {id: "photos", name: "gallery", icon: "/photos.png", canOpen: true},
    {id: "contact", name: "contact", icon: "/contact.png", canOpen: true},
    {id: "terminal", name: "terminal", icon: "/terminal.png", canOpen: true},
    {id: "trash", name: "archive", icon: "/trash.png", canOpen: false},
];

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
    finder: {isOpen: false, data: null, zIndex: INITIAL_Z_INDEX},
    contact: {isOpen: false, data: null, zIndex: INITIAL_Z_INDEX},
    photos: {isOpen: false, data: null, zIndex: INITIAL_Z_INDEX},
    safari: {isOpen: false, data: null, zIndex: INITIAL_Z_INDEX},
    terminal: {isOpen: false, data: null, zIndex: INITIAL_Z_INDEX},
    resume: {isOpen: false, data: null, zIndex: INITIAL_Z_INDEX},
    txtfile: {isOpen: false, data: null, zIndex: INITIAL_Z_INDEX},
    imgfile: {isOpen: false, data: null, zIndex: INITIAL_Z_INDEX},
};

export {navLinks, navIcons, dockApps, INITIAL_Z_INDEX, WINDOW_CONFIG};
