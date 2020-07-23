export interface AddressLookupProps {
  label?: string;
  onAddressSelect: (address: AddressLookupAddress) => void;
}

export interface AddressLookupAddress {
  line1?: string;
  line2?: string;
  line3?: string;
  townCity?: string;
  postcode?: string;
  latitude?: number;
  longitude?: number;
}

export interface AddressLookupFormData {
  addressLookupPostcode: string;
}
