import { apiHelper } from "../plugins/axios";

export default {
  async setting(body){
    return apiHelper.post(`/user/setting`, body);
  },
  avatar(blob) {
    let formData = new FormData();
    formData.append('file', blob, 'avatar');
    return apiHelper.post(`/user/avatar`, formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    });
  },
  statistic() {
    return apiHelper.get(`/user/statistic?rand=${new Date().getTime()}`);
  },
  online(){return apiHelper.get(`/user/online/number?rand=${new Date().getTime()}`);},
  sendActiveEmail(email){
    return apiHelper.post(`/user/active/email`, {
      email
    });
  }
}