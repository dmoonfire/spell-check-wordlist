import * as fs from "fs";

export class Logger
{
    public static log(message: string): void
    {
        // This is here for debugging.
        // fs.appendFile(
        //     "/tmp/spell-check-wordlist.txt",
        //         "spell-check-wordlist: " + message + "\n",
        //     () => { });
    }
}
