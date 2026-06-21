import Link from "next/link";
import { CompassIcon, HomeIcon, RocketIcon, UserIcon } from "lucide-react";

interface NavLinkProps {
  label: string;
  Icon: typeof RocketIcon;
  link: string;
}

const NavLink = ({ label, Icon, link }: NavLinkProps) => (
  <Link
    href={link}
    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:bg-muted/50"
  >
    <Icon className="size-4" />
    <span>{label}</span>
  </Link>
);

export default function NavMenu () {
  const navLinks: NavLinkProps[] = [
    {
      label: "Home",
      Icon: HomeIcon,
      link: "/",
    },
    {
      label: "Explore",
      Icon: CompassIcon,
      link: "/explore",
    },
    // {
    //   label: "Your Profile",
    //   Icon: UserIcon,
    //   link: "/profile",
    // },
  ];

  return (
    <nav className="flex items-center gap-1">
      {navLinks.map((link) => (
        <NavLink key={link.label} {...link} />
      ))}
    </nav>
  );
};
