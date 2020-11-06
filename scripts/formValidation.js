document.querySelector("#newBtn").addEventListener("click" , function() {
    document.getElementById("forms-modal").style.display = "block";
});

document.getElementById("cancel").addEventListener("click" , function() {
    document.getElementById("forms-modal").style.display = "none";
    location.reload();
});
document.getElementById("edit-project-button").style.display = "none";
document.getElementById("submit-project-button").addEventListener("click" , function(event) {
    event.preventDefault();
    validateData();
});

function validateData() {
    const projectName = validateProjectName();
    const clientName = validateClientName();
    const projectManager = validateProjectManager();
    const startDate = validateStartDate();
    const endDate = validateEndDate();
    const tech = validateTechnology();
    const descrptn = validateDescription();
    const status = validateStatus();
    console.log(projectManager);
    if (projectName && clientName && projectManager && startDate && endDate && tech && desptn && status){
        const projectJson =JSON.parse(localStorage.getItem("projects")) || [];
        console.log(projectJson);
        let projectlist = {
           projectname: projectName,
           clientname: clientName,
           projectmanager: projectManager,
           startdate: startDate,
           enddate: endDate,
           technology: tech,
           description: descrptn,
           status: status,
        };
        projectJson.push(projectlist);
        let projectDetails = JSON.stringify(projectJson);
        localStorage.setItem("projects", projectDetails);
        location.reload();
    }
}

let updateErrorMessage = (obj, errorMessage, errorMessageContent) => {
    if (errorMessageContent) {
        errorMessage.innerHTML = errorMessageContent;
        return false;
    } 
    else {
        errorMessage.innerHTML = '';
        return obj;
    }
}

const requiredFieldMessage = '* This is a required field.';

function validateFieldNotEmpty(obj, errorMessageObj) {
    const objValue = obj.value;
    let errorMessageContent = '';
    if (objValue === '') {
        errorMessageContent = requiredFieldMessage;
    }
    return updateErrorMessage(obj, errorMessageObj, errorMessageContent);
}

function validateProjectName() {
    const projectName = document.getElementById('project-name').value;
    const errorMessage = document.querySelector('#pname-error');
    const projectNameFormat = /^[A-Za-z][A-Za-z\s]{3,25}$/;
    let errorMessageContent = '';
    if (projectName === '') {
        errorMessageContent = requiredFieldMessage;
    } else if (!projectName.match(projectNameFormat)) {
        errorMessageContent = '* Please enter a valid project name.';
    }
    return updateErrorMessage(projectName, errorMessage, errorMessageContent);
}


function validateClientName() {
    const clientName = document.querySelector('#client-name').value;
    const errorMessage = document.querySelector('#cname-error');
    const clientNameFormat = /^[A-Za-z][A-Za-z\s]{3,25}$/;
    let errorMessageContent = '';
    if (clientName === '') {
        errorMessageContent = requiredFieldMessage;
    } else if (!clientName.match(clientNameFormat)) {
        errorMessageContent = '* Please enter a valid client name.';
    }
    return updateErrorMessage(clientName, errorMessage, errorMessageContent);
}

function validateProjectManager() {
    const projectManager = document.querySelector('#project-manager').value;
    const errorMessage = document.querySelector('#pmname-error');
    const projectManagerFormat = /^[A-Za-z][A-Za-z\s]{3,25}$/;
    let errorMessageContent = '';
    if (projectManager === '') {
        errorMessageContent = requiredFieldMessage;
    } else if (!projectManager.match(projectManagerFormat)) {
        errorMessageContent = '* Please enter a valid project manager name.';
    }
    return updateErrorMessage(projectManager, errorMessage, errorMessageContent);
}

function validateStartDate() {
    const startDate = document.querySelector('#start-date').value;
    const errorMessage = document.querySelector('#start-date-error');
    const today = new Date();
    let errorMessageContent = '';
    if (startDate === '') {
        errorMessageContent = requiredFieldMessage;
    } 
    else if (new Date(startDate) < today) {
       errorMessageContent = '* Start date cannot be less than today.'
    }
    return updateErrorMessage(startDate, errorMessage, errorMessageContent);
}

function validateEndDate() {
    const startDate = document.querySelector('#start-date').value;
    const endDate = document.querySelector('#end-date').value;
    const errorMessage = document.querySelector('#end-date-error');
    let errorMessageContent = '';
    const today = new Date();
    if (endDate === '') {
        errorMessageContent = requiredFieldMessage;
    } else if (new Date(endDate) <= new Date(startDate)) {
        errorMessageContent = '* End date has to be greater than the start date.'
    }
    return updateErrorMessage(endDate, errorMessage, errorMessageContent);
}

function validateTechnology() {
    const technology = document.querySelector('#technologies').value;
    const errorMessage = document.querySelector('#technologies-error');
    let errorMessageContent = '';
    if (technology === '') {
        errorMessageContent = requiredFieldMessage;
    } 
    return updateErrorMessage(technology, errorMessage, errorMessageContent);
}

function validateDescription() {
    const description = document.querySelector('#pro-description').value;
    const errorMessage = document.querySelector('#description-error');
    let errorMessageContent = '';
    if (technology === '') {
        errorMessageContent = requiredFieldMessage;
    } 
    return updateErrorMessage(description, errorMessage, errorMessageContent);
}

function validateStatus() {
    const proStatus = document.querySelector('#status').value;
    const errorMessage = document.querySelector('#status-error');
    let errorMessageContent = '';
    if (proStatus === '') {
        errorMessageContent = requiredFieldMessage;
    } 
    return updateErrorMessage(proStatus, errorMessage, errorMessageContent);
}

