export const saveToLocal = (name: string, data: any) => {
  localStorage.setItem(name, JSON.stringify(data));
};

export const setFormWithLocalStorage = (name: string, setValue: any) => {
  const localStorageData = localStorage.getItem(name);
  if (localStorageData) {
    const parsed = JSON.parse(localStorageData);

    Object.keys(parsed).forEach((field) => {
      setValue(field, parsed[field]);
    });
  }
};
export const initiatePageToLocal = (
  name: string,
  setFormData: (name: string, value: object) => void
) => {
  if (!localStorage.getItem(name)) {
    setFormData(name, {});
  }
};