//To place newly added project on top
window.addEventListener('load', function() {
    let lis = list.childNodes;  
    let num = lis.length; 
    for(let i = num-1; i >= 0; i--) {  
        let c = list.removeChild(lis[i]);    
        list.appendChild(c);                 
    }
})
 
//variables for project details area
const proName = document.getElementById("pName");
const client = document.getElementById("clientName");
const manager = document.getElementById("proManager");
const tech = document.getElementById("technology");
const desptn = document.getElementById("description");
const prostatus = document.getElementById("proStatus");
const startd = document.getElementById("proSdate");
const endd = document.getElementById("proEdate"); 
const daysleft = document.getElementById("day");

//variables for add/edit form
const prName = document.getElementById("project-name");
const prClient = document.getElementById("client-name");
const prManager = document.getElementById("project-manager");
const sDate = document.getElementById("start-date");
const eDate = document.getElementById("end-date");
const prTech = document.getElementById("technologies");
const prDescription = document.getElementById("pro-description");
const prStatus = document.getElementById("status");

//pre-populate edit form with values 
document.getElementById("edit").addEventListener("click" , function() {
    document.getElementById("forms-modal").style.display = "block";
    document.getElementById("project-form-title").innerHTML = "Edit Project";
    document.getElementById("edit-project-button").style.display = "block";
    document.getElementById("submit-project-button").style.display = "none"; 
    prName.value = selectedProject.name;
    prName.readOnly = true;
    prClient.value = selectedProject.client;
    prClient.readOnly = true;
    prManager.value = selectedProject.manager;
    sDate.value = selectedProject.startdate;
    eDate.value = selectedProject.enddate;
    prTech.value = selectedProject.technology;
    prStatus.value = selectedProject.status;
    prDescription.value = selectedProject.description;
});

const projectList = localStorage.getItem("projects");
const proList = JSON.parse(projectList);
if(!proList) proList = [];
console.log(proList);
let updatedData;

//listing the projects
const list = document.getElementById('prolists');
const listItem = document.createElement('li');
proList.forEach(element => {
    const listItem = document.createElement('li');
    listItem.innerHTML = element.projectname; 
    list.appendChild(listItem); 
    listItem.addEventListener("click", function(e){
        e.preventDefault();
        let currentProject = {
            name: element.projectname,
            client: element.clientname,
            manager: element.projectmanager,
            status: element.status,
            startdate: element.startdate,
            enddate: element.enddate,
            technology: element.technology,
            description: element.description,
            days: getDays(element.startdate , element.enddate)
        };
        location.reload();
        localStorage.setItem("currentproject" , JSON.stringify(currentProject));
    });
    document.getElementById("edit-project-button").addEventListener("click" , function(e) {
        e.preventDefault();
        document.getElementById("forms-modal").style.display = "none";
        for (let i = 0; i < proList.length; i++) {
            if(prName.value === proList[i].projectname) {
                proList[i].projectname = prName.value;
                proList[i].clientname = prClient.value;
                proList[i].projectmanager = prManager.value;
                proList[i].status =  prStatus.value;
                proList[i].startdate =  sDate.value;
                proList[i].enddate = eDate.value,
                proList[i].technology = prTech.value,
                proList[i].description = prDescription.value
                break;
            } 
        }
         localStorage.setItem("projects", JSON.stringify(proList));
         location.reload();
    })
});

//display current project deatils
const selectedProject = JSON.parse(localStorage.getItem("currentproject"));
proName.innerHTML = selectedProject.name;
client.innerHTML =  selectedProject.client;
manager.innerHTML =  selectedProject.manager;
startd.innerHTML = selectedProject.startdate;
endd.innerHTML = selectedProject.enddate;
daysleft.innerHTML = selectedProject.days + " days";
prostatus.innerHTML = selectedProject.status + "%";
tech.innerHTML =  selectedProject.technology;
desptn.innerHTML = selectedProject.description;
document.getElementById("progressStatus").innerHTML = selectedProject.status + "%";
progressBar(selectedProject.status,100);

 
//function for progress circle  
function progressBar(progressVal,totalPercentageVal = 100) {
    var strokeVal = (4.64 * 100) /  totalPercentageVal;
	var x = document.querySelector('.progress-circle-prog');
    x.style.strokeDasharray = progressVal * (strokeVal) + ' 999';
	//$('.progress-text').data('progress', progressVal);
}


function getDays(date1 , date2) {
    let dateone = new Date(date1); 
    let datetwo = new Date(date2); 
    let Difference_In_Time = datetwo.getTime() - dateone.getTime(); 
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Difference_In_Days;
}




            