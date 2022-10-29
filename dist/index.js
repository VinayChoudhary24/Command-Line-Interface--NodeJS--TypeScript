#! /usr/bin/env node
"use strict";
// The line is called a shebang line, which tells the OS to run the file with the node interpreter.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// to import and initialize Commander.js
const { Command } = require("commander");
// import fs and path modules
const fs = require("fs");
const path = require("path");
const figlet = require("figlet");
//add the following line
const program = new Command();
console.log(figlet.textSync("Dir Manager"));
// define the CLI options
program
    .version("1.0.0")
    .description("An example CLI for managing a directory")
    .option("-l, --ls  [value]", "List directory contents")
    .option("-m, --mkdir <value>", "Create a directory")
    .option("-t, --touch <value>", "Create a file")
    .parse(process.argv);
const options = program.opts();
// Define a listDirContents() function with an EXEPTION HANDLER
//define the following function
function listDirContents(filepath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // the code that lists the directory contents
            const files = yield fs.promises.readdir(filepath);
            const detailedFilesPromises = files.map((file) => __awaiter(this, void 0, void 0, function* () {
                let fileDetails = yield fs.promises.lstat(path.resolve(filepath, file));
                const { size, birthtime } = fileDetails;
                return { filename: file, "size(KB)": size, created_at: birthtime };
            }));
            // to create a table that displays the directory contents
            const detailedFiles = yield Promise.all(detailedFilesPromises);
            console.table(detailedFiles);
        }
        catch (error) {
            console.error("Error occurred while reading the directory!", error);
        }
    });
}
// define an action for the -m option
// create the following function
function createDir(filepath) {
    if (!fs.existsSync(filepath)) {
        fs.mkdirSync(filepath);
        console.log("The directory has been created successfully");
    }
}
//   define a createFile() function for the -t flag:
// create the following function
function createFile(filepath) {
    fs.openSync(filepath, "w");
    console.log("An empty file has been created");
}
//   To check if the user has used the -l or --ls option
// check if the option has been used the user
if (options.ls) {
    const filepath = typeof options.ls === "string" ? options.ls : __dirname;
    listDirContents(filepath);
}
//    invoke the createDir() and createFile() function when the user uses the appropriate option
if (options.mkdir) {
    createDir(path.resolve(__dirname, options.mkdir));
}
if (options.touch) {
    createFile(path.resolve(__dirname, options.touch));
}
//   to show the help page when no options have been passed
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
//# sourceMappingURL=index.js.map