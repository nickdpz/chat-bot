import { addKeyword } from "@bot-whatsapp/bot";
import { v4 as uuidv4 } from "uuid";

export const flowAgent = addKeyword("AGENT", { sensitive: true })
  .addAnswer("Estamos desviando tu conversacion a nuestro agente")
  .addAction(async (ctx, { provider }) => {
    const ID_GROUP = uuidv4();
    const refProvider = await provider.getInstance();
    await refProvider.groupCreate(`Media Tech Support (${ID_GROUP})`, [
      `${ctx.from}@s.whatsapp.net`,
    ]);
  })
  .addAnswer("Te hemos agregado a un grupo con un asesor! Gracias");
