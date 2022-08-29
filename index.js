
const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};

function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(array) {
  return array.map(createEmployeeRecord);
}

function createTimeInEvent(dateStamp) {
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(dateStamp.split(" ")[1], 10),
    date: dateStamp.split(" ")[0],
  });
  return this;
}

function createTimeOutEvent(dateStamp) {
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(dateStamp.split(" ")[1], 10),
    date: dateStamp.split(" ")[0],
  });

  return this;
}

function hoursWorkedOnDate(date) {
  let employeeInRecordsMatching = this.timeInEvents.find(function (e) {
    return e.date === date;
  });

  let employeeOutRecordsMatching = this.timeOutEvents.find(function (e) {
    return e.date === date;
  });

  return (
    (employeeOutRecordsMatching.hour - employeeInRecordsMatching.hour) / 100
  );
}

function wagesEarnedOnDate(date) {
  let hoursWorked = hoursWorkedOnDate.call(this, date);
  let wages = hoursWorked * this.payPerHour;
  return parseFloat(wages.toString());
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find((employee) => {
    return employee.firstName === firstName;
  });
}

function calculatePayroll(arrayOfEmployees) {
  return arrayOfEmployees.reduce((acc, rec) => {
    return acc + allWagesFor.call(rec);
  }, 0);
}