import * as fs from "fs";
import { Paths } from "./Paths";
import { SpellCheckCheckResults } from "./SpellCheckCheckResults";

/**
 * Encapsulates the logic for managing a single wordlist file.
 */
export class Manager
{
    public spelling: any;
    public checker: any;

    constructor()
    {
        // Create the tokenizer and spelling manager.
        const sm = require("spelling-manager");

        this.spelling = new sm.TokenSpellingManager();
        this.checker = new sm.BufferSpellingChecker(this.spelling);
    }

    public add(path: string, word: string): void
    {
        // If we don't have a file, we have nothing.
        let lines: string[] = [];

        if (fs.existsSync(path))
        {
            lines = fs.readFileSync(path).toString().split("\n");
        }

        // Add the list and order it.
        const _ = require("lodash");

        lines = _.uniq(_.concat(lines, [word])).filter((l: string) => !!l);
        lines.sort();

        // Write it out.
        fs.writeFileSync(path, lines.join("\n") + "\n");
    }

    public check(text: string): SpellCheckCheckResults
    {
        let ranges = []
        const checked = this.checker.check(text);

        for (const token of checked)
        {
            if (token.status === 1)
            {
                ranges.push({ start: token.start, end: token.end });
            }
        }

        return { correct: ranges }
    }

    public load(): void
    {
        // Clear out the spelling manager.
        this.spelling.sensitive = [];
        this.spelling.insensitive = [];

        // Loop through every file in the path.
        for (const path of Paths.all)
        {
            // If we don't have a file, we're done.
            if (!fs.existsSync(path))
            {
                continue;
            }

            // Load the file into memory.
            var lines = fs.readFileSync(path).toString().split("\n");

            for (const line of lines)
            {
                if (line)
                {
                    this.spelling.addCaseInsensitive(line);
                }
            }
        }
    }
}
