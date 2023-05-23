//Here I will call the then with its second param
{
  const func1Resolve = () => Promise.resolve(1);
  const func2Random = () => {return new Promise((resolve, reject) => {(Math.random()>0.5) ? resolve(1) : reject(new Error("Error"))})}

  func1Resolve()
    .then(func1Resolve)
    .then(func2Random)
    .then(func2Random, (error) => console.log('It has failed in the FIRST random call')) /* This second error-handling callback that executes
    when the call in line 9 fails */
    .then(func2Random, (error) => console.log('It has failed in the SECOND random call'))
    .then(func1Resolve, (error) => console.log('It has failed in the THIRD random call'))
    .catch((error) => {
      /* Non reachable code, because in case of error it would be handled in each particular catch, and will never reach this one
      cause the last call is a call that always resolves */
      console.log("This log should not be displayed");
      console.log(error);
    })
    .finally(() => {
      console.log("End of calls");
    });
  console.log("This is going to be executed the first");
}

/**
 * The idea behind this scenario is that we dont need to have a common catch for all the errors we can inner. In
 * this case we will handle each error independently
 * 
 * Explanation: func2Random is a function that has 0.5 probability of reject (and obviously 0.5 prob of resolve)
 * each time it gets called (in its 'then' clause) gets handled and the execution continues. So for instance if in line 8
 * we call the function and it fails, then it gets handled in line 9 (second callback) and continues with executing the call
 * in line 9 (that will be handled if it fails in line 10), and so on.
 * 
 * In line 8 there is no error handling cause that then belongs to the first call in line 7, that never fails
 * 
 * The code in the finally statement always get executed.
 * 
 * Example of trace:
        This is going to be executed the first
        It has failed in the FIRST random call
        It has failed in the THIRD random call
        End of calls
*/