const controls = document.getElementById("teacherControls");
const area = document.getElementById("initialArea");
const teacherBtn = document.getElementById("teacherBtn");
const instructions = document.getElementById("instructions");
const paragraph = document.getElementById("myParaId");
const inputs = document.getElementById("inputsId");
const optionsBtn = document.getElementById("optionsBtn");
const goToExercise = document.getElementById("goToExerciseId");
const goToExerciseBtn = document.getElementById("goToExerciseBtn");
let clickedSpan = false;

// add span for each word and br for new lines...
const transformText = (str) => {
  let myHtmlContent = "";
  let myStr = str;
  let initialLength = myStr.length;
  let counter = 0;
  let slicer = 0;

  while (counter < initialLength) {
    if (myStr[slicer] === " ") {
      let newStr = myStr.slice(0, slicer);
      myStr = myStr.slice(slicer + 1);
      myHtmlContent = myHtmlContent.concat(`<span>${newStr}</span>&nbsp`);
      slicer = -1;
    } else if (myStr[slicer] === "\t") {
      let newStr = myStr.slice(0, slicer);
      myStr = myStr.slice(slicer + 1);
      myHtmlContent = myHtmlContent.concat(`<span>${newStr}</span>&nbsp&nbsp&nbsp&nbsp`);
      slicer = -1;
    } else if (myStr[slicer] === "\n") {
      let newStr = myStr.slice(0, slicer);
      myStr = myStr.slice(slicer + 1);
      myHtmlContent = myHtmlContent.concat(`<span>${newStr}</span><br>`);
      slicer = -1;
    }
    if (counter === initialLength - 1) {
      let newStr = myStr.slice(0, slicer + 1);
      myHtmlContent = myHtmlContent.concat(`<span>${newStr}</span>`);
    }
    slicer++;
    counter++;
  }
  paragraph.innerHTML = myHtmlContent;
};

// teacher controls button...
teacherBtn.addEventListener("click", () => {
  const myText = area.value;
  transformText(myText);
  controls.remove();
  instructions.innerText = "Click on a word if you want to add options";
});

let elementHeight;

// when clicking a word...
const changeSpan = (e) => {
  // hide alternative options section...
  if (e.target.getAttribute("id") === "temporaryId" && clickedSpan) {
    e.target.removeAttribute("id");
    inputs.classList.remove("show");
    clickedSpan = false;
    return;
  }
  // show alternative options section...
  if (e.target.nodeName === "SPAN" && !clickedSpan) {
    clickedSpan = true;
    e.target.setAttribute("id", "temporaryId");
    const correctInput = document.getElementById("correctInput");
    inputs.classList.add("show");
    correctInput.value = e.target.innerText;

    // setting height of clicked element to go back later...
    elementHeight = e.target.offsetTop;

    // go to bottom of the page, where the alternative options section is...
    const scrollable = document.documentElement.scrollHeight;
    window.scrollTo({
      top: scrollable,
      left: 0,
      behavior: "smooth",
    });
  }
};
paragraph.addEventListener("click", changeSpan);

// populate options when clicking options button...
optionsBtn.addEventListener("click", () => {
  let answerIndex = Math.floor(Math.random() * 4);
  const htmlCollection = document.getElementsByClassName("altOptions");
  const optionValues = [];
  const temporaryId = document.getElementById("temporaryId");
  clickedSpan = false;

  for (const item of htmlCollection) {
    if (item.value === "") {
      alert("you need to enter 3 alternate answers");
      return;
    }
    optionValues.push(item.value);
  }

  optionValues.splice(answerIndex, 0, correctInput.value);

  temporaryId.outerHTML = `<select data-a-index="${answerIndex + 1}">
    <option></option>
    <option>${optionValues[0]}</option>
    <option>${optionValues[1]}</option>
    <option>${optionValues[2]}</option>
    <option>${optionValues[3]}</option>
    </select>`;

  inputs.classList.remove("show");

  // remove previous values from input fields...
  for (const item of htmlCollection) {
    item.value = "";
  }

  // add further instructions for teacher...
  goToExercise.classList.add("show");

  // go back to window height of clicked element...
  window.scrollTo({
    top: elementHeight,
    left: 0,
    behavior: "smooth",
  });
});

// button adds event listener to each select tag...
goToExerciseBtn.addEventListener("click", () => {
  goToExercise.classList.remove("show");
  paragraph.classList.remove("pointerClass");
  paragraph.removeEventListener("click", changeSpan);
  instructions.innerText = "Choose the correct option";

  const selectTags = document.getElementsByTagName("select");
  for (const tag of selectTags) {
    tag.addEventListener("change", () => {
      let tempAnswer = tag.getAttribute("data-a-index");
      let selectedOption = tag.options.selectedIndex;
      if (tempAnswer == selectedOption) {
        tag.classList.add("correct");
      }
    });
  }
});
