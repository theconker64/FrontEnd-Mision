const pokeName = document.getElementById("pokeName");
const Name = document.getElementById("name");
const Number = document.getElementById("number");
const Weight = document.getElementById("weight");
const Height = document.getElementById("height");
const VarDescription = document.getElementById("description");
const Category = document.getElementById("category");
const Types = document.getElementById("types");
const urlBase = 'https://pokeapi.co/api/v2' 

//Este metodo se para limpiar si es que no encuentra Pokemon, es reutilizable ademas
//para no estar copiando y pegando lo mismo en cada metodo que se requiera limpiar
const limpiar = () => {
    Number.innerHTML = "";
    Name.innerHTML =  "";
    Weight.innerHTML = "-";
    Height.innerHTML = "-";
    VarDescription.innerHTML="";
    Types.innerHTML="-"
    Category.innerHTML="";
    setAttack(0)
    setDefense(0)
    setHP(0)
}

const fetchPokemon = () => {
    

    let pokeInput = pokeName.value.toLowerCase();
    const url = `${urlBase}/pokemon/${pokeInput}`;
    fetch(url).then((res) => {
        if(res.status != "200"){
            console.log(res);
            pokeImage("images/error.png");
            limpiar();
        }else{
            return res.json();
        }
    }).then((data) => {
        console.log(data);
        let pokeImg = data.sprites.other.home.front_default;
        let pokeStats = [data['stats'][1]['base_stat'], data['stats'][2]['base_stat'], data['stats'][0]['base_stat']]
        Number.innerHTML = rellenar(""+data.id);
        Name.innerHTML =  data.name;
        Weight.innerHTML = (parseInt(data.weight)/10 + " kg");
        Height.innerHTML = parseInt(data.height)/10 + " m";
        pokeImage(pokeImg);
        description(pokeInput);
        pokeTypes(data.types);
        setAttack(pokeStats[0]);
        setDefense(pokeStats[1]);
        setHP(pokeStats[2]);
    })
}


/* FUNCIÓN ENTER */
document.getElementById("pokeName")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.key === "Enter") { //keyCode
        document.getElementById(fetchPokemon()).click();
    }
});


const description = (pokeInput) => {
    
    const url = `${urlBase}/pokemon-species/${pokeInput}`;
    
    fetch(url).then((res) =>{
        return res.json();
    }).then((data) => {
        console.log(data);
        Category.innerHTML = data['genera'][7]['genus'];
        VarDescription.innerHTML = data['flavor_text_entries'][0]['flavor_text'];
    })
}

const pokeImage = (url) =>{
    const pokeImg = document.getElementById("pokeImg");
    pokeImg.src = url;
}

const pokeTypes = (data) =>{
    

    if((Object.keys(data).length) == 1){
        console.log(data);
        Types.innerHTML = data[0]['type']['name'];
    }
    else{
        Types.innerHTML = `${data[0]['type']['name']}/${data[1]['type']['name']}`
    }
}

function rellenar(num){
    while (num.length<3){
        num = '0'+num;
    }
    return num;
}

let barg = [false, false, false];

function setBar(stat){
    let values = [0,0,0];
    let aux = 40;
    for(var i = 0;i<3;i++){
        if((stat/aux)>1){
            values[i] = 100;
        }else{
            values[i] = (stat/aux)*100;
            break;
        }
        stat -= 40;
    }
    return values;
}

function setAttack(attack){
    let values = setBar(attack);
    document.getElementById("attack_1").style.width = `${values[0]}%`;
    document.getElementById("attack_2").style.width = `${values[1]}%`;
    document.getElementById("attack_3").style.width = `${values[2]}%`;
    if(values[2]>=100){
        document.getElementById("attack_1").style.background = '#ff6380';
        document.getElementById("attack_2").style.background = '#ff6380';
        document.getElementById("attack_3").style.background = '#ff6380';
        fourStar[0] = true;
    }else{
        document.getElementById("attack_1").style.background = '#F8FF69';
        document.getElementById("attack_2").style.background = '#F8FF69';
        document.getElementById("attack_3").style.background = '#F8FF69';
        barg[0] = false;
    }
}

function setDefense(defense){
    let values = setBar(defense);
    document.getElementById("defense_1").style.width = `${values[0]}%`;
    document.getElementById("defense_2").style.width = `${values[1]}%`;
    document.getElementById("defense_3").style.width = `${values[2]}%`;
    if(values[2]>=100){
        document.getElementById("defense_1").style.background = '#ff6380';
        document.getElementById("defense_2").style.background = '#ff6380';
        document.getElementById("defense_3").style.background = '#ff6380';
        barg[1] = true;
    }else{
        document.getElementById("defense_1").style.background = '#69D4FF';
        document.getElementById("defense_2").style.background = '#69D4FF';
        document.getElementById("defense_3").style.background = '#69D4FF';
        barg[1] = false;
    }
}

function setHP(HP){
    let values = setBar(HP);
    document.getElementById("hp_1").style.width = `${values[0]}%`;
    document.getElementById("hp_2").style.width = `${values[1]}%`;
    document.getElementById("hp_3").style.width = `${values[2]}%`;
    if(values[2]>=100){
        document.getElementById("hp_1").style.background = '#ff6380';
        document.getElementById("hp_2").style.background = '#ff6380';
        document.getElementById("hp_3").style.background = '#ff6380';
        barg[2] = true;
    }else{
        document.getElementById("hp_1").style.background = '#FF6969';
        document.getElementById("hp_2").style.background = '#FF6969';
        document.getElementById("hp_3").style.background = '#FF6969';
        barg[2] = false;
    }
}