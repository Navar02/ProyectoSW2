export { initState }

let initState = function (what, solutionId) {
    // YOUR CODE HERE
    let data = localStorage.getItem(what);
    let state = JSON.parse(data);
    if (state === null) {
        state = {
            "guesses": [],
            "solutionId": solutionId,
        };
        localStorage.setItem('situation.json', JSON.stringify(state));
    }


    return [state, function (guess) {
        if (guess != null) {
            state.guesses.push(guess);
            localStorage.setItem('situation.json', JSON.stringify(state));
        }
    }]
}



