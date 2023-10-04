export const combinarErrores = (errors) => {
  const errorMessages = [];
  const { response } = errors;
  const { data } = response;
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      errorMessages.push(...data[key]);
    }
  }

  return errorMessages.join("\n");
};

export const validIdURL = (numericId) => {
  return !isNaN(numericId) && Number.isInteger(numericId);
};
