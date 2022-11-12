// YOUR CODE HERE :  
// .... stringToHTML ....
import { stringToHTML } from "./fragments.js"
// .... setupRows .....
export { setupRows }

const delay = 350;
const attribs = ['nationality', 'leagueId', 'teamId', 'position', 'birthdate']


let setupRows = function (game) {


    function leagueToFlag(leagueId) {
        // YOUR CODE HERE
        return fetchJSON("leagueId").filter(e => e.id == leagueId).map(e => e.id).join()
    }


    function getAge(dateString) {
        // YOUR CODE HERE
        let hoy = new Date()
        let fechaNacimiento = new Date(dateString)
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
        let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
        if (
            diferenciaMeses < 0 ||
            (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
        ) {
            edad--
        }
        return edad
    }

    let check = function (theKey, theValue) {
        // YOUR CODE HERE
        let jugador = getSolution(fetchJSON("fullplayers"), fetchJSON("solution"), differenceInDays(new Date(2022, 8, 18)))
        let rdo = ""
        switch (theKey) {
            case "birthdate":
                let diff = new Date(jugador.map(e => e[theKey])) - new Date(theValue)
                if (diff == 0) {
                    rdo = "correct"
                } else if (diff > 0) {
                    rdo = "higher"
                } else rdo = "lower"
                break

            default:
                if (jugador.map(e => e[theKey]) == theValue) {
                    rdo = "correct"
                } else rdo = "incorrect"
                break
        }

        return rdo
    }

    function setContent(guess) {
        // let res = 
        return [
            `<img src="https://playfootball.games/who-are-ya/media/nations/${guess.nationality.toLowerCase()}.svg" alt="" style="width: 60%;">`,
            `<img src="https://playfootball.games/media/competitions/${leagueToFlag(guess.leagueId)}.png" alt="" style="width: 60%;">`,
            `<img src="https://cdn.sportmonks.com/images/soccer/teams/${guess.teamId % 32}/${guess.teamId}.png" alt="" style="width: 60%;">`,
            `${guess.position}`,
            `${getAge(guess.birthdate)}`
        ]

        // // Check age (Ejer 8.4)
        // let decision = check("birthdate", guess.birthdate)
        // if (decision == "lower") {
        //     res.push(`${getAge(guess.birthdate)} ${lower}`)
        // } else if (decision == "higher") {
        //     res.push(`${getAge(guess.birthdate)} ${higher}`)
        // } else {
        //     // Hemos acertado la edad
        //     res.push(`${getAge(guess.birthdate)}`)
        // }

        // return res;
    }

    function showContent(content, guess) {
        let fragments = '', s = '';
        for (let j = 0; j < content.length; j++) {
            s = "".concat(((j + 1) * delay).toString(), "ms")
            fragments += `<div class="w-1/5 shrink-0 flex justify-center ">
                            <div class="mx-1 overflow-hidden w-full max-w-2 shadowed font-bold text-xl flex aspect-square rounded-full justify-center items-center bg-slate-400 text-white ${check(attribs[j], guess[attribs[j]]) == 'correct' ? 'bg-green-500' : ''} opacity-0 fadeInDown" style="max-width: 60px; animation-delay: ${s};">
                                ${content[j]}
                            </div>
                         </div>`
        }

        let child = `<div class="flex w-full flex-wrap text-l py-2">
                        <div class=" w-full grow text-center pb-2">
                            <div class="mx-1 overflow-hidden h-full flex items-center justify-center sm:text-right px-4 uppercase font-bold text-lg opacity-0 fadeInDown " style="animation-delay: 0ms;">
                                ${guess.name}
                            </div>
                        </div>
                        ${fragments}`

        let playersNode = document.getElementById('players')
        playersNode.prepend(stringToHTML(child))
    }

    let getPlayer = function (playerId) {
        // YOUR CODE HERE
        return game.players.filter(e=>e.id == playerId)

    }

    return  addRow = function (playerId) {

        let guess = getPlayer(playerId)
        console.log(guess)

        let content = setContent(guess)
        showContent(content, guess)
    }
}
