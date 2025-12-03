import { navIcons, navLinks } from "#constants";
import dayjs from "dayjs";

const Navbar = () => {
  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="Apple Logo" />
        <p className="font-bold">Mohammadreza zf</p>
        <ul>
          {navLinks.map(({ id, name }) => (
            <li key={id}>
              <p className="hover:no-underline font-medium">{name}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {navIcons.map(({ id, icon, alt }) => (
            <li key={id}>
              <img src={icon} alt={alt} />
            </li>
          ))}
        </ul>
        <time className="text-sm">{dayjs().format("ddd MMM D h:mm A")} </time>
      </div>
    </nav>
  );
};

export default Navbar;
