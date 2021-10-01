const words = [
    'unicorn',
    'magic',
    'light',
    'pink',
    'candy',
    'rainbow',
    'hapiness',
    'white',
];

let randomWord = words[Math.floor(Math.random() * words.length)];
const splitWord = randomWord.split('');

const emptyLetters = new Array(splitWord.length); //tableau qui fait la taille de notre mot
console.log(emptyLetters);
let turn = 6//nombre de tours a jouer
const lettersAlreadyUsed = [];

 ////////////////////
//let's gooooo!!

function guestWordRender(emptyLetters){
   let display = [];
for(let i = 0; i<emptyLetters.length; i++){
    if(emptyLetters[i]){
        display.push(emptyLetters[i]);
    } else{
        display.push('_');
    } 
}
console.log(display);
document.getElementById('emptyLetters').innerHTML= display.join(' ');
};

//pour afficher les lettres déjà utilisés et le nombre de tours
function render(){
    document.getElementById('turn').innerHTML = turn;//nombre de tours restant
    document.getElementById('lettersAlreadyUsed').innerHTML = lettersAlreadyUsed.join(',');//affiche les lettres utilisées
    //document.getElementById('emptyLetters').innerHTML = emptyLetters.join(',');// affiche le mot caché et les lettres manquantes   

    guestWordRender(emptyLetters);//ne pas oublier d'appeler la fct pour appeler GWR
    document.getElementById("selected").value = "";//nettoie le input à chaque submit
};

// vérifier si le mot est bon et le met dans un tableau
function getAllIndex(myWord, mySelectedLetter){
    const indexes = [];
    let goodLetter = 0;//let pour afficher le pendu
    for(let i = 0; i< myWord.length; i++){
        const element = myWord[i];
        if(element === mySelectedLetter){
            indexes.push(i);
            goodLetter ++;
        }
    }
    if (goodLetter === 0){
            turn --;
            document.getElementById('hyde' + turn).style.display='flex';//affiche le décompte du pendu
    }
    return indexes;
}

 document.getElementById("run").addEventListener('click', function playGame() {

        let letter= document.getElementById("selected").value;

        letter = letter.trim();//supprimer les espaces dans le input, devant et derrière
        const mySelectedLetter = letter[0]; //selectionne la première lettre
        //on peux ajouter à = letter[0].toUpperCase() : met les lettres en maj.
        lettersAlreadyUsed.push(mySelectedLetter);//ajoute la lettre déjà utilisé
        const temp = getAllIndex(splitWord, mySelectedLetter);//transfère la fct getAllIndex;

        if(temp.length !== 0){
        
            for(let i = 0; i < splitWord.length; i++){
                emptyLetters[temp[i]]= splitWord[temp[i]]
                splitWord[temp[i]]= "";
                console.log(splitWord);
            }
        }
        render();//affiche les lettres déjà utilisé et le nombre de tour

        if(turn === 0){ //si tu perd
            document.getElementById('write').innerHTML = "You lost, the good word was : " + randomWord;
            //alert("lose, the good word was: " + randomWord);
            playAgainButton();

        }
        if(splitWord.every((el) => el === "")){//si tu gagne
            document.getElementById('write').innerHTML = "You won!!";
            //alert("win");
            playAgainButton();

        }

    });

    render();//affiche le nombre de lettres a trouver 

    document.getElementById("playAgain").addEventListener('click', ()=>{
        location.reload();
    });



 /*function playAgainButton(){
    let ask = document.getElementById('run').innerHTML = "Play again"
 };
     
//prompt pour relancer le jeu
    /*function playAgain(){
        let ask = prompt("Would you like playing again?");
        if(ask === 'yes'){
            location.reload();
        }else{
            alert("Bye bye!");
        }
    };*/
    