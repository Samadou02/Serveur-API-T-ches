//Paramètrage de l'appli web
const express = require('express');      //Importation du module express pour la créa de l'appli
const bodyParser = require('body-parser') //Permet d'analyser le corps des requetes au format json

const app = express();    //Instance de l'appli express
const port = 3000;

app.use(bodyParser.json());  
//La liste des taches
let tasks = [
    { id: 1, description: 'Faire les courses' },
    { id: 2, description: 'Faire la  cuisine' }
];

//Demmarage du serveur sur le port 3000
app.listen(port, ()=> {
    console.log(`Serveur écoutant sur le port ${port}`);
});

//Liste de toutes les références des tâches
app.get('/tasks', (req, res) => {
     const taskReferences = tasks.map(task => `/task/${task.id}`);  //Recupérer les tâches avec la méthode GET
    res.json(taskReferences);
});

//Route pour recuperer une tache par son ID
app.get('/task/:id', (req, res) => {
    const taskId = parseInt(req.params.id); 
    const task = tasks.find(task => task.id === taskId);

    if (task) {
        res.json(task);
    } else {
        res.status(404).json({error: 'Tâche non trouvée'});
    }
});

//Ajout de tâche avec la méthode POST

app.post('/tasks', (req, res ) => {
    const newTask = {
        id: tasks.lenght + 1,       //task.lenght pour recuperer le nombre d'element du tableau
        description: req.body.description //Recuperer la description entree par l'utilisateur dans le body de la requête
    };
    tasks.push(newTask); //Mettre nouvelle tâches
    res.status(201).json({message: 'Tâche ajoutée avec succès', task:newTask});
});

//Modifier une tache
app.put('/task/:id', (req, res) => {
    const taskId = parseInt(req.params.id);  //Recuperer l'ID de la tache
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.description = req.body.description;
        res.json({message: 'Tâche mise à jour avec succès', task});
    } else {
        res.status(404).json({error: 'Tâche non trouvée'});
    }
});

//Supprimer une tache
app.delete('/task/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== taskId); //Methode filter pour creer  une nouvelle liste de tache
    res.json({message: 'Tâche supprimée avec succès'});
});
