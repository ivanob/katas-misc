{
  const func1Resolve = () => Promise.resolve(1);
  const func2Reject = () => Promise.reject(new Error("Fails"));
  const func3Resolve = () => Promise.resolve(3);

  func1Resolve()
    .then(func2Reject)
    .then((resp) => {
      console.log("This log should not be displayed");
      return resp;
    })
    .then(func3Resolve)
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      console.log("End of calls");
    });
  console.log("This is going to be executed the first");
}

/**
 * The logs will be:
    - This is going to be executed the first
    - Error: Fails
    - End of calls
 * Explanation: In line 6 we pass a function that return a rejected promise as
 * callback to the first function. So when funct1Resolve resolves succesfully
 * and with that result calls that callback it fails. Then line 7 does not
 * execute cause it jumps directly to the catch that gets ALL the errors
 * IN ANY 'THEN'. After executing the catch it goes to the finally statement
 * ALWAYS (wether it rejected/catch or not).
 *
 * When the func1Resolve is called in line 5 it executes asynchronously so
 * inmediatly after being called, the main execution of the program continues
 * and goes to line 18 before anything else, cause the main loop has priority
 * over microtasks (promises)
 */
