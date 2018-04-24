import * as path from "path";
import * as fs from "fs";
import "atom";
import { SpellCheckCheckResults } from "./SpellCheckCheckResults";
import { SpellCheckArgs } from "./SpellCheckArgs";
import { SpellCheckTarget } from "./SpellCheckTarget";
import { SpellCheckTargetWord } from "./SpellCheckTargetWord";
import { Manager } from "./Manager";
import { Paths } from "./Paths";
import { Logger } from "./Logger";

export default class Plugin
{
    private manager: Manager | undefined;

    public getId(): string { return "spell-check-wordlist"; }

    public getName(): string { return "Wordlist"; }

    public getPriority(): number { return 25; }

    public isEnabled(): boolean { return true; }

    public getStatus(): string { return "Working correctly."; }

    public providesSpelling(args: SpellCheckArgs): boolean
    {
        return Paths.all.length > 0;
    }

    public providesSuggestions(args: SpellCheckArgs): boolean
    {
        return this.providesAdding(args);
    }

    public providesAdding(args: SpellCheckArgs): boolean
    {
        return Paths.add.length > 0;
    }

    public check(args: SpellCheckArgs, text: string): SpellCheckCheckResults
    {
        const manager = this.init();

        return manager.check(text);
    }

    public suggest(args: SpellCheckArgs, word: string): string[]
    {
        console.log(Paths.all);
        const manager = this.init();

        return manager.spelling.suggest(word);
    }

    public getAddingTargets(args: SpellCheckArgs): SpellCheckTarget[]
    {
        return Paths.add
            .map(p => <SpellCheckTarget>{
                path: p,
                label: "Add to " + path.basename(p),
            });
    }

    public add(args: SpellCheckArgs, target: SpellCheckTargetWord): void
    {
        const manager = this.init();

        manager.add(target.path, target.word);
    }

    private init(): Manager
    {
        if (!this.manager)
        {
            this.manager = new Manager();
            this.manager.load();
        }

        return this.manager;
    }
}
