export class Paths
{
    public static get all(): string[]
    {
        const _ = require("lodash");
        const paths = _.uniq(_.concat(Paths.check, Paths.add));

        return paths;
    }

    public static get check(): string[]
    {
        const pathspec = require("atom-pathspec");

        return atom.config
            .get("spell-check-wordlist.checkPaths")
            .map((p: string) => pathspec.getPath(p));
    }

    public static get add(): string[]
    {
        const pathspec = require("atom-pathspec");

        return atom.config
            .get("spell-check-wordlist.addPaths")
            .map((p: string) => pathspec.getPath(p));
    }
}
