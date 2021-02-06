const express = require('express');
const app = express();
const path = require('path');
const uuid = require('uuid');
const fs = require('fs');

const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

let noteArray = [
	{
		title: '',
		text: '',
		id: null
	}
];

//GET

app.get('/api/notes', (req, res) => {
	//Read db.json
	fs.readFile('./db/db.json', 'utf8', (err, data) => {
		if (err) throw err;

		res.send(data);

		// parsedData = JSON.parse(data);
		// console.log(parsedData);
	});
});

app.post('/api/notes', (req, res) => {
	const newNote = req.body;
	newNote.id = uuid.v4();
	noteArray.push(newNote);
	console.log(noteArray);
	fs.writeFile('./db/db.json', JSON.stringify(noteArray), (err) => {
		if (err) throw err;
	});
	res.json();
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
	res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.listen(PORT, () => {
	console.log('App listening on PORT ' + PORT);
});