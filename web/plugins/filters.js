import Vue from 'vue'
import dayjs from 'dayjs';

const filters = {
  formatDate(date, format = 'YYYY-MM-DD HH:mm') {
    return dayjs(date).format(format);
  },
  priceFilter(value){
    let num = Number(value);
    if(isNaN(num)){
      return "0.00";
    }
    let realVal =num.toFixed(2);
    return realVal || "0.00";
  },
  ellipsis(value, len) {
    if (!value) return '';
    if (value.length > len) {
      return value.slice(0, len) + '...';
    }
    return value;
  }
};

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});