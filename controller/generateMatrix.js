var fs = require("fs");

async function create() {
  matrix = [];
  let matrixLength = 32;

  for (let i = 0; i < matrixLength; i++) {
    let array = [];
    for (let j = 0; j < matrixLength; j++) {
      array.push("x");
    }
    matrix.push(array);
  }

  let startingPoint = {
    x: Math.floor(Math.random() * matrixLength),
    y: Math.floor(Math.random() * matrixLength)
  };

  try {
    matrix[startingPoint.x][startingPoint.y] = "0";
  } catch (e) {}

  let count = { ...startingPoint };

  for (let i = 0; i < Math.floor(matrixLength * 1.5); i++) {
    let way = Math.floor(Math.random() * 4) + 1;
    let len = Math.floor(Math.random() * matrixLength * 2);

    for (let j = 0; j < len; j++) {
      if (count.x < 1) {
        count.x = count.x + Math.floor(matrixLength / 2);
      } else if (count.x > matrixLength - 1) {
        count.x = count.x - Math.floor(matrixLength / 2);
      }

      if (count.y < 1) {
        count.y = count.y + Math.floor(matrixLength / 2);
      } else if (count.y > matrixLength - 1) {
        count.y = count.y - Math.floor(matrixLength / 2);
      }
      try {
        switch (way) {
          case 1:
            count.x--;
            matrix[count.x][count.y] = "0";
            break;

          case 2:
            count.y++;
            matrix[count.x][count.y] = "0";
            break;

          case 3:
            count.x++;
            matrix[count.x][count.y] = "0";
            break;

          case 4:
            count.y--;
            matrix[count.x][count.y] = "0";
            break;
        }
      } catch (e) {
        console.log(count, matrixLength);
      }
    }
  }

  let bonus = ["3", "4", "5", "6", "7"];

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < bonus.length; i++) {
      let bonusPut = false;
      while (!bonusPut) {
        console.log("generating");
        let count = {
          x: Math.floor(Math.random() * matrixLength),
          y: Math.floor(Math.random() * matrixLength)
        };

        if (matrix[count.x][count.y] == "0") {
          matrix[count.x][count.y] = bonus[i];
          bonusPut = true;
        }
      }
    }
  }

  await setTimeout(() => {
    console.log("timeout");
    for (let i = 0; i < matrix.length; i++) {
      matrix[i] = matrix[i].join(" ");
    }

    fs.writeFile("newfile.json", JSON.stringify(matrix, null, 2), function(
      err
    ) {
      if (err) throw err;
      console.log("File is created successfully.");
    });
  }, 5000);
}

module.exports = create();
