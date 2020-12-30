document.addEventListener('DOMContentLoaded', function(){
    function checkUser() {
        if (localStorage.getItem('savedName') != null) {
            nameDisplay.innerText = localStorage.getItem('savedName');
        }
    }

    checkUser();

    const plans = [
        {id:1, name: 'Plan jarski na bezmięsny tydzień', description: 'Pojęcie kuchnia wegetariańska określa pożywienie, które ani nie zawiera mięsa, ani nie zostało przygotowane na bazie pochodzącej z mięsa (np. na rosole drobiowym). Laktoowowegetarianie (najczęściej spotykany typ wegetarian w zachodnim świecie) spożywają nabiał, laktowegetarianie wykluczają jaja, ale nie inne produkty nabiałowe.', week: 1},
        {id:2, name: 'Plan jarski na bezmięsny tydzień', description: 'Pojęcie kuchnia wegetariańska określa pożywienie, które ani nie zawiera mięsa, ani nie zostało przygotowane na bazie pochodzącej z mięsa (np. na rosole drobiowym). Laktoowowegetarianie (najczęściej spotykany typ wegetarian w zachodnim świecie) spożywają nabiał, laktowegetarianie wykluczają jaja, ale nie inne produkty nabiałowe.', week: 2},
        {id:3, name: 'Plan jarski na bezmięsny tydzień', description: 'Pojęcie kuchnia wegetariańska określa pożywienie, które ani nie zawiera mięsa, ani nie zostało przygotowane na bazie pochodzącej z mięsa (np. na rosole drobiowym). Laktoowowegetarianie (najczęściej spotykany typ wegetarian w zachodnim świecie) spożywają nabiał, laktowegetarianie wykluczają jaja, ale nie inne produkty nabiałowe.', week: 3}
    ]

    const tbody = document.getElementById('tbody');

    function updatePlans(plans) {
        tbody.innerHTML = ""; //resets tbody

        //Iterates plans to create new HTML elements:

        plans.forEach(plan => {
            const newTr = document.createElement('tr');
            const newTd = document.createElement('td');
    
            newTr.appendChild(newTd.cloneNode());
            newTr.children[0].innerText = plan.id;
    
            newTr.appendChild(newTd.cloneNode());
            newTr.children[1].innerText = plan.name;
            
            newTr.appendChild(newTd.cloneNode());
            newTr.children[2].innerText = plan.description;

            newTr.appendChild(newTd.cloneNode());
            newTr.children[3].innerText = plan.week;
    
            newTr.appendChild(newTd.cloneNode());
            const link = `./app.html?editplanid=${plan.id}`;
            newTr.children[4].innerHTML = `<a href=${link}><i class="far fa-edit"></i></a><i class="fas fa-trash-alt"></i>`;


            tbody.appendChild(newTr);
        })
    }

    // updatePlans(plans);
    updatePlans(JSON.parse(localStorage.getItem('plans')));

    function trashCanEvents() {
        const trashCans = document.querySelectorAll('.fa-trash-alt');
        trashCans.forEach(trashCan => {
            trashCan.addEventListener('click', function(event) {
                const indexToDelete = event.target.parentNode.parentNode.children[0].innerText;

                const plans = JSON.parse(localStorage.getItem('plans'));

                event.target.parentNode.parentNode.remove();

                for(i=0; i<plans.length; i++) {
                    if(parseInt(indexToDelete) === plans[i].id) {
                        plans.splice(i, 1);
                    }
                }

                localStorage.setItem('plans', JSON.stringify(plans));
            })
        })
    }

    trashCanEvents();
})


