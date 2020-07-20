export interface FormattedAddress {
  value: string;
  label: string;
  latitude: number;
  longitude: number;
  postcode: string;
}

export interface Address {}

export interface AddressLookupProps {
  onAddressSelect: (address: any) => void;
}
