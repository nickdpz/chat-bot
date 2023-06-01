export const PROMPTS = {
  PREFIX:
    "Answer the following questions as best you can. You have access to the following tools:",
  FORMAT_INSTRUCTIONS: `Actúa como un gerente de negocio el cual analizará la siguiente pregunta "{input}" y seleccionara un empleado que pueda responder la pregunta de la siguiente lista de empleados/agentes:
[{employees}]  
  
Si ninguna de los anteriores empleados/agentes es una opción viable responde literalmente :"NOT_EMPLOYEE"
  
Siempre debes literalmente responder con el nombre del agente con el formato:

"EmployeeName:" ....`,
};
