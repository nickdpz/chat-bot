import { PROMPTS } from "./prompt";
import { cleanText } from "./util";

export const buildPromptEmployee = (employees = []) => {
  if (!Array.isArray(employees)) {
    throw new Error("Debes ser un array de agentes");
  }

  employees.reduce((pre, ccu) => {
    if (pre.includes(ccu.name)) {
      throw new Error(`Nombre de agente debe ser unico: ${ccu.name} repetido`);
    }
    return [...pre, ccu.name];
  }, []);

  return employees.reduce(
    (message, agent) => `${message}
    EmployeeName: ${agent.name}
    Description: ${agent.description}`,
    ""
  );
};

/**
 *
 * @param {*} text
 * @returns
 */
export const determineEmployee = (text) => {
  const match = /Action: ([\s\S]*?)(?:\nAction Input: ([\s\S]*?))?$/.exec(text);
  if (!match) {
    throw new Error(`Could not parse LLM output: ${text}`);
  }

  try {
    const result = match[2].trim().replace(/^("+)(.*?)(\1)$/, "$2");
    return {
      tool: cleanText(match[1].trim()),
      toolInput: cleanText(result ? result : ""),
      log: cleanText(text),
    };
  } catch (e) {
    return {
      tool: null,
      toolInput: null,
      error: e.message,
    };
  }
};

/**
 *
 * @param {*} question
 * @param {*} parseInstructions
 * @returns
 */
export const finalPrompt = (question, employeesTable) => {
  return PROMPTS.FORMAT_INSTRUCTIONS.replace("{input}", question)
    .replace("[{employees}]", employeesTable)
    .replaceAll("\n", " ");
};
