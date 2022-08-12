  export const getFlavoredValue = <O extends object>(
    object: O, id: keyof O
  ): O[keyof O] | undefined => {
  
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions --  okay
    return object[id] as O[keyof O] | undefined;
  };
