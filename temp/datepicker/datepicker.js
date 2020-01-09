
const leftPad0 = function (v, n) {
  if (!v) {
    v = "";
  }
  let prefix = "";
  for (let i = 0; i < n; i++) {
    prefix += "0";
  }
  return (prefix + v).substr(-n);
};
const stringToDate = function(str) {
  str = str.replace(/-/g, "/");
  return new Date(str);
};
const isLeapYear = function(year) {
  if (((year % 4) == 0) && ((year % 100) != 0) || ((year % 400) == 0)) {
    return true;
  }
  return false;
};
const now = new Date();
const years = [];
/**
 * 年份：当前年份 往后延五年 
 */
const beginYear = new Date().getFullYear();
for (var i = beginYear; i <= beginYear+1; i++) {
  years.push(i + "年");
}
const months = [];
for (var i = 0; i < 12; i++) {
  months.push(leftPad0(i + 1, 2) + "月");
}
const days = [];
for (var i = 0; i < 31; i++) {
  days.push(leftPad0(i + 1, 2) + "日");
}
const hours = [];
for (var i = 0; i < 24; i++) {
  hours.push(leftPad0(i, 2) + "时");
}
const minutes = [];
for (var i = 0; i < 60; i+=10) {
  minutes.push(leftPad0(i, 2) + "分");
}

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: String,
    dateValue: {
      type: Date
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    valueArray: [0, 0, 0, 0, 0],
    rangeValues: [
      years,
      months,
      days,
      hours,
      minutes
    ],
    pickerYear: beginYear,
    pickerMonth: 1
  },
  observers: {
    value: function(v) {
      this.setData({
        valueArray: this._dateToValueArray(stringToDate(v))
      })
    },
    dateValue: function(date) {
      this.setData({
        valueArray: this._dateToValueArray(date)
      })
    },
    valueArray: function(v) {
      this._settMonthDays(v[0] + beginYear, v[1] + 1);
    }
  },
/**
   * 组件的方法列表
   */
  methods: {
    _dateToValueArray(date) {
      return [date.getFullYear() - beginYear, date.getMonth(), date.getDate() - 1, date.getHours(), date.getMinutes()];
    },
    _settMonthDays(year, month) {
      let monthDays = 31;
      switch (month) {
        case 2:
          monthDays = 28;
          if (isLeapYear(year)) {
            monthDays = 29;
          }
          break;
        case 4:
        case 6:
        case 9:
        case 11:
          monthDays = 30;
          break;
      }
      let days = [];
      for (let i = 0; i < monthDays; i++) {
        days.push(leftPad0(i + 1, 2) + "日");
      }
      this.setData({
        pickerYear: year,
        pickerMonth: month,
        "rangeValues[2]": days
      });
    },
    handleCancel(e) {
      this.setData({
        valueArray: this.data.valueArray
      })
    },
    handleColumnChange(e) {
      if (e.detail.column > 1) return false;
      let year = this.data.pickerYear;
      let month = this.data.pickerMonth;
      if (e.detail.column == 0) {
        year = e.detail.value + beginYear;
      } else if (e.detail.column == 1) {
        month = e.detail.value + 1;
      }
      this._settMonthDays(year, month);
    },
    handleValueChange(e) {
      let dateArr = [];
      for (let i in e.detail.value) {
        let v = this.data.rangeValues[i][e.detail.value[i]];
        dateArr.push(v.toString().substr(0, v.length - 1))
      }
      let dateString = dateArr[0] + "-" + dateArr[1] + "-" + dateArr[2] + " " + dateArr[3] + ":" + dateArr[4];
      this.triggerEvent('change', {
        date: stringToDate(dateString),
        dateString
      })
    }
  }
})