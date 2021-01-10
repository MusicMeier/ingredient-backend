# ingredient-backend
<h1>IngredientCheck</h1>
A next level label reader that takes the and extra step by comparing the label to a list.
<br></br>
<h2>General Info</h2>
<p>
IngredientCheck helps usersby scanning labels and checking them against the list of ingredients you input. 
Does a simple comparison to match ingredients that users want to avoid.
<br>:notes:</br>
</p>

<h2>Inspiration</h2>

<p>
Through  to mhy love of cooking and hosting, I have found that  
</p>

<h2>Intro Video</h2>

[![Backend demo](doc/https://i9.ytimg.com/vi/v5BzG2mIAgg/mq2.jpg?sqp=CJio7P8F&rs=AOn4CLComp-FY7H0j8dIfRho6pEFOKnHOg)](https://youtu.be/v5BzG2mIAgg "IngredientCheck!")

<h2>Technologies</h2>

<ul>
 <li>Node: version 15.0.1</li>
 <li>multer: 1.4.2</li>
 <li>cors: 2.8.5</li>
 <li>JavaScript: version 1.1.1</li>
 <li>JSON: version 2.3</li>
 <li>body-parser: 1.19.0</li>
 <li>express: 4.17.1</li>
 <li>nodemon: 2.0.6</li>
</ul>

<h2>Setup</h2>
To run this project, create a folder on your local environment where you can clone "ingredient-backend" from GitHub repositories. Open in your code editor.<br><br>
From your backend folder perform the following commands:<br>
<li>Use the command to start your NPM: <code>npm init</code></li>
<li>In your terminal, install express: <code>npm install express</code></li>
<li>You don't want to send your node-modules to github, in terminal: <code>touch .gitignore</code></li>
<li>require express in your index.js folder</li><br>
<li>Use terminal to install multer: <code>npm i multer</code></li><br>
<li>Use terminal to install cors: <code>npm install cors</code></li><br>
<li>Use terminal to install ejs: <code>npm install ejs</code></li><br>
<li>last but not least install Tesseract: <code>npm install tesseract.js</code></li><br>

<i>*Please note that some features are still a work in progress.</i>

<h2>Instructions</h2>
<ol>
 <li>Check out the backend capabilities!</li>
 <li><code>npm start</code></li>
 <li>Go to your browser and go to localhost:7001</li>
 <li>Manimulate the string to have ingredients you want it to catch</li>
 <li>upload a label and hit convert</li>
</ol>

<h2>Code Example</h2>

<h4>Comparison function:</h4>

```  
function compareStrings(string, photoWords){
  let newString = string.split(' ')
  let updatedphotoWords = photoWords.split(' ')
  let matchingWords = newString.filter(element => updatedphotoWords.includes(element));
  return matchingWords
}
```

<h4>Async Function to run Tesseract worker that changes photo image file to text:</h4>

```
(async () => {
  const worker = createWorker();
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  const { data: {text} } = await worker.recognize(image);
  photoWords = text;
  console.log(photoWords = text)
  return compareStrings(string, photoWords);
})()
  ```

<h2>Status</h2>

We're looking forward to rolling-out the following features:
<li>Connect the Flutter frontend.</li>
<li>Graph of percentage to most commonly bought ingredients</li>
<li>Save list to database</li>

 <h2>Contact</h2>
<a href="https://www.linkedin.com/in/musicmeier/"><img src="https://user-images.githubusercontent.com/68958970/97038321-a07f9600-1538-11eb-90f4-baa2d81a0664.png" alt="Music Meier" style="width:10px;height:10px;"></a>Music Meier :musical_score:<br>
