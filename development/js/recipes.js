document.addEventListener('DOMContentLoaded', function(){
    function checkUser() {
        if (localStorage.getItem('savedName') != null) {
            nameDisplay.innerText = localStorage.getItem('savedName');
        }
    }

    checkUser();
    
    const tbody = document.getElementById('tbody');   
    
    function updateRecipes(recipes) {
        tbody.innerHTML = ""; //resets tbody

        //Iterates recipes to create new HTML elements:

        recipes.forEach(recipe => {
            const newTr = document.createElement('tr');
            const newTd = document.createElement('td');
    
            newTr.appendChild(newTd.cloneNode());
            newTr.children[0].innerText = recipe.id;
    
            newTr.appendChild(newTd.cloneNode());
            newTr.children[1].innerText = recipe.name;
            
            newTr.appendChild(newTd.cloneNode());
            newTr.children[2].innerText = recipe.description;

            newTr.appendChild(newTd.cloneNode());
            const link = `./app.html?editrecipeid=${recipe.id}`;
            newTr.children[3].innerHTML = `<a href=${link}><i class="far fa-edit"></i></a><i class="fas fa-trash-alt"></i>`;
        
            tbody.appendChild(newTr);
        })
    }

    updateRecipes(JSON.parse(localStorage.getItem('recipes')));

    //Adding delete events:

    function trashCanEvents() {
        const trashCans = document.querySelectorAll('.fa-trash-alt');
        trashCans.forEach(trashCan => {
            trashCan.addEventListener('click', function(event) {
                const indexToDelete = event.target.parentNode.parentNode.children[0].innerText;

                const recipes = JSON.parse(localStorage.getItem('recipes'));

                event.target.parentNode.parentNode.remove();

                for(i=0; i<recipes.length; i++) {
                    if(parseInt(indexToDelete) === recipes[i].id) {
                        recipes.splice(i, 1);
                    }
                }

                localStorage.setItem('recipes', JSON.stringify(recipes));
            })
        })
    }

    trashCanEvents();

})