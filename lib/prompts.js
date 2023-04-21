const inquirer = require('inquirer');
const fs = require("fs");
const { Triangle, Square, Circle } = require("./lib/shapes");
const { writeFile } = require('fs/promises');
const { join } = require('path');

const MaxLengthInputPrompt = require('inquirer-maxlength-input-prompt');
inquirer.registerPrompt('maxlength-input', MaxLengthInputPrompt);

const {Circle, Triangle, Square} = require('../shapes');

const questions = [
    {
        type: "maxlength-input",
        maxLength: 3,
        message: "Please enter the text for your logo - Three characters or less.",
        name: "logoText"
    },

    {
        type: "list",
        name: "shape",
        message: "Please select the shape you would like",
        choices: ["Circle", "Triangle", "Square"]
    },

    {
        name: "shapeFillColorOption",
        type: "list",
        message: "What kind of color do you want for the background image?",
        choices: ["Standard", "Hexadecimal"]
    },
    {
        name: "shapeFillColor",
        type: "list",
        choices: ["Red", "Yellow", "Blue", "Orange", "Green", "Violet", "White", "Black"],
        when: function (answers) {
            return answers.shapeFillColorOption === "Standard";
        }
    },

    {
        type: "maxlength-input",
        maxLength: 7,
        name: "shapeFillColor",
        message: "Enter in hex number for your color (Please include #)",
        when: function (answers) {
            return answers.shapeFillColorOption === "Hexadecimal";
        }
    },

    {
        name: "textFillColorOption",
        type: "list",
        message: "What kind of color do you want for the text?",
        choices: ["Standard", "Hexadecimal"]
    },

    {
        name: "textFillColor",
        type: "list",
        choices: ["Red", "Yellow", "Blue", "Orange", "Green", "Violet", "White", "Black"],
        when: function (answers) {
            return answers.textFillColorOption === "Standard";
        }
    },

    {
        type: "maxlength-input",
        maxLength: 7,
        name: "textFillColor",
        message: "Enter in hex number for your color (Please include #)",
        when: function (answers) {
            return answers.textFillColorOption === "Hexadecimal";
        }
    }
]

function displayQuestions() {
    inquirer
        .prompt(questions)
        .then((answers) => {

            let newShape = "";
            let userText = answers.logoText;
            let userShape = answers.shape;
            let userShapeColor = answers.shapeFillColor;
            let userTextColor = answers.textFillColor;

            if (userShape === "Circle") {
                newShape = new Circle(userText, userShapeColor, userTextColor).render();
                printSVG(newShape);
        
            } else if (userShape === "Triangle") {
                newShape = new Triangle(userText, userShapeColor, userTextColor).render();
                printSVG(newShape);

            } else {
                newShape = new Square(userText, userShapeColor, userTextColor).render();
                printSVG(newShape);
            }
        })
}

function printSVG (svgShape) {
    console.log("Logo Generated!")
    return writeFile(join(__dirname, '..', 'examples', 'logo.svg'), svgShape);
}


module.exports = displayQuestions;


