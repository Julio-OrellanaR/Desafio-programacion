import { getConnection } from "../database/desafio.database"
var fs = require("fs")

const getRaiz = async (req, res) => {
    try {
        const connection = await getConnection()
        const query = await connection.query("select * from Informacion;")

        res.send(query)
    } catch (error) {
        res.status(500).json({Message: error.message})
    }
}

const postArchivo = async (req, res) => {
    try {
        const {url} = req.body
        const dataFile = readFile(url)
        const connection = await getConnection()

        dataFile.data.forEach(element => {
            let fecha = unixToDate(element.created_at)
            let params = [fecha, element.user_id, element.status_id]

            const query = connection.query("call insertTicket(?,?,?);", params)
        });

        res.json({Message: "Ticketes added successful"})
    } catch (error) {
        res.status(500).json({Message: error.message})
    }
}

const showReport = async (req, res) => {
    try {
        const connection = await getConnection()
        const query = await connection.query("call reporte();")

        const reporte = createReport(query[0])

        res.send(reporte)
    } catch (error) {
        res.status(500).json({Message: error.message})
    }
}


function readFile(url){
    const read = fs.readFileSync(url)
    const data = JSON.parse(read)
    return data
}

function unixToDate(unixTime){
    let date = new Date(unixTime*1000).toLocaleDateString('en-CA')
    return date
}

function createReport(data){
    const months = []
    data.forEach(element => {
        if (!(months.find(month => month == element.Mes))) {
            months.push(element.Mes)
        }
    });

    var finalReport = []
    for (let index = 0; index < months.length; index++) {
        const moth = months[index];
        
        var reportTemp = []
        data.forEach(element => {
            
            if (element.Mes == moth) {
                var e1=0
                var e2=0
                var ex=0

                if (element.Estado == 1) {
                    e1++
                }else if (element.Estado == 2) {
                    e2++
                }else{
                    ex++;
                }
                
                if (reportTemp.length == 0) {
                    let dic = {
                        Mes: element.Mes,
                        Usuario: element.idUsuario,
                        estado1: e1,
                        estado2: e2,
                        estadox: ex
                    }
                    reportTemp.push(dic)
                }else{
                    let position = existUser(reportTemp, element.idUsuario)
                    if (position == -1) {
                        let dic = {
                            Mes: element.Mes,
                            Usuario: element.idUsuario,
                            estado1: e1,
                            estado2: e2,
                            estadox: ex
                        }
                        reportTemp.push(dic)
                    }else{
                        reportTemp[position].estado1 += e1,
                        reportTemp[position].estado2 += e2,
                        reportTemp[position].estadox += ex
                    }
                }
            }
        });
        finalReport.push(reportTemp)
    }

    return finalReport
}

/**
 * Sirve para veficar si el usaurio existe en el reporte por mes y manda la posicion y si no es -1
 * @param {*} data es el arreglo que trae los datos pro mes 
 * @param {*} usuario usario como bandera para verificar si existte
 * @returns index si ecuentra posicion || -1 si no existe
 */
function existUser(data, usuario){
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if (element.Usuario == usuario) {
            return index
        }
    }
    return -1
}

export const methods = {
    getRaiz,
    postArchivo,
    showReport
}