import { EmailMessage } from "cloudflare:email";
import { createMimeMessage } from "mimetext";

export default {
 async fetch(request, env) {

  /**
   * validate the formdata 
   * or get the formdata
   * @param {*} formdata 
   */
  function checkOrGetFormData (formdata) {
    const fileds = ["sender_email", "sender_name", "recipient_email", "subject", "msg_data"]
    const result = []
    let error = ""
    fileds.forEach(item => {
        const value = formdata.get(item)
        console.debug(item, value)
        if (!value || value == "" || value == undefined || value == null) {
          error = "Request params :" + item + " error"
        }
        result[item] = value
    });
    if (error != "") {
      return null
    }
    return result
  }

  if (request.method !== "POST") {
    console.debug("Request method must be POST");
    return new Response("Request method must be POST");
  }

  const formdata = await request.formData();
  const data = checkOrGetFormData(formdata)
  if (!data) {
    return new Response("Request params error");  
  }
   const msg = createMimeMessage();
   msg.setSender({ name: data.sender_name, addr: data.sender_email});
   msg.setRecipient(data.recipient_email);
   msg.setSubject(data.subject);
   msg.addMessage({
       contentType: 'text/plain',
       data: data.msg_data
   });

   var message = new EmailMessage(
     data.sender_email,
     data.recipient_email,
     msg.asRaw()
   );
   try {
     await env.SEB.send(message);
   } catch (e) {
     return new Response(e.message);
   }

   return new Response("Send Email Successfully!");
 },
};
