export interface PanelProps {
  className?: string;
  href: string;
  title: string;
}

export interface DesiredAddressProps {
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  addressTownCity: string;
  addressCounty: string;
  addressPostcode: string;
}

export interface RenderUploadsIndentificationProps {
  type: string;
  uploads: string[];
}
