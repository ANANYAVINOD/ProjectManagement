document.getElementById("details").addEventListener("click" , function() {
    document.getElementById("project-detail").style.display = "block";
    document.getElementById("project-resourc").style.display = "none";
    document.getElementById("project-invoice").style.display = "none";
});

document.getElementById("resources").addEventListener("click" , function() {
    document.getElementById("project-detail").style.display = "none";
    document.getElementById("project-resourc").style.display = "block";
    document.getElementById("project-invoice").style.display = "none";
});

document.getElementById("invoice").addEventListener("click" , function() {
    document.getElementById("project-detail").style.display = "none";
    document.getElementById("project-resourc").style.display = "none";
    document.getElementById("project-invoice").style.display = "block";
});

document.getElementById("resource-add").addEventListener("click" , function() {
    document.getElementById("modal-content-resource").style.display = "block";
});

document.getElementById("cancel-res").addEventListener("click" , function() {
    document.getElementById("modal-content-resource").style.display = "none";
});

const empName = document.getElementById("employee-name");
const empRole = document.getElementById("employee-role");
const empMail = document.getElementById("employee-email");
const empBillable = document.getElementById("employee-billable");
const empRate = document.getElementById("employee-rate");

const selectProject = JSON.parse(localStorage.getItem("currentproject"));
document.getElementById("current-res-project").innerHTML = selectProject.name ;

document.getElementById("submit-res-button").addEventListener("click" , function(e) {

    e.preventDefault();
    resValidation() ;
    //createTable();
    document.getElementById("modal-content-resource").style.display = "none";
    document.getElementById("res-inner").style.display = "block";
    location.reload();
});

     
function resValidation() {
    const name = resFieldValidation(empName);
    const role = resFieldValidation(empRole);
    const mail = resFieldValidation(empMail);
    const bill = resBillable();
    const rate = resFieldValidation(empRate);  
    if(name && role && mail && bill && rate) {
        const resourceJson = JSON.parse(localStorage.getItem("resources")) || [];
        let resourcelist = {
            Project: selectProject.name,
            Name: name,
            Role: role,
            Email: mail,
            Billable: bill,
            RateperHour: rate
        };
        resourceJson.push(resourcelist);
        let resourceDetails = JSON.stringify(resourceJson);
        localStorage.setItem("resources", resourceDetails);
    }
}

const requiredErrorMessage = '* is a required field.';
function resFieldValidation(fild) {
    if(fild.value == "")
        document.getElementById("rate-error").innerHTML = fild.name + requiredErrorMessage;
    else  
        return fild.value;
} 

function resBillable() {
    if(empBillable.checked == true) 
        return "true";
    else 
        return "false";    
}

const addTable = document.getElementById("res-table");

function createTable() {

    const table = document.createElement('table');
    const resList =JSON.parse(localStorage.getItem("resources"));
    console.log(resList);

    const headers = ["Project" , "Name" , "Role" , "Email" , "Billable" , "Rate/Hour"]
    const headerRow = document.createElement("tr");
    headers.forEach(headerText=> {
        let header = document.createElement("th");
        let textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
        headerRow.appendChild(header);
    });
    table.appendChild(headerRow);
    addTable.appendChild(table);  

    resList.forEach(element => {
        if(element.Project == selectProject.name) {
            console.log(element.Project);
            let row = document.createElement("tr");
        
            Object.values(element).forEach(text =>{
                let cell = document.createElement("td");
                let textNode = document.createTextNode(text);
                cell.appendChild(textNode);
                row.appendChild(cell);
            });
            let editbtn = document.createElement("button");
            editbtn.innerHTML = "<i class='fa fa-pencil' id= 'res-edit'></i>";
            let delbtn = document.createElement("button");
            delbtn.innerHTML = "<i class='fa fa-trash' id= 'res-del'></i>";
            row.appendChild(editbtn);
            row.appendChild(delbtn);
            table.appendChild(row);

            delbtn.addEventListener("click", function() {
                document.getElementById("del-modal").style.display = "block";
                document.getElementById("yesBtn").addEventListener("click" , function() {
                    document.getElementById("del-modal").style.display = "none";
                    row.remove();
                    for (let i = 0; i < resList.length; i++) {
                        if(element.Name === resList[i].Name) {
                            resList[i].Project = null;
                            resList[i].Name = null;
                            resList[i].Role = null;
                            resList[i].Email = null;
                            resList[i].Billable = null;
                            resList[i].RateperHour = null;
                            break;
                        } 
                    }
                    localStorage.setItem("resources", JSON.stringify(resList));
                });
                document.getElementById("noBtn").addEventListener("click" , function() {
                    document.getElementById("del-modal").style.display = "none";
                });
            });

            editbtn.addEventListener("click" , function() {
                document.getElementById("modal-content-resource").style.display = "block";
                document.getElementById("submit-res-button").style.display = "none";
                document.getElementById("edit-res-button").style.display = "block";
                empName.value = element.Name ;
                empName.readOnly = true;
                document.getElementById("res-form-title").innerHTML = "Edit Resource";
                document.getElementById("edit-res-button").addEventListener("click", function() {
                for (let i = 0; i < resList.length; i++) {
                    if(empName.value === resList[i].Name) {
                        const name = resFieldValidation(empName);
                        const role = resFieldValidation(empRole);
                        const mail = resFieldValidation(empMail);
                        const bill = resBillable();
                        const rate = resFieldValidation(empRate); 
                        resList[i].Project = selectProject.name;
                        resList[i].Name = name;
                        resList[i].Role = role;
                        resList[i].Email = mail;
                        resList[i].Billable = bill;
                        resList[i].RateperHour = rate;
                        break;
                    } 
                }
                localStorage.setItem("resources", JSON.stringify(resList));
            });

        })
        } 
    }); 
    addTable.appendChild(table);
}
