import { apiHelper } from "../plugins/axios";

export default {
  
  sendActiveEmail(email){
    return apiHelper.post(`/email/active`, {
      email
    });
  }
}