const navLinks = [
  { id: 1, name: "Portfolio" },
  { id: 2, name: "Contact" },
  { id: 3, name: "Projects" },
];

const navIcons = [
  { id: 1, icon: "/icons/wifi.svg", alt: "wifi Icon" },
  { id: 2, icon: "/icons/search.svg", alt: "search Icon" },
  { id: 3, icon: "/icons/user.svg", alt: "user Icon" },
  { id: 4, icon: "/icons/mode.svg", alt: "mode Icon" },
];

const dockApps = [
  { id: "finder", name: "portfolio", icon: "finder.png", canOpen: true },
  { id: "safari", name: "Articles", icon: "safari.png", canOpen: true },
  { id: "photos", name: "Gallery", icon: "photos.png", canOpen: true },
  { id: "contact", name: "Contact", icon: "contact.png", canOpen: true },
  { id: "terminal", name: "Terminal", icon: "terminal.png", canOpen: true },
  { id: "trash", name: "Archive", icon: "trash.png", canOpen: false },
];
export { navLinks, navIcons, dockApps };
