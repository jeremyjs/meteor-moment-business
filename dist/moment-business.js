(function (global, factory) {
  if (typeof global !== 'undefined' && typeof global.moment === 'undefined') {
    if(typeof moment === 'undefined') console.log('\'moment\' is undefined\n \'moment-business\' requires \'moment\'');
    else factory(moment, global.containedPeriodicValues || Npm.require("contained-periodic-values"));
  } else {
    exports && typeof exports === "object" && typeof module !== "undefined" ? factory(Npm.require("moment"), Npm.require("contained-periodic-values")) : typeof define === "function" && define.amd ? define(["moment", "contained-periodic-values"], factory) : factory(global.moment, global.containedPeriodicValues);
  }
})(this, function (moment, containedPeriodicValues) {
  "use strict";

  moment.fn.weekDays = function (start) {
    var startDay = start.day();
    var totalDays = Math.abs(this.diff(start, "days"));
    var containedSundays = containedPeriodicValues(startDay, totalDays + startDay, 0, 7);
    var containedSaturdays = containedPeriodicValues(startDay, totalDays + startDay, 6, 7);
    return totalDays - (containedSaturdays + containedSundays);
  };

  moment.fn.weekendDays = function (start) {
    return Math.abs(this.diff(start, "days")) - this.weekDays(start);
  };

  function determineSign(x) {
    x = +x;
    return x > 0 ? 1 : -1;
  }

  moment.fn.addWeekDays = function (count) {
    if (count === 0 || isNaN(count)) {
      return this;
    }

    var sign = determineSign(count);
    var day = this.day();
    var absIncrement = Math.abs(count);

    var days = 0;

    if (day === 0 && sign === -1) {
      days = 1;
    } else if (day === 6 && sign === 1) {
      days = 1;
    }

    // Add padding for weekends.
    var paddedAbsIncrement = absIncrement;
    if (day !== 0 && day !== 6 && sign > 0) {
      paddedAbsIncrement += day;
    } else if (day !== 0 && day !== 6 && sign < 0) {
      paddedAbsIncrement += 6 - day;
    }
    var weekendsInbetween = Math.max(Math.floor(paddedAbsIncrement / 5) - 1, 0) + (paddedAbsIncrement > 5 && paddedAbsIncrement % 5 > 0 ? 1 : 0);

    // Add the increment and number of weekends.
    days += absIncrement + weekendsInbetween * 2;

    this.add(sign * days, "days");
    return this;
  };

  // The inverse of adding
  moment.fn.subtractWeekDays = function (count) {
    return this.addWeekDays(-count);
  };

  // Returns a Boolean representing
  // whether or not the moment is Mon-Fri
  moment.fn.isWeekDay = function () {
    return this.isoWeekday() < 6;
  };

  // The inverse of the above method
  moment.fn.isWeekendDay = function () {
    return this.isoWeekday() > 5;
  };
});
//# sourceMappingURL=./moment-business.js.map
