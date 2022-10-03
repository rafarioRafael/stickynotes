const noteContainer = document.getElementById("app");
const addNoteButton = noteContainer.querySelector(".add-note");

getNotes().forEach(note => {
    const noteElement = createNotesElement(note.id, note.content);
    noteContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () => addNote());

function getNotes(){
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}
function saveNotes(notes){  
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}
function createNotesElement(id, content){
    const element = document.createElement("textarea");
    element.classList.add("note");
    element.value = content;
    element.placeholder = "Empty stick notes";

    element.addEventListener("change", () => {
        updateNote(id, element.value);
    });

    element.addEventListener("dblclick", () => {
        const doDelete = confirm("Are you sure you want to delete this note?");
        if(doDelete){
            deleteNote(id, element);
        }

    });

    return element;


}
function addNote(){
    const existingNotes = getNotes();
    const noteObj = {
        id: Math.floor(Math.random() *1000),
        content: ''
    };
    const noteElement = createNotesElement(noteObj.id, noteObj.content);
    noteContainer.insertBefore(noteElement, addNoteButton);

    notes.push(noteObj);
    saveNotes(existingNotes);
}

function updateNote(id, newContent){
    const notes = getNotes();
    const targetNote = notes.filter(note => note.id == id)[0];

    targetNote.content = newContent;
    saveNotes(notes);
}

function deleteNote(id, element){
    const notes = getNotes().filter(note => note.id != id);
    saveNotes(notes);
    noteContainer.removeChild(element);
}