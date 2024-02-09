import { mapaElSalvador } from "./utils";


export const generateRequiredRule = (field: string) => {
  return [
    {
      required: true,
      message: `El campo: '${field}' es requerido.`,
    },
  ];
};

export const getAvailableCountries = (value: string) => {
  return mapaElSalvador[value as keyof typeof mapaElSalvador].municipios.map(
    ({ nombre }) => {
      return { label: nombre, value: nombre };
    }
  );
};

export const initialRecollectionOptions = [
     "Res. Alto Verde 2, Senda Los Olivos, #75, Santa Ana",
        "Colonia Buenos Aires 3, Diagonal Centroamérica, #3, San Salvador",
].map(address => { return {value: address, label: address}})

export const initialState = {
  recipient_state: "Santa Ana",
  recipient_country: "Metapán",
  recipient_phone_code: "+503",
  recipient_phone: "+503",
  recolection_address: initialRecollectionOptions[0].value,
}
