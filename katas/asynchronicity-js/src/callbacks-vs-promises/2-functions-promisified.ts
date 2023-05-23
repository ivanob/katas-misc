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