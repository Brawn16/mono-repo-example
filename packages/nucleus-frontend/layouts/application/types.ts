export interface NavLinkProps {
  href: string;
  label: string;
}

export interface NavProfileDropdownProps {
  close: () => void;
  onLogout: () => void;
}
