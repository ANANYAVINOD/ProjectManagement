const resource = JSON.parse(localStorage.getItem("resources"));
const currentResources = JSON.parse(localStorage.getItem("currentproject"));
const requiredResources = resource.map(data => [data.Project, data.Name]);
document.getElementById("current-project").innerHTML = currentResources.name;

//function to get selected options and store in local storage
function saveStatus() {
    const statusBtn = document.getElementById("status-btn"); 
    statusBtn.addEventListener("click" , function(e) {
        e.preventDefault();
        const statusDate = document.getElementById("dates").value;
        const statusRes = document.getElementById("resources-list").value;
        const activityType = document.getElementById("activity-type").value;
        const statusTime = document.getElementById("time-spent").value + ':' + document.getElementById("time-spent-minutes").value;
        const postDate = new Date().getFullYear() + '-' + (new Date().getMonth() + 1 )+ '-' + new Date().getDate();
        const postTime = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();

        let hoursSpent = calculateWorkingHours(statusDate, statusRes);
        console.log(hoursSpent);
        
        const [hours, minutes] = statusTime.split(':');
        const inputHours = Number(hours) + (Number(minutes)/60) ;
        console.log(inputHours);

        if(statusTime == "00:00") {
            document.getElementById("restime-error").innerHTML = "* This may not be zero";
        }
        else if(hoursSpent > 16 || (hoursSpent + inputHours) > 16 ) {
            document.getElementById("time-modal").style.display = "block";
            document.getElementById("time-modal-button").addEventListener("click" , function() {
                document.getElementById("time-modal").style.display = "none";
            });
        }
        else if(statusDate && statusRes && activityType && statusTime && hoursSpent <16) {
            const statusJson =JSON.parse(localStorage.getItem("status")) || [];
            console.log(statusJson);
            let statuslist = {
                project: currentResources.name,
                name: statusRes,
                date: statusDate,
                postDate: postDate,
                postTime: postTime,
                activity: activityType,
                hours: statusTime
            };
            statusJson.push(statuslist);
            localStorage.setItem("status", JSON.stringify(statusJson));
            hoursSpent = calculateWorkingHours(statusJson.date, statusJson.name);
            location.reload();
        }
    });
}
saveStatus();

const allStatus = JSON.parse(localStorage.getItem("status")) || [];

//function to get total working hours for an employee for a day
function calculateWorkingHours(date, name) {
    const statusPerRes = allStatus.filter(data => data.date == date && data.name == name);
    console.log(statusPerRes);
    const statusPerResDate = statusPerRes.map (resource => {
        const [hours, minutes] = resource.hours.split(':');
        return Number(hours) + (Number(minutes)/60) ;
    });
    const hoursTotal = statusPerResDate.reduce((sum, value) => {return sum + value}, 0)  ;
    console.log(hoursTotal); 
    return hoursTotal;    
}

//function to display stored status in Status tab
function loadStatusHistory() {
    const statusPerProject = allStatus.filter(items => items.project == currentResources.name);
    console.log(statusPerProject);
    const sortable = statusPerProject.reduce((acc, status) => {
        acc[status.date] ? acc[status.date].push(status) : acc[status.date] = Array(status);
        return acc;
    }, {});
    console.log(sortable);
    const statusHistoryByDate = Object.entries(sortable).sort((([a,], [b,]) => (a < b) ? 1 : -1));
    console.log(statusHistoryByDate);
    const statusByDate = statusHistoryByDate.map(each=> each[1]);
    console.log(statusByDate);
   
    const history = document.getElementById("history-tab");
    for (const x in statusByDate) {
        const datas = document.createElement('div');
        datas.className = 'reports';
        statusByDate[x].forEach(statusReport => {
            const statusReportEach = document.createElement('div');
            statusReportEach.className = 'history-contents flex-box';
            statusReportEach.innerHTML += `
                <span class="history-posted-time">${statusReport.date}<br><span id="postTime">Posted On: ${statusReport.postDate},  ${statusReport.postTime}</span></span>
                <span class="history-activity-type">${statusReport.hours} hour(s)<br>${statusReport.activity}</span>
                <span class="history-resource-name">${statusReport.name}</span>`
            datas.appendChild(statusReportEach);
        });
        history.appendChild(datas);
    }
}
loadStatusHistory();

//functions to display options for resource, date, time//

function displayResources() {
    let resDropDown = document.getElementById("resources-list");
    let resArray = [];
     requiredResources.forEach(element => {
       if(element[0] == currentResources.name) {
           resArray.push(element);
       }
    });
    resArray.forEach(eachRes=> {
        const option = displayOptions(eachRes[1], eachRes[1]);  
        resDropDown.appendChild(option);
    }); 
}
displayResources();

Date.prototype.requiredDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() - days);
    return date;
}

function generateDate(startDate, endDate) {
    let dateArray = [];
    let currentDate = startDate;
    while (currentDate >= endDate) {
        dateArray.push(`${currentDate.getDate()}/${currentDate.getMonth() +1}/${currentDate.getFullYear()}`);
        currentDate = currentDate.requiredDays(1);
    }
    return dateArray;
}

function displayDates() {
    let datesDropDown = document.getElementById("dates");
    const dateArray = generateDate(new Date(), new Date().requiredDays(7)).reverse();
    dateArray.forEach((date, index) => {
        const option = displayOptions(date, date);
        if (index == dateArray.length - 1) {
            option.selected = true;
        }
        datesDropDown.appendChild(option);
    });
}
displayDates();

function displayHourTime() {
    const hoursForm = Array.from({length: 17}, (_, index) => String(index).length == 1 ? `0${index}` : `${index}`);
    const hoursDropDown = document.getElementById("time-spent");
    hoursForm.forEach((hour) => {
        const option = displayOptions(hour, hour);
        hoursDropDown.appendChild(option);
    });
}  
displayHourTime(); 

function displayMinuteTime() {
    const minuteForm = Array.from({length: 60}, ( _, index) => String(index).length == 1 ? `0${(index)}` : `${(index)}`);
    const minutesDropDown = document.getElementById("time-spent-minutes");
    minuteForm.forEach((hour) => {
        const option = displayOptions(hour, hour);
        minutesDropDown.appendChild(option);
    });
}
displayMinuteTime();

//common function to create options
function displayOptions(value,text) {
    const option = document.createElement('option');
    option.value = value;
    option.text = text;
    return option;
}

//function to display time spent in Details tab//
function loadTimeSpent() {
    const statusPerPro = allStatus.filter(items => items.project == currentResources.name);
    console.log(statusPerPro);
    const groupStatus = (array, key) => {
        return array.reduce((result, currentValue) => {
          (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
          return result;
        },{}); 
    };
    const statusPerEmp = groupStatus(statusPerPro , 'name');
    let totalHours = 0;
    let totalHoursSpentEach = 0;
    const timeSpentEach = document.getElementById("time-per-emp");
    let hoursCountArray =[] ;
    for (let x in statusPerEmp) {
        const hoursPerEmp = statusPerEmp[x].reduce((acc, curr) => {
            const [hours, minutes] = curr.hours.split(':');
            const timeSpent = Number(hours) + Number(minutes) / 60;
            acc[curr.name] ? acc[curr.name] += timeSpent : acc[curr.name] = timeSpent;
            totalHoursSpentEach += timeSpent;
            return acc;
        }, {});
        console.log(hoursPerEmp);
        console.log(x);
        console.log(hoursPerEmp[x]);
        const timeList = `<div class="hours-spent flex-box">
            <span class="emp-name">${x} :</span>
            <span class="emp-hour">${hoursPerEmp[x]} hour(s) </span>
            <span class= "totalhours"></span>
            <span id="box">
            <span class="progress-hours"></span></span></div>`
        timeSpentEach.innerHTML += timeList;
        hoursCountArray.push(hoursPerEmp[x]);
    }
    totalHours += totalHoursSpentEach;
    console.log(totalHours);
    document.getElementById("totalTime").innerHTML = totalHours + " hour(s)";

    const timeBar = d3.selectAll('.progress-hours').data(hoursCountArray);
    timeBar.transition()
            .style('padding-right', function (d) {
                return d /totalHours *100 + '%';
            })
            .duration('1000');
}
loadTimeSpent();