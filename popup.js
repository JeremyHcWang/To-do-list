// GET request to fetch data
fetch("https://sheetdb.io/api/v1/syjh4oitkkynm")
    .then( (data) => data.json())
    .then( (data) => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            document
              .querySelector('body')
              .appendChild(document.createElement('p')).innerHTML =
              data[i];
        }
    });

// update the props to include class names
function sendDataToSheetDB() {
    fetch("https://sheetdb.io/api/v1/syjh4oitkkynm", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(['wake up', 'eat breakfast', 'hackhour']),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

sendDataToSheetDB();