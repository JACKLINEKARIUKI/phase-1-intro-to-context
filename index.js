

function createEmployeeRecord(array) {
    return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(array){
   const newArray =  array.map(createEmployeeRecord);
//    console.log(newArray);
    return newArray;
}

function createTimeInEvent(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ');
     employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });
    // console.log(employee);
    return employee;
}


function createTimeOutEvent(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ');
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });
    // console.log(employee);
    return employee;
}

function hoursWorkedOnDate(employee, date){
    let timeInEvents = employee.timeInEvents.filter(event => event.date === date);
    // console.log(timeInEvents);
    let timeOutEvents = employee.timeOutEvents.filter(event => event.date === date);
    let timeIn = timeInEvents.length > 0 ? timeInEvents[0].hour : 0;
    let timeOut = timeOutEvents.length > 0 ? timeOutEvents[0].hour : 0;
    return (timeOut - timeIn) /100;
}

function wagesEarnedOnDate(employee, date){
    let hours = hoursWorkedOnDate(employee, date);
    return hours * employee.payPerHour;
}

function allWagesFor(employee){
    let dates = employee.timeInEvents.map(event => event.date);
    let wages = dates.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
    return wages;
}

function calculatePayroll(employees){
    return employees.reduce((total, record) => total + allWagesFor(record), 0);
}

