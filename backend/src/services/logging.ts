export const logMessage = (label: string, log: any, endMessage?: string): void => {
    console.log("===================================")
    console.log(label, log)
    console.log("===================================")
    if(endMessage) console.log(endMessage)
}