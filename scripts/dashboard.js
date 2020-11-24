const res = JSON.parse(localStorage.getItem("resources"));
const pro = JSON.parse(localStorage.getItem("projects")) || [];

const validProjects = res.filter(res => res.Project !== null);
const billableResources = validProjects.filter(pro => pro.Billable == "true");
const shadowResources = validProjects.filter(pro => pro.Billable == "false");

document.getElementById("projects").innerHTML = pro.length;
document.getElementById("employees").innerHTML = validProjects.length;
document.getElementById("billables").innerHTML = billableResources.length;
document.getElementById("shadows").innerHTML = shadowResources.length;

function getResources() {
    const projectsAll = validProjects.map( a => a.Project);
    const countRes = getCount(projectsAll);
    return countRes;
}

function getTechnology() {
    const techs = pro.map( techn => techn.technology);
    const countTech = getCount(techs);
    console.log(countTech);
    return countTech;
}

function getCount(all) {
    let allArr = [];
    all.map(element => {
        allArr += [element + ","];
    });
    const eachv = allArr.split(",").slice(0,-1);
    console.log(eachv);
    let countEach = {};
    eachv.forEach(i=> { countEach[i] = (countEach[i]||0) + 1;});
    console.log(countEach);
    return countEach;
}

function projectTechnologyChart() {
    const technologyCount = getTechnology();
    const id = document.querySelector('#tech-chart');
    const technologies = Object.keys(technologyCount);
    const projectsNumber = Object.values(technologyCount);
    const legendLabel = 'Projects';
    const graphType = 'bar' ;
    createChart(id, graphType, technologies, legendLabel, projectsNumber);
}

function resourceProjectChart() {
    const resources = getResources();
    const id = document.querySelector('#resource-chart')
    const projectNames = Object.keys(resources);
    const resourcesNumber = Object.values(resources);
    console.log(resourcesNumber);
    const legendLabel = 'Resources';
    const graphType = 'horizontalBar';
    createChart(id, graphType, projectNames, legendLabel, resourcesNumber);
}

function createChart(canvas, graphType, labels, legendLabel, dataValues) {
    let graph =  new Chart(canvas, {
        type: graphType,
        data: {
            labels: labels,
            responsive: true,
            maintainAspectRatio: true,
            datasets: [{
                label: legendLabel,
                data: dataValues,
                backgroundColor: '#FF5E00'
            }]
        },
        options: {
            tooltips: {
                backgroundColor: '#000000',
                titleFontColor: '#ffffff',
                bodyFontColor: '#ffffff'
            },
            legend: {
                display: true,
                labels: {
                    fontColor: '#FF5E00'
                }
            },
            scales: {
                xAxes: [{
                    ticks: {
                        display: true,
                        beginAtZero: true,
                        precision: 0,
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        precision: 0,
                    }
                }]
            },
        }
    })
}

projectTechnologyChart();
resourceProjectChart();

function displayTechnologyBar() {
    const sortTech = getTechnology();
    const sortArray = Object.entries(sortTech).sort(([,a],[,b]) => b-a);
    
    const sortObj = sortArray.reduce((a, [b, c]) => ({ ...a, [b]: c }), {});
    console.log(sortObj);

    const technologyProjectCount = document.querySelector('#technology-project-count');
    const techCountArray = Object.values(sortObj);
    
    for (let x in sortObj) {
        const technologyList = `<div class="technology">
        <span class="count">${sortObj[x]}</span>
        <span class="technology-details">
          <span class="progress"></span><br>
          <span class="technology-name">${x.toUpperCase()}</span>  
        </span></div>`;
        console.log(sortObj[x]);
        console.log(x);
        technologyProjectCount.innerHTML += technologyList;
    }
    const progressBar = d3.selectAll('.progress').data(techCountArray);
    const totalProjects = validProjects.length;

    progressBar.transition()
            .style('padding-right', function (d) {
                return d / totalProjects * 150 + '%';
            })
            .duration('1000');
}

displayTechnologyBar();

function menuDisplay() {
    const resMenu = document.getElementById("responsive");
    const resIcon = document.getElementById("menuHam");
    resIcon.addEventListener("click" , function(){
        resMenu.classList.toggle("show");
    })
}

menuDisplay();
            









 
 




  
  


