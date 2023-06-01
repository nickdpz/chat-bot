import * as dotenv from "dotenv";
dotenv.config();

import {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
  EVENTS,
} from "@bot-whatsapp/bot";
import BaileysProvider from "@bot-whatsapp/provider/baileys";
import MockAdapter from "@bot-whatsapp/database/mock";

import { init } from "./plugin/index";
import { flowSales } from "./flows/sales.flow";
import { flowAgent } from "./flows/agent.flow";

const employeesAddonConfig = {
  model: "gpt-3.5-turbo",
  temperature: 0,
  apiKey: process.env.OPENAI_API_KEY,
};
const employeesAddon = init(employeesAddonConfig);

const flowCertificates = addKeyword("CERTIFICATES").addAnswer(
  [
    "Con gusto te ayudamos a generar tu certificado, espera unos momentos mientras validamos tu información",
  ],
  null,
  async (ctx, { flowDynamic }) => {
    await flowDynamic(
      `Deseas ${ctx.pushName} generar tu certificado de renta ?`
    );
  }
);

const flowDelivery = addKeyword("CERTIFICATES").addAnswer(
  ["Por favor danos unos minutos validamos tu información"],
  null,
  async (ctx, { flowDynamic }) => {
    await flowDynamic(`No hemos encontrado ordenes en nuestro sistema`);
  }
);

const flowDocs = addKeyword("DOCS").addAction(async (ctx, ctxFn) => {
  console.log(ctx);
});

const flowVoiceNote = addKeyword(EVENTS.VOICE_NOTE).addAnswer([
  "En estos momentos no puedo escucharte, espera 5 min atiendo tu solicitud o enviame un mensaje de texto",
]);

const flowWelcome = addKeyword([
  "hola",
  "buenas",
  "alo",
  "como estas",
]).addAction(async (ctx, ctxFn) => {
  await ctxFn.flowDynamic("Hola es un gusto para nosotros saludarte.");
  const employee = await employeesAddon.determine(ctx.body);
  if (employee) {
    employeesAddon._gotoFlow(employee, ctxFn);
  } else {
    ctxFn.flowDynamic("En que podemos ayudarte ?");
  }
});

const main = async () => {
  const adapterDB = new MockAdapter();

  const adapterFlow = createFlow([flowWelcome, flowVoiceNote]);

  const adapterProvider = createProvider(BaileysProvider);

  const employees = [
    {
      name: "SALES_EMPLOYEE",
      description:
        "Soy Rob el vendedor amable encargado de atender si tienes intencion de comprar o interesado en algun producto como los datafonos.",
      flow: flowSales,
    },
    {
      name: "EMPLEADO_DISPUTAS",
      description:
        "Soy Claudia la encargada de resolver las dudas de los clientes frente a los pagos hechos con el datafono, nuestras tarifas de uso y retenciones y seguir los casos cuando un cliente dice que se ha descontado de forma errónea en el uso del datafono.",
      flow: flowAgent,
    },
    {
      name: "EMPLEADO_CAPACITACIONES",
      description:
        "Soy Andres la persona encargada de guiar a los clientes en el uso de la aplicación, cuando me preguntan como vincular el datafono siempre respondo que debe entrar a la app hacer login usando su contraseña ir al apartado datafono vincular datafono y que recomienda ver el siguiente video donde te muestra de forma gráfica los pasos.",
      flow: flowDocs,
    },
    {
      name: "EMPLEADO_ENTREGAS",
      description:
        "Soy Nicolas el encargado de las entregas, respondo a los clientes cuando me preguntan si pueden recoger tu pedido o producto, cual es el estado de una orden.",
      flow: flowDelivery,
    },
    {
      name: "EMPLEADO_CERTIFICADOS",
      description:
        "Soy José el encargado generar y enviar certificados, atiendo a los clientes cuando piden generar algún certificado, como extractos del último mes, certificado retención, certificado de declaración de renta.",
      flow: flowCertificates,
    },
  ];

  employeesAddon.employees(employees);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
};

main();
