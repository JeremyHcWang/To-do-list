////////////////////// /////////////////////// /////////////////////////// 
//GET works by getting the information from another server. since we have access to this information we dont need to use GET since we are not accessing another server just our elements in our html file. 
// FIRST ATTEMPT TO GET THE INFORMATION AND PREPARE TO POST 
// GET request to fetch data
// fetch("https://sheetdb.io/api/v1/syjh4oitkkynm")
//     .then( (data) => data.json())
//     .then( (data) => {
//         console.log(data);
//         for (let i = 0; i < data.length; i++) {
//             document
//               .querySelector('body')
//               .appendChild(document.createElement('p')).innerHTML =
//               data[i];
//         }
//     });
////////////////////// /////////////////////// /////////////////////////// 

//this approach came about do to errors in devTools describing "Refused to execute inline event handler because it violates the following Content Security Policy directive: "script-src 'self'". Either the 'unsafe-inline' keyword, a hash ('sha256-...'), or a nonce ('nonce-...') is required to enable inline execution. Note that hashes do not apply to event handlers, style attributes and javascript: navigations unless the 'unsafe-hashes' keyword is present."
// Saving saveDb button as a variable
let saveDb = document.getElementById("saveDb");

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://sheetdb.io/api/v1/syjh4oitkkynm')
  .then((data) => data.json())
  .then((data) => {
    let todo;
    for (let i=0; i<data.length; i++) {
      todo = data[i].Topic + ': ' + data[i].Task
      document.querySelector('body').appendChild(document.createElement('div')).textContent =
              todo;
    }
  })
})

// Adding an event listener to invoke sendDatatoSheetDB whenever saveDb button is clicked
saveDb.addEventListener("click", () => {
  sendDataToSheetDB();
});
//store task-input data in variables to later pass them to send it to sheetDB
const taskElements = document.getElementById("task-input");
const topicElements = document.getElementById("topic-input");


// // EventListener listening to input changes for taskElements
// taskElements.addEventListener("input", function () {
//   // value is being stored into taskElement while also running console.log 
//   console.log(this.value);
// });
// //EventListener listening to topic input changes for topicElements
// topicElements.addEventListener("input", function () {
//   //value is being stored into topicElement while also running console.log to make sure we have appropriate information structure.
//   console.log(this.value);
// });


//test function to see if button onclick works with extension if not switch to id
// function testFunc() {
//  alert('test func')
// }

async function sendDataToSheetDB() {

  //const taskElements = document.getElementsById("taskInput").placeholder;
  //const topicElements = document.getElementsById("topicInput").placeholder;
  // console.log('these are our taskElements',taskElements)
  // console.log('these are our topicElements',topicElements)
  
  // const dataToSend = {
  // data: []
  // };

// // Loop through the task elements and collect their values
// for (const taskElement of taskElements) {
//   //use trim to get rid of any unnecessary spaces in order to be able to store the data effectively. Hence we clean up the user input before sending it to the SheetDB API
//   const taskValue = taskElement.value.trim();
//   console.log(taskValue);
//   if (taskValue !== "") {
//     dataToSend.data.push({ task: taskValue, status: 'pending' });
//   }
// }
// // Loop through the task elements and collect their values
// for (const topicElement of topicElements) {
//   //use trim to get rid of any unnecessary spaces in order to be able to store the data effectively. Hence we clean up the user input before sending it to the SheetDB API
//   const topicValue = topicElement.value.trim();
//   console.log(topicValue);
//   if (topicValue !== "") {
//     dataToSend.data.push({ topic: topicValue, status: 'pending' });
//   }
// }
  fetch("https://sheetdb.io/api/v1/syjh4oitkkynm", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [
          {
            Task: taskElements.value,
            Topic: topicElements.value,
          },
        ]
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    //
    document.addEventListener('DOMContentLoaded', ()=> {
      const saveButton = document.querySelector('button');
      saveButton.addEventListener('click',sendDataToSheetDB)
    });
}

