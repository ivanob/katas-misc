{
  const func1Resolve = () => Promise.resolve(1);
  const func2Reject = () => Promise.reject(new Error("Fails"));
  const func3Resolve = () => Promise.resolve(3);

  func1Resolve()
    .then(func3Resolve)
    .then((resp) => {
      console.log("After executing func3Resolve, it returns:", resp);
      return resp;
    })
    .catch((error) => {
      console.log("This log should not be displayed");
      console.log(error);
    })
    .finally(() => {
      console.log("End of calls");
    });
  console.log("This is going to be executed the first");
}
