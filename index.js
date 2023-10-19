import { EmailMessage } from "cloudflare:email";
import { createMimeMessage } from "mimetext";

export default {
 async fetch(request, env) {
   const msg = createMimeMessage();
   msg.setSender({ name: "GPT-4", addr: "admin@formtome.com" });
   msg.setRecipient("binbinzhaili@qq.com");
   msg.setSubject("An email generated in a worker");
   msg.addMessage({
       contentType: 'text/plain',
       data: `Congratulations, you just sent an email from a worker.`
   });

   var message = new EmailMessage(
     "admin@formtome.com",
     "binbinzhaili@qq.com",
     msg.asRaw()
   );
   try {
     await env.SEB.send(message);
   } catch (e) {
     return new Response(e.message);
   }

   return new Response("Hello Send Email World!");
 },
};
