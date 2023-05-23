{
  const func1Resolve = () => Promise.resolve(1);
  const func2Rejects = () => Promise.reject(new Error("ERROR"));

  func1Resolve()
    .then(func1Resolve)
    .finally(() => {
      console.log("End of calls");
      return Promise.resolve(1);
    })
    .then(func2Rejects)
    .catch((error) => console.log("There has been an error"))
  console.log("This is going to be executed the first");
}

/**
 * The idea of this scenario is to show that the finally can go before the catch, although
 * it is not natural. This will print:
    - This is going to be executed the first
    - End of calls
    - There has been an error
 * The main point is that the finally is going to be called always at the end of the chain so
 * does not matter where it is placed.
 * 
 * The catch, on the other hand, is more dangerous if it
 * is not at the end of all the calls that can produce the error. For example, if I call a function
 * after the catch that returns a rejected promise, then that error will not be handled properly
 * and will be a fatal error in execution
 * 
 */