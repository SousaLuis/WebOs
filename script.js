let files = {
    luissousa: {
        "ptiteBio.txt": "tite bio sa mere",
    },
    contact: {
        "email.txt": "luis.sousa89360@gmail.com",
        "tel.txt": "07.83.18.35.57",
        // "linkedin": "insert hyperlien",
    },
    "cv.txt": "Contenu du CV"
};

let cli;
let count = 0;
let position;

document.addEventListener('DOMContentLoaded', function() {
    cli = document.getElementById("cli");
    let lastLogin = document.getElementById("date");
    lastLogin.innerHTML = new Date();
    appear()
});

function appear () {
    count++;
    let br = document.createElement("br");
    let label = document.createElement("label");
    label.htmlFor = "line";
    let test = "luissousa@rpi:~"
    if (position) {
        test += "/" + position
    }
    test += " $ ";
    label.innerHTML = test;
    let input = document.createElement("input");
    input.type = "text";
    input.id = "line" + count;
    input.className = "lineClass";   

    cli.append(br, label, input);
    
    document.getElementById('line' + count).focus();
    document.getElementById("line" + count).addEventListener("keyup", ({key}) => {
        if (key === "Enter") {
            let value = document.getElementById("line" + count).value;
            if (value === "") {
                
            } else if (/(cd )\w+/.test(value) || value === "cd ..") {
                if (!value.includes(".txt")) {
                    let array = [];
                    let posInArbo;
                    if (position !== undefined) {
                        posInArbo = files[position];
                    } else {
                        posInArbo = files;
                    }
                    for (const key in posInArbo) {
                        array.push(key);
                    }
                    if (value.match(/(?<=cd\s+)(\w+)/)) {
                        array.forEach(element => {
                            if (value.match(/(?<=cd\s+)(\w+)/)[0] === element) {
                                position = value.match(/(?<=cd\s+)(\w+)/)[0];
                            }
                        });
                        if (position === undefined) {
                            // cd : nom_du_truc_accéder: No such file or directory
                            count++;
                            let br = document.createElement("br");
                            let label = document.createElement("label");
                            label.htmlFor = "line";
                            let string = " cd: " + value.match(/(?<=cd\s+)(\w+)/)[0] + ": No such file or directory";
                            label.innerHTML = string;

                            cli.append(br, label);
                        }
                    } else if (value === "cd ..") {
                        position = undefined;
                    }
                }
            } else if (/(time)/.test(value)) {
                count++;
                let time = new Date();
                let br = document.createElement("br");
                let label = document.createElement("label");
                label.htmlFor = "line";
                label.innerHTML = time; 
            
                cli.append(br, label);
            } else if (/(ls)/.test(value)) {
                let array = [];
                let posInArbo;
                if (position !== undefined) {
                    posInArbo = files[position];
                } else {
                    posInArbo = files;
                }
                for (const key in posInArbo) {
                    array.push(key);
                }
                let string = "";
                array.forEach(element => {
                    string += element + "\u00A0\u00A0\u00A0\u00A0";
                });
                count++;
                let br = document.createElement("br");
                let label = document.createElement("label");
                label.htmlFor = "line";
                label.innerHTML = string;
                
                cli.append(br, label);
            } else if (/(cat )/.test(value)) {
                let existing = false;
                let array = [];
                let el;
                let posInArbo;
                if (position !== undefined) {
                    posInArbo = files[position];
                } else {
                    posInArbo = files;
                }
                for (const key in posInArbo) {
                    array.push(key);
                }
                array.forEach(element => {
                    if (value.match(/(?<=cat\s+)(\w+)/)[0] + ".txt" === element) {
                        existing = true;
                        el = element;
                    }
                });
                console.log(el, posInArbo, posInArbo[el]);
                if (existing) {
                    count++;
                    let br = document.createElement("br");
                    let label = document.createElement("label");
                    label.htmlFor = "line";
                    label.innerHTML = posInArbo[el];  
                
                    cli.append(br, label);            
                }
            } else {
                count++;
                let br = document.createElement("br");
                let label = document.createElement("label");
                label.htmlFor = "line";
                label.innerHTML = value + " : commande introuvable"  
            
                cli.append(br, label);
            }
            if (document.getElementById("line" + (count))) {
                document.getElementById("line" + (count)).setAttribute("disabled", "disabled")
            } else {
                document.getElementById("line" + (count - 1)).setAttribute("disabled", "disabled")
            }
            appear()
        }

    })
}


// const example = 'a cat gifi picture';

// const regex = /(?<=cat\s+)(\w+)/;
