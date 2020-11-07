let model;
let targetLabel = "C";
let state = "collection";

function setup() {
   createCanvas(windowWidth, windowHeight);
   background(255);
   
   model = ml5.neuralNetwork({
      inputs: ['x', 'y'],
      outputs: ['label'],
      task: 'classification'
   });
}

function mousePressed() {
   let inputs = {
      x: mouseX,
      y: mouseY
   }

   if (state == "collection") {
      noFill();
      stroke(0);
      strokeWeight(3);
      circle(mouseX, mouseY, 40);

      noStroke();
      fill(0);
      textAlign(CENTER, CENTER);
      textSize(25);
      text(targetLabel, mouseX, mouseY);

      let target = {
         label: targetLabel
      }

      model.addData(inputs, target);
   }

   else if (state == "prediction") {
      model.classify(inputs, (error, results) => {
         if (error) {
            return console.log(error);
         }

         console.log(results);

         fill(0,0,255,100);
         stroke(0);
         strokeWeight(3);
         circle(mouseX, mouseY, 40);

         noStroke();
         fill(0);
         textAlign(CENTER, CENTER);
         textSize(25);
         text(results[0].label, mouseX, mouseY);
      })
   }
}

function keyPressed() {
   let whileTraining = (epoch,loss) => console.log(`epoch: ${epoch}`);
   let finTraining = () => {
      console.log('finished training');
      state = "prediction";
   };

   if (key == "t") {
      console.log('starting training');

      state = "training";
      model.normalizeData();

      model.train({
         epochs: 200
      }, whileTraining, finTraining);
   }
   else {
      targetLabel = key.toUpperCase();
   }
}