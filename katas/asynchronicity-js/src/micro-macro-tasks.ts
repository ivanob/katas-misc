{
    setTimeout(() => {
        console.log('Finished the setInterval execution')
    }, 0);
    Promise.resolve(1).then(x => {
        console.log('Finished the Promise resolution')
    })
    console.log('Finished the main-loop instructions')
}

/**
 * The execution order is:
 *  - Finished the main-loop instructions
 *  - Finished the Promise resolution
 *  - Finished the setInterval execution
 * 
 * Explanation: The highest priority is for main-loop instructions so before
 * any async call, the program executes the last log.
 * Then, both promises and timeouts are async tasks but they go to different
 * stacks. Promises goes to microtasks stask and timeouts and I/O go to macrotasks.
 * The priority is for microtasks and then, if there are no more pending one, it
 * executes the macrotasks
 */