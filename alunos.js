
const alunos = [
    {matric: 1, name: "Jessica", media: 9 },
    {matric: 2, name: "Jhon", media: 8 },
    {matric: 3, name: "Gaby", media: 7 },
    {matric: 4, name: "Jenni", media: 6 },
    {matric: 5, name: "Cal Bark", media: 5},
    {matric: 6, name: "Paul Chess", media: 2},
];


function listAlunos( name, media ) {
    let listFilter = alunos;
    if (name) {
        listFilter = listFilter.filter(a => a.name.toLowerCase().includes(name.toLowerCase()));
    }
    else if (media) {
        listFilter = listFilter.filter(a => a.media >= media);
    }
    return listFilter;
}

function addAlunos(matric, name, media){
    alunos.push({"matric": matric,"name": name, "media": media })
}

function delAlunos(matric){
    for (let i = 0; i < alunos.length; i++) {
        if (alunos[i].matric == matric) {
            alunos.splice(i,1)
            //console.log(alunos)
        }
    }
}

function updateAlunos(matric, newName, newMedia) {
    for (let i = 0; i < alunos.length; i++) {
        if (alunos[i].matric == matric) {
            console.log(newName, newMedia, matric)
            alunos[i].name = newName,
            alunos[i].media = newMedia;
            break;
            
        }
    }
}

module.exports = {alunos, listAlunos, addAlunos, delAlunos, updateAlunos};