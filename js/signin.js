var misskeyJsonId
if (localStorage.getItem('misskeyJsonId')) {
    misskeyJsonId = localStorage.getItem('misskeyJsonId')
}

if (page == 'signin') {
    if (!isLogin) {
        let uuid = self.crypto.randomUUID();
        localStorage.setItem("sessionId", uuid);
        var signinUrl = 'https://'+MISSKEYHOST+'/miauth/'+uuid+'?name=CabinetKey&callback='+encodeURIComponent(location.href.split('?')[0])+'%3Fpage%3Dcallback&permission=write:account,read:account,write:drive,write:notes,write:pages'
        location.href = signinUrl;
    } else {
        var willLogout = confirm(LANG.WILLYOULOGOUT)
        if (willLogout) {
            localStorage.clear()
            location.href = './'
        } else {
            alert(LANG.BACKTOMAINPAGE)
            location.href = './'
        }
    }
} else if (page == 'callback') {
    if (sessionId) {
        var postUrl = 'https://'+MISSKEYHOST+'/api/miauth/'+sessionId+'/check'
        var postParam = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({})
        }
        fetch(postUrl, postParam)
        .then((tokenData) => {return tokenData.json()})
        .then((tokenRes) => {
            if (tokenRes.user.username != MISSKEYUSER) {
                alert(LANG.cINVALIDID)
                localStorage.clear()
                location.href = './'
            } else {
                localStorage.setItem("token", tokenRes.token)

                MISSKEYID = tokenRes.id
                localStorage.setItem('misskeyId', MISSKEYID)
                var findInfoUrl = 'https://'+MISSKEYHOST+'/api/notes/search'
                var findInfoParam = {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        i: tokenRes.token,
                        query: 'PlanetKey_Setup',
                        userId: tokenRes.user.id,
                    })
                }
                fetch(findInfoUrl, findInfoParam)
                .then((infoData) => {return infoData.json()})
                .then((infoRes) => {
                    if (infoRes.length == 0) {
                        var jsonInitial = JSON.stringify(example)
                        var createPageUrl = 'https://'+MISSKEYHOST+'/api/pages/create'
                        var createPageParam = {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json',
                            },
                            body: JSON.stringify({
                                i: tokenRes.token,
                                title: 'PlanetKey.json',
                                name: 'PlanetKey.json',
                                summary: 'PlanetKey.json',
                                variables: [],
                                script: '',
                                content: [{
                                    text: '```\n'+jsonInitial+'\n```',
                                    type: 'text'
                                }]
                            })
                        }
                        fetch(createPageUrl, createPageParam)
                        .then((pageData) => {return pageData.json()})
                        .then((pageRes) => {
                            misskeyJsonId = pageRes.id
                            localStorage.setItem('json', jsonInitial)
                            localStorage.setItem('misskeyJsonId', misskeyJsonId)
                            var createNoteUrl = 'https://'+MISSKEYHOST+'/api/notes/create'
                            var createNoteParam = {
                                method: 'POST',
                                headers: {
                                    'content-type': 'application/json',
                                },
                                body: JSON.stringify({
                                    i: tokenRes.token,
                                    visibility: 'specified',
                                    text: '`' + pageRes.id + '` #PlanetKey_Setup'
                                })
                            }
                            fetch(createNoteUrl, createNoteParam)
                            .then((noteData) => {return noteData.json()})
                            .then((noteRes) => {
                                location.href = './'
                            })
                        })
                    } else if (infoRes.length == 1) {

                        const MISSKEYSETUPID = infoRes[0].id
                        const MISSKEYJSONID = infoRes[0].text.split('`')[1]
                        misskeyJsonId = MISSKEYJSONID
                        localStorage.setItem('misskeyJsonId', misskeyJsonId)

                        var jsonInfoUrl = 'https://'+MISSKEYHOST+'/api/pages/show'
                        var jsonInfoParam = {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json',
                            },
                            body: JSON.stringify({
                                pageId: MISSKEYJSONID
                            })
                        }
                        
                        fetch(jsonInfoUrl, jsonInfoParam)
                        .then((pageData) => {return pageData.json()})
                        .then((pageRes) => {
                            if (!pageRes.content) {
                                json = example
                            } else {
                                json = JSON.parse(pageRes.content[0].text.split('```')[1])
                                localStorage.setItem('plannerjson', JSON.stringify(plannerjson))
                                isLogin = true
                                location.href = './'
                            }
                        })
                    } else if (infoRes.length > 1) {
                        alert(LANG.cDUPLICATEDSETUPNOTES)
                        json = example

                        location.href = './'
                        
                    }
                })
            }
        })
    } else {
        alert('잘못된 접근입니다.')
        location.href = './'
    }
} 
