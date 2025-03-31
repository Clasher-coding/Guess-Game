const categories = {
    animals: {
        title: "Guess the Animal",
        images: [
            "https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_640.jpg", 
            "https://cdn.pixabay.com/photo/2020/10/06/04/11/rough-collie-5631188_640.jpg",
            "https://cdn.pixabay.com/photo/2023/02/26/02/55/elephant-7814673_640.jpg",
            "https://cdn.pixabay.com/photo/2017/10/05/18/35/lion-2820443_640.jpg",
            "https://cdn.pixabay.com/photo/2022/07/10/14/11/masai-giraffe-7312959_640.jpg"
        ],
        answers: ["Cat", "Dog", "Elephant", "Lion", "Giraffe"]
    },
    vegetables: {
        title: "Guess the Vegetable",
        images: [
            "https://cdn.pixabay.com/photo/2015/03/08/20/58/carrot-664741_640.jpg",
            "https://cdn.pixabay.com/photo/2016/07/08/00/43/brocolis-1503525_640.jpg",
            "https://cdn.pixabay.com/photo/2019/07/11/12/13/potatoes-4330587_640.jpg",
            "https://cdn.pixabay.com/photo/2014/06/18/23/14/tomato-371906_640.jpg",
            "https://cdn.pixabay.com/photo/2018/10/03/21/57/cabbage-3722498_640.jpg"
        ],
        answers: ["Carrot", "Broccoli", "Potato", "Tomato", "Cabbage"]
    },
    fruits: {
        title: "Guess the Fruit",
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg",
            "https://cdn.pixabay.com/photo/2016/08/04/17/58/banana-1569654_640.jpg",
            "https://cdn.pixabay.com/photo/2017/06/03/18/06/cherry-2369275_640.jpg",
            "https://cdn.pixabay.com/photo/2017/01/20/15/06/oranges-1995056_640.jpg",
            "https://cdn.pixabay.com/photo/2017/05/02/18/20/blueberries-2278921_640.jpg"
        ],
        answers: ["Apple", "Banana", "Cherry", "Orange", "Grapes"]
    }
};


let categorySelector = document.getElementById("category-selector");
let title = document.getElementById("game-title");
let image = document.getElementById("game-image");
let dropZone = document.getElementById("drop-zone");
let optionsContainer = document.getElementById("options");
let nextBtn = document.getElementById("next-btn");

let currentIndex = 0;
let blurInterval;
let gameData;


function loadGame(category) {
    gameData = categories[category];
    title.textContent = gameData.title;
    currentIndex = Math.floor(Math.random() * gameData.images.length); 
    loadNext();
}


function startBlurReduction() {
  
    clearInterval(blurInterval);
}


function loadNext() {
    if (currentIndex < gameData.images.length) {
        image.src = gameData.images[currentIndex];
        dropZone.textContent = "Drop Here";
        dropZone.style.backgroundColor = "white";
        nextBtn.disabled = true;
        updateOptions();
    } else {
        alert("Congratulations! You've completed the game!");
    }
}


function updateOptions() {
    optionsContainer.innerHTML = "";
    let options = [...gameData.answers].sort(() => Math.random() - 0.5);

    options.forEach(optionText => {
        let option = document.createElement("div");
        option.classList.add("option");
        option.draggable = true;
        option.textContent = optionText;
        option.addEventListener("dragstart", function(event) {
            event.dataTransfer.setData("text", event.target.textContent);
        });
        optionsContainer.appendChild(option);
    });
}


dropZone.addEventListener("dragover", function(event) {
    event.preventDefault();
});
dropZone.addEventListener("drop", function(event) {
    event.preventDefault();
    let droppedText = event.dataTransfer.getData("text");

    if (droppedText === gameData.answers[currentIndex]) {
        clearInterval(blurInterval);
        image.style.filter = "blur(0px)";
        dropZone.textContent = `Correct! It's a ${droppedText}!`;
        dropZone.style.backgroundColor = "#2ecc71";
        nextBtn.disabled = false;
    } else {
        dropZone.textContent = `Incorrect! Try Again!`;
        dropZone.style.backgroundColor = "#e74c3c";
    }
});


categorySelector.addEventListener("change", function() {
    loadGame(this.value);
});


nextBtn.addEventListener("click", function() {
    currentIndex++;
    loadNext();
});

loadGame("animals");
