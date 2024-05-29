/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

const questions = [
    {
        type: 'input',
        message: "Type in your URL:",
        name: "URL",
    },
    {
        type: 'rawlist',
        name: 'actionType',
        message: 'You can : ',
        choices: ['Save a QR code image.', 'Save a txt file.'],
    },
];

inquirer.prompt(questions).then((answers) => {
    console.log(answers);
    const url = answers.URL;
    if (answers.actionType === 'Save a QR code image.') {
        //寫法參照 NPM qr-image 資料
        var qr_img = qr.image(url);
        qr_img.pipe(fs.createWriteStream('qr_img.png'));

    } else if (answers.actionType === 'Save a txt file.') {
        fs.writeFile("URL.txt", url, (err) => {
            if (err) throw err;
            console.log("The file has been saved!");
          });
    }
    //透過prompt輸入之資料可知 answers 內的 object 為 URL，可用 console.log 確認
    

    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

