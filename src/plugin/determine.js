const cleanText = (inputText) => {
  // return inputText.replaceAll('\n', ' ').replaceAll('\r\n',' ')
  // return inputText.replaceAll('\n', ' ')
  return inputText.replace('"', "");
};

/**
 *
 * @param {*} text
 * @returns
 */
export const determineAgent = (text) => {
  const parts = text.split(": ");

  if (parts.length !== 2) {
    return null;
  }

  const employee = parts[1];

  try {
    return {
      tool: employee,
      log: cleanText(text),
    };
  } catch (e) {
    return {
      tool: null,
      error: e.message,
    };
  }
};

/**
 *
 * @param {*} agentName
 * @param {*} agentsList
 * @returns
 */
export const getAgent = (agentName, agentsList) => {
  const indexAgent = agentsList.findIndex((agent) => agent.name === agentName);
  return agentsList[indexAgent];
};
