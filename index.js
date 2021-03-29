// Your code here

function createEmployeeRecord(employeeArray) {
  const employeeObject = {
    firstName: employeeArray[0],
    familyName: employeeArray[1],
    title: employeeArray[2],
    payPerHour: employeeArray[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
  return employeeObject;
}

function createEmployeeRecords(employeeArrays) {
  const employeeObjects = employeeArrays.map((employeeArray) =>
    createEmployeeRecord(employeeArray),
  );
  return employeeObjects;
}

function createTimeInEvent(employee, timeStamp) {
  let [date, time] = timeStamp.split(" ");
  const timeIn = {
    type: "TimeIn",
    hour: parseInt(time),
    date: date,
  };
  employee.timeInEvents.push(timeIn);
  return employee;
}

function createTimeOutEvent(employee, timeStamp) {
  let [date, time] = timeStamp.split(" ");
  const timeOut = {
    type: "TimeOut",
    hour: parseInt(time),
    date: date,
  };
  employee.timeOutEvents.push(timeOut);
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  let timeIn = employee.timeInEvents.find((timeIn) => timeIn.date === date);
  let timeOut = employee.timeOutEvents.find((timeOut) => timeOut.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
  let dayHours = hoursWorkedOnDate(employee, date);
  return dayHours * employee.payPerHour;
}

function allWagesFor(employee) {
  let inDates = employee.timeInEvents.map((timeIn) => timeIn.date);
  let outDates = employee.timeOutEvents.map((timeOut) => timeOut.date);
  let mergeDates = inDates.filter((date) => outDates.includes(date));
  let dailyWages = mergeDates.map((date) => wagesEarnedOnDate(employee, date));
  return dailyWages.reduce((a, b) => a + b, 0);
}

function calculatePayroll(employeeRecords) {
  let employeePay = employeeRecords.map((employee) => allWagesFor(employee));
  return employeePay.reduce((a, b) => a + b, 0);
}

function findEmployeeByFirstName(employeeRecords, name) {
  return employeeRecords.find((employee) => employee.firstName === name);
}
