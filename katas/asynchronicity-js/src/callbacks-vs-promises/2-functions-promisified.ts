import {appendFile, copyFile, unlink} from "node:fs/promises"
import {writeFile} from "node:fs"
// Note that I am importing now the promisified version of the functions that I was using before.
// I have just left writeFile as before to show a manual promisification
{
    const file = "users.json"
    const data = { user: ["Núria", "Isma"] };

    function getUsersFromApi(callback) {
        return callback(data);
    }

    /* Lets imagine I dont have access to getUsersFromApi, so I have to promisify it
    wrapping it so now it returns a promise and I can use the then/catch approach */
    function getUsersFromApiPromisified() {
        return new Promise((resolve, reject) => {
            getUsersFromApi(resolve)
        })
    }

    function writeFilePromisified(file, initialData) {
        return new Promise((resolve, reject) => {
            writeFile(file, initialData, () => resolve(true) )
        })
    }

    writeFilePromisified(file, "")
        .then(getUsersFromApiPromisified)
        .then((users) => {return appendFile(file,  JSON.stringify(users))})
        .then(() => {return copyFile(file, "../dest.json")})
        .then(() => {return unlink(file)})
        .then(() => {console.log('Process finished')})
}

/**
 * The idea is to promisify the functions I was calling before so instead of receiving a callback 
 * to call when they finish their execution, they will return a promise instead that we can handle
 * with the then/catch methods.
 * 
 * Just to save time I have promisified a couple of callback-style functions... and the rest I have
 * just imported its promisified version already cause its available to be used.
 * 
 * Important: the point of returning the calls we are doing in the 'then' is to allow to continue
 * chaining thens.
 */