async function fetchNotes(query) {

    var url = 'https://'+MISSKEYHOST+'/api/notes/search'
    var param = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            i: token,
            query: query,
            userId: MISSKEYID,
            limit: 100
        })
    }

    var data = await fetch(url, param)
    var result = await data.json()

    return result

}

async function fetchReply(query) {

    var url1 = 'https://'+MISSKEYHOST+'/api/notes/search'
    var param1 = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            i: token,
            query: query,
            userId: MISSKEYID,
            limit: 100
        })
    }

    var data1 = await fetch(url1, param1)
    var result1 = await data1.json()

    if (result1.length > 0){

        var url2 = 'https://'+MISSKEYHOST+'/api/notes/replies'
        var param2 = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                noteId: result1[0].id,
                limit: 100
            })
        }
        var data2 = await fetch(url2, param2)
        var result = await data2.json()
    
        return result
    } else {
        return []
    }
}

async function updateJSON(json, jsonPageId) {

    var url = 'https://'+MISSKEYHOST+'/api/pages/update'
    var param = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            i: token,
            pageId: jsonPageId,
            title: 'PlanetKey.json',
            name: 'PlanetKey.json',
            summary: 'PlanetKey.json',
            variables: [],
            script: '',
            content: [{
                text: '```\n'+JSON.stringify(json)+'\n```',
                type: 'text'
            }]
        })
    }
    var data = await fetch(url, param)
    var result = await data.json()
    
    return result
}

async function createNote(text, title, visibility='specified') {

    var vis = 'specified'
    var loc = false
    if (visibility == 'homelocal') {
        vis = 'home',
        loc = true
    } if (visibility == 'home') {
        vis = 'home'
    }
    var DATE = new Date()
    var year = DATE.getFullYear()
    var month = DATE.getMonth()+1
    var date = DATE.getDate()

    var url = 'https://'+MISSKEYHOST+'/api/notes/create'
    var param = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            i: token,
            text: text,
            cw: title,
            tags: [plannerjson.info.mainHashtag, 'P'+year+'-'+month+'-'+date],
            visibility: vis,
            localOnly: loc
        })
    }

    var data = await fetch(url, param)
    var result = await data.json()

    return result.createdNote.id
}