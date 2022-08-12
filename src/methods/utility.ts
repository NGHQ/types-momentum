export const getFlavoredValue = <O extends Record<string, unknown>>(
  object: O, id: keyof O
): O[keyof O] | undefined => {

  return object[id] as O[keyof O] | undefined;
};
