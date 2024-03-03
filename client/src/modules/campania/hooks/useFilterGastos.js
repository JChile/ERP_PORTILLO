
export const useFilterGastos = () => {

    function getSemanasPorMes(date) {
        const year = date.getFullYear()
        const month = date.getMonth()
        const PRIMER_DIA = 1;
        const ULTIMA_DIA = new Date(year, month + 1, 0).getDate()

        const datePrimerDiaMes = new Date(year, month, PRIMER_DIA)
        const numeroSemanaPrimerDiaMes = datePrimerDiaMes.getDay()

        let inicioFinMes = [[],[],[],[],[],[]];

        for(let i=0; i<6; i++){
            if(i === 0){
                inicioFinMes[i][0] = 1
                inicioFinMes[i][1] = 7 - numeroSemanaPrimerDiaMes
            } else {
                let inicioMes = inicioFinMes[i - 1][1] + 1
                inicioFinMes[i][0] = inicioMes
                let finMes = inicioMes + 6
                if(ULTIMA_DIA <= finMes){
                    inicioFinMes[i][1] = ULTIMA_DIA
                    break
                } else {
                    inicioFinMes[i][1] = finMes
                }
            }
        }
        return inicioFinMes.filter(arrayInterno => arrayInterno.length > 0);
    }

    function filtrarGastosPorSemana(data, semanasFecha, selectedSemana, date) {
        console.log("Se ejecuto")
        const monthNow = date.getMonth() + 1
        const dataFormat = data.filter((element) => {
            const parserMonth = parseInt(element["month"])
            if(parserMonth === monthNow){
                return true
            } else {
                return false
            }
        })
        if(selectedSemana === -1){
            return dataFormat;
        } else {
            const inicioSemana = semanasFecha[selectedSemana][0]
            const finSemana = semanasFecha[selectedSemana][1]
            if(inicioSemana && finSemana){
                return dataFormat.filter((element) => {
                    const parserDay = parseInt(element["day"])
                    if (inicioSemana <= parserDay && finSemana >= parserDay){
                        return true
                    } else {
                        return false
                    }
                    
                })
            } 
        }
    }

    function showDataParser(week, dataWeeks, date){
        const nameMonth = date.toLocaleString('default', { month: 'long' })
        const year = date.getFullYear()

        if(week === -1){
            const finMes = new Date(year, date.getMonth() + 1, 0)
            return {
                inicio: `Del 01 de ${nameMonth} del ${year}`,
                fin: `Al ${String(finMes.getDate()).padStart(2, '0')} de ${nameMonth} del ${year}`
            }
        } else {
            return {
                inicio: `Del ${String(dataWeeks[week][0]).padStart(2, '0')} de ${nameMonth} del ${year}`,
                fin: `Al ${String(dataWeeks[week][1]).padStart(2, '0')} de ${nameMonth} del ${year}`
            }
        }
    }

    return {
        showDataParser,
        filtrarGastosPorSemana,
        getSemanasPorMes
    }
}