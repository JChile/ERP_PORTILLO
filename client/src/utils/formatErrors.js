export const combinarErrores = (errors) => {
  const errorMessages = [];
  const { response } = errors;
  const { data } = response;
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const propiedadMessage = `${key}: ${
        typeof data[key] === "object" ? JSON.stringify(data[key]) : data[key]
      }`;
      errorMessages.push(propiedadMessage);
    }
  }

  return errorMessages.join("\n");
};

export const validIdURL = (numericId) => {
  return !isNaN(numericId) && Number.isInteger(numericId);
};
