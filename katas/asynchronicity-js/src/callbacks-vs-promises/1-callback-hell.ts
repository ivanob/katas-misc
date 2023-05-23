import {appendFile, copyFile, unlink, writeFile} from "node:fs"
{
    const file = "users.json"
    const data = { user: ["Núria", "Isma"] };

    function getUsersFromApi(callback) {
        callback(data);
    }

    writeFile(file, "", () => {
        getUsersFromApi( (users) => {
            appendFile(file, JSON.stringify(users), () => {
                copyFile(file, "../dest.json", () => {
                    unlink(file, () => {
                        console.log('Process finished')
                    })
                })
            })
        })
    })
}

/**
 * Explanations:
 * writeFile: writes in a file whatever it returns the third parameter that it receives as parameter.
 * getUsersFromApi: its an API call (mocked) that returns the list of users, it receives a callback that is
 * executed when the users are fetched
 * appendFile: appends whatever we pass as second parameter to the file. When it is done, it calls the callback
 * copyFile: copies a file in the filesystem to the destination received in the second param and calls the callback
 * unlink: closes the file and calls the callback, which is a console.log
 */