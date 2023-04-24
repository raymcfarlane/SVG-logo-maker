const inquirer = require('inquirer');
const fs = require("fs");
const prompt = require('./lib/prompts.js');

function createLogo(response) {
    const svg = setShape(response);
    fs.writeFile(fileName, svg, ()=> console.log('Generated logo.svg'));
};