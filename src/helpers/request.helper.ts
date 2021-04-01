function getMissingVariables(variables: any) {
  const missingVariables: Array<string> = [];

  Object.keys(variables).forEach((key) => {
    if (variables[key] === undefined) {
      missingVariables.push(key);
    }
  });

  return missingVariables;
}

export { getMissingVariables };
