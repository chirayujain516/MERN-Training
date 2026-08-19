const os = require("os");

console.log(os.freemem() / 1024 / 1024 / 1024);
console.log(os.cpus().length);
console.log(os.totalmem() / 1024 / 1024 / 1024);
console.log(os.cpus().at());
console.log(os.uptime() / 60);
