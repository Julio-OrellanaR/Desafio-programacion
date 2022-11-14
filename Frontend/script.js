const buttonGet = document.getElementById("show")

buttonGet.addEventListener('click', getInfo)

let baseUrl = "http://localhost:4000/api/SISNOVA/showInformation"

async function getInfo(e) {
    e.preventDefault()

    const res = await fetch(baseUrl, {
        method: "GET"
    })

    const data = await res.json()


    var body = document.getElementsByTagName("body")[0]

    var table = document.createElement("table")
    var tbody = document.createElement("tbody")


    var fila  = document.createElement("tr");

    var celda1 = document.createElement("td");
    var celda2 = document.createElement("td");
    var celda3 = document.createElement("td");
    var celda4 = document.createElement("td");
    var celda5 = document.createElement("td");

    var textCelda1 = document.createTextNode("      Mes     ")
    var textCelda2 = document.createTextNode("      Id Usuario     ")
    var textCelda3 = document.createTextNode("      Estado 1     ")
    var textCelda4 = document.createTextNode("      Estado 2     ")
    var textCelda5 = document.createTextNode("      Estado X     ")

    celda1.appendChild(textCelda1)
    celda2.appendChild(textCelda2)
    celda3.appendChild(textCelda3)
    celda4.appendChild(textCelda4)
    celda5.appendChild(textCelda5)

    fila.appendChild(celda1)
    fila.appendChild(celda2)
    fila.appendChild(celda3)
    fila.appendChild(celda4)
    fila.appendChild(celda5)

    tbody.appendChild(fila);

    for (let index = 0; index < data.length; index++) {

        data[index].forEach(element => {
            var fila  = document.createElement("tr");

            var celda1 = document.createElement("td");
            var celda2 = document.createElement("td");
            var celda3 = document.createElement("td");
            var celda4 = document.createElement("td");
            var celda5 = document.createElement("td");

            var textCelda1 = document.createTextNode(element.Mes)
            var textCelda2 = document.createTextNode(element.Usuario)
            var textCelda3 = document.createTextNode(element.estado1)
            var textCelda4 = document.createTextNode(element.estado2)
            var textCelda5 = document.createTextNode(element.estadox)

            celda1.appendChild(textCelda1)
            celda2.appendChild(textCelda2)
            celda3.appendChild(textCelda3)
            celda4.appendChild(textCelda4)
            celda5.appendChild(textCelda5)

            fila.appendChild(celda1)
            fila.appendChild(celda2)
            fila.appendChild(celda3)
            fila.appendChild(celda4)
            fila.appendChild(celda5)

            tbody.appendChild(fila);
        });
    }


    table.appendChild(tbody);
    body.appendChild(table)
    table.setAttribute("border", "3")

}