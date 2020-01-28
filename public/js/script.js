//This function uses the index.html and changes what foods there are based on ingredients
function getRecipes() {
    //get input values and spaces
    let foodName = document.getElementById('food').value
    let foodDiv = document.getElementById('foodIngredient')
    foodDiv.innerHTML = ''
    //gather the query values if any


    var urlParams = new URLSearchParams(location.search);
    var query = location.search;
    //if there are values assign it to foodname
    if(foodName == "" && urlParams.get('ingredient')){
      foodName = urlParams.get('ingredient')
      document.getElementById('food').value = foodName
    }

    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let response = JSON.parse(xhr.responseText)
            //if no recipes then send a alert to tell user to put in a recipe
            if(!response.recipes || response.count === 0){
              alert('There is no recipies for that, Please enter a food')
            }
            //if there are recipes then show the foods
            else {
              let currentRecipe = 0
              //This nested for loop is to show 1o rows of 3 coloumbs of recipes, max 30 recipes
              for(let i = 0; i < 10; i++){
                foodDiv.innerHTML += `<br>`
                for (let y = 0; y < 3; y++){
                  foodDiv.innerHTML += `
                  <div class = "recipe">
                  <a href="${response.recipes[currentRecipe].f2f_url}" target="_blank">
                  <img  src="${response.recipes[currentRecipe].image_url}" name="image${currentRecipe}"/>
                  <p><strong> ${response.recipes[currentRecipe].title} </strong></p>
                  </a>
                  </div>
                  `
                  currentRecipe++
                }
                foodDiv.innerHTML += `<br>`
              }
              //reset
              currentRecipe = 0
            }

          }
        }
    //if there were no recipes show general foods
    if(foodName === '') {
        xhr.open('GET', `/getrecipes?ingredient=`, true)
    }
    //if there are get the recipes
    else {
        xhr.open('GET', `/getrecipes?ingredient=${foodName}`, true)
    }
    xhr.send()
}
//invoke the function for it to show the general foods or specialized foods
getRecipes()

//Attach Enter-key Handler
const ENTER=13
document.getElementById("food")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === ENTER) {
        document.getElementById("submit").click();
    }
});
