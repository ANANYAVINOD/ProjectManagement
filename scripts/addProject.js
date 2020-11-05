const proName = document.getElementById("pName");
const client = document.getElementById("clientName");
const manager = document.getElementById("proManager");
const tech = document.getElementById("technology");
const desptn = document.getElementById("description");
const prostatus = document.getElementById("proStatus");

const projectList = localStorage.getItem("projects");
const proList = JSON.parse(projectList);
if(!proList) proList = [];
console.log(proList);

const list = document.getElementById('prolists');
proList.forEach(element => {
    const listItem = document.createElement('li');
    listItem.innerHTML = element.projectname;      
    listItem.addEventListener("click" , function() {
        proName.innerHTML = element.projectname;
        client.innerHTML =  element.clientname;
        manager.innerHTML =  element.projectmanager;
        prostatus.innerHTML = element.status + "%";
        tech.innerHTML =  element.technology;
        desptn.innerHTML = element.description;
        document.getElementById("progressStatus").innerHTML = element.status + "%";
        progressBar(element.status,100);
    });
    list.appendChild(listItem);
    listItem.addEventListener("click", function(){
        let currentProject = {
            name: element.projectname,
            client: element.clientname,
            manager: element.projectmanager,
            status: element.status,
            technology: element.technology,
            description: element.description
        };
        localStorage.setItem("currentproject" , JSON.stringify(currentProject));
    });
});
    
function progressBar(progressVal,totalPercentageVal = 100) {
    var strokeVal = (4.64 * 100) /  totalPercentageVal;
	var x = document.querySelector('.progress-circle-prog');
    x.style.strokeDasharray = progressVal * (strokeVal) + ' 999';
	var el = document.querySelector('.progress-text'); 
	var from = $('.progress-text').data('progress');
	$('.progress-text').data('progress', progressVal);
	var start = new Date().getTime();
  
	setTimeout(function() {
	    var now = (new Date().getTime()) - start;
	    var progress = now / 700;
	    el.innerHTML = progressVal / totalPercentageVal * 100 + '%';
	    if (progress < 1) setTimeout(arguments.callee, 10);
	}, 10);

}

