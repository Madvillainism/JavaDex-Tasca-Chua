//refer div
let inputTextArea = document.getElementById("input-textarea");
let characCount = document.getElementById("charac-count");
let wordCount = document.getElementById("word-count");
let lineCount = document.getElementById("line-count");


 inputTextArea.addEventListener("input", () => {
//value-length command specifies the maximum value length in bytes
//textContent sets or returns the text content of the specified node
   characCount.textContent = inputTextArea.value.length;
//trim() method removes whitespace from both ends of a string
   let txt = inputTextArea.value.trim();
//txt.split(/\s+/) code will split the full classname of an element into an array containing every class
   wordCount.textContent = txt.split(/\s+/).filter((item) => item).length;

   lineCount.textContent = txt.split(/\n+/).length;
 });