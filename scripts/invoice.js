const days = document.getElementById("invoiceDays");
const genBtn = document.getElementById("generateBtn");

const currentProject = JSON.parse(localStorage.getItem("currentproject"));
const dataList =JSON.parse(localStorage.getItem("resources"));

const requireddata = dataList.map(data => [data.Project, data.Name, data.RateperHour, data.Billable]);
const required = requireddata.filter(data => data[3] == "true");
const tableData = required.map(data => [data[0], data[1], data[2]]);
console.log(tableData);


function invoiceTable() {
    const newTable = document.getElementById("invoice-table");
    const table = document.createElement('table');
    const headers = ["Project" ,"Name" ,"Rate/Hour" , "Amount"]
    const headerRow = document.createElement("tr");
    headers.forEach(headerText=> {
        let header = document.createElement("th");
        let textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
        headerRow.appendChild(header);
    });
    table.appendChild(headerRow);
    newTable.appendChild(table); 

    tableData.forEach(element => {
        if(element[0] == currentProject.name) {
            let row = document.createElement("tr");
            Object.values(element).forEach(text =>{
                let cell = document.createElement("td");
                let textNode = document.createTextNode(text);
                cell.appendChild(textNode);
                row.appendChild(cell);
            });
            genBtn.addEventListener("click", function() {
                let amount = element[2]* days.value ;
                console.log(element[2]);
                console.log(amount);
                let cellAmt =  document.createElement("td");
                cellAmt.classList.add("countable");
                let amtNode = document.createTextNode(amount);
                cellAmt.appendChild(amtNode);
                row.appendChild(cellAmt);

                const tds = newTable.getElementsByTagName('td');
                let sum = 0;
                for(let i = 0; i < tds.length; i ++) {
                    if(tds[i].className == 'countable') {
                        sum += isNaN(tds[i].innerHTML) ? 0 : parseInt(tds[i].innerHTML);
                    }
                }
                document.getElementById('total').innerHTML = "Total Billable Amount: " + sum ;
            });        
            table.appendChild(row);          
        }
    });
    newTable.appendChild(table);
}