document.getElementById("details").addEventListener("click" , function() {
    document.getElementById("project-detail").style.display = "block";
    document.getElementById("project-resourc").style.display = "none";
});

document.getElementById("resources").addEventListener("click" , function() {
    document.getElementById("project-detail").style.display = "none";
    document.getElementById("project-resourc").style.display = "block";
});

