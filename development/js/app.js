//Checking if user is visiting website for the first time
const formName = document.getElementById('name-form');
const firstTime = document.getElementById('firstTime');
const nameDisplay = document.getElementById('nameDisplay');
const dashboardContainer = document.querySelector("#dashboard-container");


function checkUser() {
    if (localStorage.getItem('savedName') != null) {
        nameDisplay.innerText = localStorage.getItem('savedName');
    } else {
        firstTime.classList.remove('hidden');
        dashboardContainer.classList.add('hidden');
    }
}

checkUser();

function submitName(event) {
    event.preventDefault();
    const name = formName.children[0].value;
    localStorage.setItem('savedName', name);
    nameDisplay.innerText = localStorage.getItem('savedName');
    //Ukryj komponent firstTime
    firstTime.classList.add('hidden');
    dashboardContainer.classList.remove('hidden');
}

formName.addEventListener('submit', submitName)

//add recipe -ma

const nameInput = document.querySelector(".recipe-name-input");
const descriptionInput = document.querySelector(".recipe-description-input");

const instructionInput = document.querySelector(".instruction-form-input");
const addInstructionButton = document.querySelector('.add-instruction-btn');


const ingredientsInput = document.querySelector(".ingredients-form-input");
const addIngredientsButton = document.querySelector(".add-ingredients-btn");

const addRecipeButton = document.querySelector(".add-recipe-btn");
const addPlanButton = document.querySelector(".new-plan-btn");
const nameForm = document.querySelector(".new-recipe-form");

const editIcon = document.querySelector("#edit-icon");

const toAddRecipe = document.querySelector(".add-recipe");
const toAddPlan = document.querySelector(".add-plan");
const addRecipeContainer = document.querySelector("#new-recipe-container");
const addSheduleContainer = document.querySelector('#add-schedule-container');

toAddRecipe.addEventListener("click",function (event){
    dashboardContainer.style.display = "none";
    addRecipeContainer.style.display = "block";
});
toAddPlan.addEventListener('click',function (event){
    dashboardContainer.style.display = "none";
    addSheduleContainer.style.display = "block";
})

const instructionList = document.querySelector(".recipe-instruction-list");
const ingredientsList = document.querySelector(".recipe-ingredients-list");



function addInstruction (event){
    if(instructionInput.value.length > 3) {
        const instruction = document.createElement("li");
        instructionList.appendChild(instruction);
        instruction.innerText = instructionInput.value;
        instruction.innerHTML += `<i  id="edit-icon" class="fas fa-edit"></i><i  id="trash-icon" class="far fa-trash-alt"></i>`;
        instructionInput.value = "";
        const deleteInstruction = document.querySelector('.new-recipe-lists').querySelectorAll('#trash-icon');
        deleteInstruction.forEach(function (element){
            element.addEventListener('click',function (){
                this.parentElement.parentElement.removeChild(this.parentElement);
            })
        })
        const editInstruction= document.querySelector('.new-recipe-lists').querySelectorAll('#edit-icon');
        editInstruction.forEach(function (element) {
            element.addEventListener('click', function () {
                this.parentElement.contentEditable = "true";
                this.parentElement.style.color = "red";

            })
        })
    } else {
        instructionInput.value = "Wpisz coś więcej";
        instructionInput.style.color = "red";
        instructionInput.addEventListener('click',function (event){
            instructionInput.value ="";
            instructionInput.style.color = "inherit";
        })
    }
}

addInstructionButton.addEventListener('click', addInstruction);


function addIngredients (event){
    const ingredients = document.createElement("li");
    ingredientsList.appendChild(ingredients);
    ingredients.innerText = ingredientsInput.value;
    ingredients.innerHTML += `<i  id="edit-icon" class="fas fa-edit"></i><i  id="trash-icon" class="far fa-trash-alt"></i>`;
    const deleteIngredients = document.querySelector('.new-recipe-lists').querySelectorAll('#trash-icon');
    ingredientsInput.value = "";
    deleteIngredients.forEach(function (element){
        element.addEventListener('click',function (){
            this.parentElement.parentElement.removeChild(this.parentElement);
        })
    })
    const editIngredients = document.querySelector('.new-recipe-lists').querySelectorAll('#edit-icon');
    editIngredients.forEach(function (element) {
        element.addEventListener('click', function () {
            this.parentElement.contentEditable = "true";
            this.parentElement.style.color = "red";

        })
    })
}

function editIngredients (event){
    const editInstruction = document.querySelector('.new-recipe-lists').querySelectorAll('#edit-icon');

}

addIngredientsButton.addEventListener('click', addIngredients);


//edit recipe window


if (window.location.href.includes("editrecipeid") === true) {
    const currentLink = window.location.href;
    let id = currentLink.substring(window.location.href.indexOf("=") +1) -1;
    dashboardContainer.style.display = "none";
    addRecipeContainer.style.display = "block";
    const editRecipeParagraph = document.querySelector('.new-recipe-header').querySelector('p');
    editRecipeParagraph.innerText = "EDYCJA PRZEPISU";
    const editRecipeButton = document.querySelector(".add-recipe-btn");




    const recipesToEdit = JSON.parse(localStorage.getItem("recipes"));
    
    nameInput.value = recipesToEdit[id].name;
    descriptionInput.value = recipesToEdit[id].description;
    recipesToEdit[id].instruction.forEach(function (element){
        const instructionList = document.querySelector(".recipe-instruction-list");
        const instruction = document.createElement("li");
        instructionList.appendChild(instruction);
        instruction.innerText = element + "  ";
        instruction.innerHTML += `<i  id="edit-icon" class="fas fa-edit"></i><i  id="trash-icon" class="far fa-trash-alt"></i>`;
    })
    recipesToEdit[id].ingredients.forEach(function (element){
        const ingredientsList = document.querySelector(".recipe-ingredients-list");
        const ingredients = document.createElement("li");
        ingredientsList.appendChild(ingredients);
        ingredients.innerText = element + "  ";
        ingredients.innerHTML += `<i  id="edit-icon" class="fas fa-edit"></i><i  id="trash-icon" class="far fa-trash-alt"></i>`;
    })
    if (instructionList != null){
        const deleteInstruction = document.querySelector('.new-recipe-lists').querySelectorAll('#trash-icon');
        deleteInstruction.forEach(function (element){
            element.addEventListener('click',function (){
                this.parentElement.parentElement.removeChild(this.parentElement);

            })
        })
        const editInstruction= document.querySelector('.new-recipe-lists').querySelectorAll('#edit-icon');
        editInstruction.forEach(function (element) {
            element.addEventListener('click', function () {
                this.parentElement.contentEditable = "true";
                this.parentElement.style.color = "red";
            })
        })
    }
    if (ingredientsList != null){
        const deleteIngredients = document.querySelector('.new-recipe-lists').querySelectorAll('#trash-icon');
        deleteIngredients.forEach(function (element){
            element.addEventListener('click',function (){
                this.parentElement.parentElement.removeChild(this.parentElement);

            })
        })
        const editIngredients = document.querySelector('.new-recipe-lists').querySelectorAll('#edit-icon');
        editIngredients.forEach(function (element) {
            element.addEventListener('click', function () {
                this.parentElement.contentEditable = "true";
                this.parentElement.style.color = "red";

            })
        })
    }

    editRecipeButton.addEventListener("click", function (e) {
        addRecipeButton.removeEventListener('click', addRecipes);
        
        // newRecipe.id = recipesToEdit[id];
        recipesToEdit[id].name = nameInput.value;
        recipesToEdit[id].description = descriptionInput.value;
        const instructions = document.querySelector(".recipe-instruction-list").querySelectorAll('li');
        recipesToEdit[id].instruction = [];
        instructions.forEach(function (element) {
            recipesToEdit[id].instruction.push(element.innerText);
        })
        const ingredients = document.querySelector(".recipe-ingredients-list").querySelectorAll('li');
        recipesToEdit[id].ingredients = [];
        ingredients.forEach(function (element) {
            recipesToEdit[id].ingredients.push(element.innerText);
        })
        function saveEditedRecipe(){
            localStorage.setItem("recipes", JSON.stringify(recipesToEdit));
        }
        saveEditedRecipe();
        
        if(window.location.href.includes("editrecipe") === true) {
            window.location.href = window.location.href.substring(0, window.location.href.indexOf('?'))
        }
        setTimeout(() => {
            window.location.reload();
        }, 100);
    })
}

//edit plan window


// local storage ma

const newRecipe = {
    id: "",
    name: "",
    description: "",
    instruction: [],
    ingredients: []
};

function saveRecipeToLocalStorage(newObject){
    let dataFromLocalStorage =[];
    if (nameInput.value.length >= 1) {
        if (localStorage.getItem("recipes") != null){
            dataFromLocalStorage = JSON.parse(localStorage.getItem("recipes"));
            dataFromLocalStorage.push(newObject);
            localStorage.setItem("recipes", JSON.stringify(dataFromLocalStorage));
        } else {
            dataFromLocalStorage.push(newObject);
            localStorage.setItem("recipes", JSON.stringify(dataFromLocalStorage));
        }
    }else{
        alert("PODAJ NAZWĘ PRZEPISU");
        nameInput.style.border = "1px solid red";
        window.location.app.html;
    }
}

let idNumber = JSON.parse(localStorage.getItem("recipes"));

addRecipeButton.addEventListener("click", addRecipes);

function addRecipes (){
    let number = 0;
    function id() {
        if (idNumber != null) {
            number = idNumber.length + 1;
        } else {
            number = 1;
        }
        return number
    }

    id();
    newRecipe.id = number;
    newRecipe.name = nameInput.value;
    newRecipe.description = descriptionInput.value;
    const instructions = document.querySelector(".recipe-instruction-list").querySelectorAll('li');
    instructions.forEach(function (element) {
        newRecipe.instruction.push(element.innerText);
    })
    const ingredients = document.querySelector(".recipe-ingredients-list").querySelectorAll('li');
    ingredients.forEach(function (element) {
        newRecipe.ingredients.push(element.innerText);
    })
    saveRecipeToLocalStorage(newRecipe);
    
    nameForm.reset();
    window.location.reload();
}


const nameOfPlanInput = document.querySelector('.nameOfPlanInput');
const descriptionOfPlanInput = document.querySelector('.descriptionPlanInput');
const numberOfWeekInput = document.querySelector('.numberOfWeekInput');

//editable plan window
const editPlanButton = document.querySelector(".new-plan-btn");
const planNameInput = document.querySelector(".nameOfPlanInput");
const planDescriptionInput = document.querySelector (".descriptionPlanInput");
const planWeekInput = document.querySelector(".numberOfWeekInput");

const newPlanExample = {
    id: "",
    name: "",
    description: "",
    week: "",
    weekPlan: {monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [], sunday: []}
};
if (window.location.href.includes("editplan") === true) {
    const currentLink = window.location.href;
    let id = currentLink.substring(window.location.href.indexOf("=") +1) -1;
    dashboardContainer.style.display = "none";
    addSheduleContainer.style.display = "block";
    const editPlanParagraph = document.querySelector('.title-and-button').querySelector('h3');
    editPlanParagraph.innerText = "EDYCJA PLANÓW";
    const editPlanButton = document.querySelector(".new-plan-btn");
    const plansToEdit = JSON.parse(localStorage.getItem("plans"));
    planNameInput.value = plansToEdit[id].name;
    planDescriptionInput.value = plansToEdit[id].description;
    planWeekInput.value = plansToEdit[id].week;
    editPlanButton.addEventListener("click", function (e) {
        addPlanButton.removeEventListener('click', addPlan);
        plansToEdit[id].name = planNameInput.value;
        plansToEdit[id].description = planDescriptionInput.value;
        plansToEdit[id].week = planWeekInput.value;
        function saveEditedPlan(){
            localStorage.setItem("plans", JSON.stringify(plansToEdit));
        }
        saveEditedPlan();
        
        if(window.location.href.includes("editplan") === true) {
            window.location.href = window.location.href.substring(0, window.location.href.indexOf('?'))
        }
        setTimeout(() => {
            window.location.reload();
        }, 100);
    })
}

function addPlan (){
    const newPlan = {
        id: "",
        name: "",
        description: "",
        week: "",
        weekPlan: {monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [], sunday: []}
    };
    if (nameOfPlanInput.value.length >= 1) {
        if (localStorage.getItem('planIndex') != null) {
            newPlan.id = parseInt(localStorage.getItem('planIndex')) + 1;
            localStorage.setItem('planIndex', newPlan.id);
        } else {
            newPlan.id = 1;
            localStorage.setItem('planIndex', newPlan.id);
        }

        newPlan.name = nameOfPlanInput.value;
        newPlan.description = descriptionOfPlanInput.value;
        newPlan.week = numberOfWeekInput.value;

        const monday = document.getElementById('monday');
        const tuesday = document.getElementById('tuesday');
        const wednesday = document.getElementById('wednesday');
        const thursday = document.getElementById('thursday');
        const friday = document.getElementById('friday');
        const saturday = document.getElementById('saturday');
        const sunday = document.getElementById('sunday');

        for (i=0; i<monday.children.length; i++) {
            if (i>0) {
                newPlan.weekPlan.monday.push(monday.children[i].children[0].value);
            }
        }

        for (i=0; i<tuesday.children.length; i++) {
            if (i>0) {
                newPlan.weekPlan.tuesday.push(tuesday.children[i].children[0].value);
            }
        }

        for (i=0; i<wednesday.children.length; i++) {
            if (i>0) {
                newPlan.weekPlan.wednesday.push(wednesday.children[i].children[0].value);
            }
        }

        for (i=0; i<thursday.children.length; i++) {
            if (i>0) {
                newPlan.weekPlan.thursday.push(thursday.children[i].children[0].value);
            }
        }

        for (i=0; i<friday.children.length; i++) {
            if (i>0) {
                newPlan.weekPlan.friday.push(friday.children[i].children[0].value);
            }
        }

        for (i=0; i<saturday.children.length; i++) {
            if (i>0) {
                newPlan.weekPlan.saturday.push(saturday.children[i].children[0].value);
            }
        }

        for (i=0; i<sunday.children.length; i++) {
            if (i>0) {
                newPlan.weekPlan.sunday.push(sunday.children[i].children[0].value);
            }
        }

        if(localStorage.getItem('plans') != null) {
            const plans = JSON.parse(localStorage.getItem('plans'));
            plans.push(newPlan);
            localStorage.setItem('plans', JSON.stringify(plans));
        } else {
            const plans = [];
            plans.push(newPlan);
            localStorage.setItem('plans', JSON.stringify(plans));
        }

        if(window.location.href.includes("editplan") === true) {
            window.location.href = window.location.href.substring(0, window.location.href.indexOf('?'))
        }
        setTimeout(() => {
            window.location.reload();
        }, 100);
    }else {
        alert("PODAJ NAZWĘ PLANU");
        nameOfPlanInput.style.border = "1px solid red";
        window.location.app.html;
    }
}
addPlanButton.addEventListener('click',addPlan);

// Wybieranie posiłków na obecny tydzień


//Znajduje wszystkie selecty
const select = document.querySelectorAll("select");

const recipesTest = JSON.parse(localStorage.getItem('recipes'));

let array = recipesTest.map(recipe => recipe.name);

select.forEach(sel => {
    for(let i=0; i<array.length; i++){
        const option = document.createElement("option");
        option.innerHTML=array[i];
        sel.appendChild(option);
    }
})

//ustawianie liczby przepisów w 1 Widgecie
const recipesTest1 = JSON.parse(localStorage.getItem('recipes'));

const firstWidgetRecipeId = document.querySelector('.notification_widget_first_span').querySelector('span');

let arrayOfRecipesID = recipesTest1.map(recipe => recipe.id);

select.forEach(elem => {
    for(let i=0; i<array.length; i++){
       firstWidgetRecipeId.innerHTML=arrayOfRecipesID [i];
    }
});

const weekTitle = document.querySelector('.wpt-title');
const breakfast = document.querySelector('.breakfast');

const mondayMeals = document.querySelectorAll('.monday');
const tuesdayMeals = document.querySelectorAll('.tuesday');
const wednesdayMeals = document.querySelectorAll('.wednesday');
const thursdayMeals = document.querySelectorAll('.thursday');
const fridayMeals = document.querySelectorAll('.friday');
const saturdayMeals = document.querySelectorAll('.saturday');
const sundayMeals = document.querySelectorAll('.sunday');

let planCounter = 0;

function loadCurrentPlan(id) {
    if(localStorage.getItem('plans') != null) {
        const currentPlan = JSON.parse(localStorage.getItem('plans'))[id];
        weekTitle.firstElementChild.innerText = `Twój plan na ${currentPlan.week} tydzień:`;

        for(i=0; i<mondayMeals.length; i++) {
            mondayMeals[i].innerText = currentPlan.weekPlan.monday[i];
        }

        for(i=0; i<tuesdayMeals.length; i++) {
            tuesdayMeals[i].innerText = currentPlan.weekPlan.tuesday[i];
        }

        for(i=0; i<wednesdayMeals.length; i++) {
            wednesdayMeals[i].innerText = currentPlan.weekPlan.wednesday[i];
        }

        for(i=0; i<thursdayMeals.length; i++) {
            thursdayMeals[i].innerText = currentPlan.weekPlan.thursday[i];
        }

        for(i=0; i<fridayMeals.length; i++) {
            fridayMeals[i].innerText = currentPlan.weekPlan.friday[i];
        }

        for(i=0; i<saturdayMeals.length; i++) {
            saturdayMeals[i].innerText = currentPlan.weekPlan.saturday[i];
        }

        for(i=0; i<sundayMeals.length; i++) {
            sundayMeals[i].innerText = currentPlan.weekPlan.sunday[i];
        }
        
    }
}

loadCurrentPlan(planCounter);

const leftButton = document.querySelector('.left-button');
const rightButton = document.querySelector('.right-button');

leftButton.addEventListener('click', function(event) {   
    if(planCounter <= 0) {
        loadCurrentPlan(0);
    } else {
        planCounter--;
        loadCurrentPlan(planCounter);
    }
})

rightButton.addEventListener('click', function(event) {
    const planLength = JSON.parse(localStorage.getItem('plans')).length

    if(planCounter >= planLength-1) {
        loadCurrentPlan(planCounter);
    } else {
        planCounter++;
        loadCurrentPlan(planCounter);
    }
})