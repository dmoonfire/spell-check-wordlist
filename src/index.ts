class SpellCheckWordlist
{
    public activate(): void
    {
        console.log("activated!");
    }

    public provideSpellCheck()
    {
        return require.resolve("./Plugin");
    }
}

module.exports = new SpellCheckWordlist();
