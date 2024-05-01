document.querySelector('#refresh').addEventListener("click", (e) => {
    localStorage.removeItem('json')
    localStorage.removeItem('misskeyId')
})

function hoverCharacter(i) {
    document.querySelector('.projectsname').innerHTML = '[' + i + ']' + plannerjson.projects[i].title
}
