import Vue from 'vue';
import moment from 'moment';

export const baseURL = "http://localhost:4000";
export function formatDate(dateStr, fmt) {
  let date = new Date(dateStr)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

export function diffDays(dateStr) {
  const date = new Date(dateStr);
  const m1 = moment();
  //获取需要对比的时间
  const m2 = moment(date);
  //计算相差多少天 day可以是second minute
  let day = m1.diff(m2, 'day');
  let unit = ` days`;
  if (day < 3) {
    day = m1.diff(m2, 'hours');
    unit = ` hours`;
    if (day <= 2) {
      day = m1.diff(m2, 'minutes');
      unit = ` mins`;
      if (day <= 2) {
        day = m1.diff(m2, 'seconds');
        unit = ` secs`;
      }
    }
  }
  
  return day+unit;
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

export function picFullUrl(picUrl) {
  // console.info('picUrl',picUrl);
   
  if (picUrl instanceof Array) {
    let pics = [];
    for (let pic of picUrl) {
      pics.push(baseURL+pic);
    }
    return pics;
  } else {
    return baseURL+picUrl;
  }
}

let filters = {
  formatDate,
  diffDays,
  picFullUrl
};

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});
export default filters;