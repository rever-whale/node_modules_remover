#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { program } = require('commander');
const rimraf = require("rimraf");

program
  .option('-p, --path <path>', 'path name')
  .option('-t, --target <filename>', 'The name of the folder and file to be deleted', 'node_modules');

program.parse(process.argv);

if(!program.path) throw new Error('Please enter a folder path');
const { path: targetPath, target: targetName } = program.path;
const rootPath = getPath(targetPath);
let count = 0;

if(existsPath(rootPath)) {
  processDelete(rootPath, targetName);
} else {
  throw new Error('Invalid Path');
}

function processDelete(rootPath, targetName) {
  if(isDirectory(rootPath)) {
    const dirContents = readDirectory(rootPath);
    dirContents.forEach(item => {
      const itemPath = path.resolve(rootPath, item);
      if(isDirectory(itemPath)) {
        if(item === targetName) {
          console.log(`[${count++}] ${itemPath}`);
          deletePath(itemPath);
        } else {
          processDelete(itemPath, targetName);
        }
      }
    })
  }
}

function readDirectory(path) {
  return fs.readdirSync(path);
}

function isDirectory(path) {
  const stats = fs.statSync(path);
  return stats.isDirectory();
}

function deletePath(path) {
  rimraf.sync(path);
}

function existsPath(path) {
  return fs.existsSync(path);
}

function getPath(pathString) {
  return path.resolve(__dirname, pathString);
}
