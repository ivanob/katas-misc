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

    async function writeFilePromisified(file, initialData) {
        return new Promise((resolve, reject) => {
            writeFile(file, initialData, () => resolve(true) )
        })
    }

    await writeFilePromisified(file, "");
    const users = await getUsersFromApiPromisified();
    await appendFile(file, JSON.stringify(users));
    await copyFile(file, "../dest.json");
    await unlink(file);
    console.log('Process finished');
}

/**
 * This is one step further to improve the readability of so many then clauses called together.
 * By using async/await we can give it a more imperative look 
 */