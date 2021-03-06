const express = require('express');
const app = express();
const path = require('path');
const uuid = require('uuid');
const fs = require('fs');

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//empty array to push data to
let noteArray = [];

// get api route
app.get('/api/notes', (req, res) => {
	//Read db.json
	fs.readFile('./db/db.json', 'utf8', (err, data) => {
		if (err) throw err;

		res.send(data);

		dataBase = JSON.parse(data);
		noteArray = dataBase;

		console.log(noteArray);
	});
});

// post api route
app.post('/api/notes', (req, res) => {
	const newNote = req.body;
	newNote.id = uuid.v4();
	noteArray.push(newNote);
	console.log(noteArray);

	fs.writeFile('./db/db.json', JSON.stringify(noteArray), (err) => {
		if (err) throw err;
	});
	res.json('./db/db.json');
});

//Bonus

app.delete('/api/notes/:id', (req, res) => {
	let selectedNoteId = req.params.id;
	//console log coming up as undefined so delete button is not working
	console.log(selectedNoteId);

	function filterById() {
		for (i = 0; i < noteArray.length; i++) {
			return noteArray[i].id !== selectedNoteId;
		}
	}
	const filteredArray = noteArray.filter(filterById);

	fs.writeFile('./db/db.json', JSON.stringify(filteredArray), (err) => {
		if (err) throw err;
	});
	res.json('./db/db.json');
});

//Dummy JSON to test delete function
// [{"title":"Test Title","text":"Test text"},{"title":"Mary","text":"Do something","id":"89d2570e-16cb-4b0d-abb9-866723e3ae56"},{"title":"donna","text":"do something too","id":"142c38bc-d65b-4b9e-9946-2e9b5ebb8bc1"},{"title":"Tom","text":"Do something else","id":"974e7e10-9d0b-44ee-916f-1d9b0ca1eb46"},{"title":"Katy","text":"walk annabelle","id":"6f53ac80-2131-498d-ace4-b278754de213"}]

// html routes
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
	res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.listen(PORT, () => {
	console.log('App listening on PORT ' + PORT);
});
