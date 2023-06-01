import { OpenAiClass } from "./openai.class";
import { determineAgent } from "./determine";
import { buildPromptEmployee, finalPrompt } from "./employee.rol";
import { cleanText } from "./util";

export class EmployeesClass extends OpenAiClass {
  listEmployees = [];
  employeesTable = "";

  constructor(_settings) {
    super(_settings);
  }

  /**
   *
   * @param {*} employees [] array
   */
  employees = (employees = []) => {
    this.listEmployees = employees;
    this.employeesTable = buildPromptEmployee(employees);
  };

  /**
   *
   * @param {*} employeeName
   * @returns
   */
  getAgent = (employeeName) => {
    const indexEmployee = this.listEmployees.findIndex(
      (emp) => emp.name === employeeName
    );
    return this.listEmployees[indexEmployee];
  };

  /**
   *
   */
  determine = async (text) => {
    try {
      const promptOutput = finalPrompt(text, this.employeesTable);

      const llmDetermineEmployee = await this.sendChat([
        {
          role: "user",
          content: cleanText(promptOutput),
        },
      ]);

      if (llmDetermineEmployee?.error) {
        throw new Error(llmDetermineEmployee?.error?.message);
      }

      const bestChoice = determineAgent(
        llmDetermineEmployee.choices[0].message.content
      );
      if (!bestChoice) {
        return false;
      }
      const employee = this.getAgent(bestChoice.tool);
      return employee;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  /**
   * @param {*} employee
   * @param {*} ctxFn
   */
  _gotoFlow = (employee, ctxFn) => {
    const flow = employee.flow;
    ctxFn.gotoFlow(flow);
  };
}
