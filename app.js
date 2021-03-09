const app = {};

//gets pokemon information form api
app.getPokemon1 = query => {
    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${query}/`,
        method: "GET",
        dataType: "json"
    }).then(result => {
        app.displayPokemon1(result)
    });
}

//gets pokemon information form api
app.getPokemon2 = query => {
    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${query}/`,
        method: "GET",
        dataType: "json"
    }).then(result => {
        app.displayPokemon2(result)
    });
}

//gets value when button gets click
app.getSelectValue = () => {
    $(".submit").on('click', () => {
      const selection1 = $("#choice2").val();
      const selection2 = $("#choice1").val();
      $(".top-container").css("display","block");
      $(".bottom-container").css("display","block");
      $(".image-container").empty();
      $(".results").empty();
      app.getPokemon1(selection1);
      app.getPokemon2(selection2);
    });
  };

//compares stats while turning the user input into a integer 
app.compareStats = () =>{
    const statOne = parseInt($('#statsFront').text());
    const statTwo = parseInt($('#statsBack').text());
    
    if (statOne > statTwo){
        const winner = `<h2 class="results">WINNER</h2>`;
        $(".bottom-container").append(winner);
        $(".bottom-container").css({"background-color": "#e63946", "color": "white" ,"border": "solid 5px black"});
        const loser =`<h2 class="results">LOSER</h2>`;
        $(".top-container").append(loser);
        $(".top-container").css({"background-color": "black", "color": "white","border": "solid 5px white"});
    }
    else if(statOne < statTwo){
        const winner = `<h2 class="results">WINNER</h2>`;
        $(".top-container").append(winner);
        $(".top-container").css({"background-color": "#e63946", "color": "white" ,"border": "solid 5px black"});
        const loser =`<h2 class="results">LOSER</h2>`;
        $(".bottom-container").append(loser);
        $(".bottom-container").css({"background-color": "black", "color": "white" ,"border": "solid 5px white"});
    }
    else{
        const tie = `<h2 class="results">TIE</h2>`;
        $(".top-container").append(tie);
        $(".bottom-container").append(tie);
        $(".top-container").css({"background-color": "white", "color": "black","border": "solid 5px black"});
        $(".bottom-container").css({"background-color": "white", "color": "black" ,"border": "solid 5px black"});
    }
} 

// gets the information from api and displays the name , stats and picture of pokemon
app.displayPokemon1 = pokemon =>{
    $(".bottom-container").empty(); 
    const front = pokemon.sprites.front_default;
    const htmlToAppend = `<img class="pokemon-image1" src=${front} alt="picture of pokemon"/>`;
    $(".image-container").append(htmlToAppend);

    const frontName = pokemon.name;
    const frontNameAppend =`<h2 class="names">${frontName}</h2>`
    $(".bottom-container").append(frontNameAppend);
    
    const frontStats = pokemon.stats[0].base_stat;
    const frontStatsAppend =`<h2 class="stats" id="statsFront">${frontStats}</h2>`
    $(".bottom-container").append(frontStatsAppend);
    $(".bottom-container").css({"display": "flex", "justify-content" :"space-around","flex-wrap":"wrap","align-content":"center"});

    

}


app.displayPokemon2 = pokemon =>{
    $(".top-container").empty(); 
    const back = pokemon.sprites.back_default;
    const htmlToAppend = `<img class="pokemon-image2" src=${back} alt="picture of pokemon"/>`;
    $(".image-container").append(htmlToAppend);

    const backName = pokemon.name;
    const backNameAppend =`<h2 class="names">${backName}</h2>`
    $(".top-container").append(backNameAppend);
    $(".names").css({"text-transform":"uppercase"});

    const backStats = pokemon.stats[0].base_stat;
    const backStatsAppend =`<h2 class="stats" id="statsBack">${backStats}</h2>`
    $(".top-container").append(backStatsAppend);
    $(".top-container").css({"display": "flex", "justify-content" :"space-around","flex-wrap":"wrap","align-content":"center"});
    
    //calls the comapre stats to see what pokemon has the better sta
    app.compareStats();
}


//initializing function 
app.init = function(){
    app.getSelectValue();
};


//function ready
$(function(){
    $('form').on('submit', function(event) {
        event.preventDefault();
      });
    app.init();
});