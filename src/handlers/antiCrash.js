module.exports = (client) => {
    process.removeAllListeners();

    process.on('unhandledRejection', (reason, p) => {
        console.log(' [AntiCrash] - unhandledRejection '.bgRed);
        console.log(reason, p + "".bgCyan);
    });
    process.on("uncaughtException", (err, origin) => {
        console.log(' [AntiCrash] :: uncaughtException '.bgRed);
        console.log(err, origin + "".bgCyan);
    })
    process.on('uncaughtExceptionMonitor', (err, origin) => {
        console.log(' [AntiCrash] :: uncaughtExceptionMonitor '.bgRed);
        console.log(err, origin + "".bgCyan);
    });
    process.on('multipleResolves', () => {

    });
    process.on('SIGINT', () => process.exit());
    process.on('SIGUSR1', () => process.exit());
    process.on('SIGUSR2', () => process.exit());
}