async function checkboxOnOff(e, title, type, i) {
    var confirmHere = confirm('수정하시겠습니까? 수정 내역이 Misskey에 반영됩니다.')
    if (confirmHere) {
        var cList = Array.from(e.classList)
        if (cList.includes('bx-checkbox')) {
            e.classList.remove("bx-checkbox")
            e.classList.add("bx-checkbox-square")
            if (type == 'todo') {
                for (var j=0; j<plannerjson.today.todo.length; j++) {
                    if (plannerjson.today.todo[j].title == title) {
                        plannerjson.today.todo[j].done == true
                        localStorage.setItem('plannerjson', JSON.stringify(plannerjson))
                    }
                }
            } else if (type == 'reminder') {
                for (var k=0; k<plannerjson.reminder.length; k++) {
                    if (plannerjson.reminder[k].title == title) {
                        for (var j=0; j<plannerjson.today.reminder.length; j++) {
                            if (plannerjson.today.reminder[j].index == k) {
                                plannerjson.today.reminder[j].done = true
                                localStorage.setItem('plannerjson', JSON.stringify(plannerjson))
                            }
                        }
                    }
                }
            } else if (type == 'routine') {
                for (var k=0; k<plannerjson.routine.length; k++) {
                    if (plannerjson.routine[k].title == title) {
                        for (var j=0; j<Object.keys(plannerjson.today.routine).length; j++) {
                            if (plannerjson.today.routine[Object.keys(plannerjson.today.routine)[j]].index == i) {
                                plannerjson.today.routine[Object.keys(plannerjson.today.routine)[j]].done = true
                                localStorage.setItem('plannerjson', JSON.stringify(plannerjson))
                            }
                        }
                    }
                }
            }
            //await createNote('`'+JSON.stringify(plannerjson.today)+'`', '오늘의 할일 '+title+'을(를) 완료했습니다.')
            //await updateJSON(plannerjson, jsonInfoUrl)
            location.href = location.href
        } else if (cList.includes('bx-checkbox-square')) {
            e.classList.remove("bx-checkbox-square")
            e.classList.add("bx-checkbox")
            if (type == 'todo') {
                for (var j=0; i<plannerjson.today.todo.length; j++) {
                    if (plannerjson.today.todo[j].title == title) {
                        plannerjson.today.todo[j].done == false
                        localStorage.setItem('plannerjson', JSON.stringify(plannerjson))
                    }
                }
            } else if (type == 'reminder') {
                for (var k=0; k<plannerjson.reminder.length; k++) {
                    if (plannerjson.reminder[k].title == title) {
                        for (var j=0; j<plannerjson.today.reminder.length; j++) {
                            if (plannerjson.today.reminder[j].index == k) {
                                plannerjson.today.reminder[j].done = false
                                localStorage.setItem('plannerjson', JSON.stringify(plannerjson))
                            }
                        }
                    }
                }
            } else if (type == 'routine') {
                for (var k=0; k<plannerjson.routine.length; k++) {
                    if (plannerjson.routine[k].title == title) {
                        for (var j=0; j<Object.keys(plannerjson.today.routine).length; j++) {
                            if (plannerjson.today.routine[Object.keys(plannerjson.today.routine)[j]].index == i) {
                                plannerjson.today.routine[Object.keys(plannerjson.today.routine)[j]].done = false
                                localStorage.setItem('plannerjson', JSON.stringify(plannerjson))
                            }
                        }
                    }
                }
            }
            await createNote('`'+JSON.stringify(plannerjson.today)+'`', '오늘 한 일 '+title+'을(를) 취소했습니다.')
            await updateJSON(plannerjson, jsonInfoUrl)
            location.href = location.href
        }
    }
}

async function loadMainPage(json, DATE) {

    var year = DATE.getFullYear()
    var month = DATE.getMonth() + 1
    var weekday = DATE.getDay()
    var date = DATE.getDate()

    var today = json.today

    for (var i = 0; i<today.priority.length; i++) {
        if (today.priority[i] == 1) {
            document.querySelector('#focused .list').innerHTML += '<a href="./?page='+i+'"><div class="projectsitem" onmouseover="hoverCharacter('+i+')"><div class="ptitle" style="background-image: url('+json.projects[i].avatar+'); background-size: cover;">'+json.projects[i].title+'</div></div></a>'
        }
    }

    var priorityLength = document.querySelectorAll('#focused .list a').length
    document.querySelector('#focused .list').setAttribute('style', 'min-width: '+ parseInt(priorityLength * (100 * 16 / 9 + 10)) +'px;')

    var routine = today.routine

    var routineKey = Object.keys(routine)
    routineKey.sort()
    document.querySelector('#routine').innerHTML += '<ul></ul>'
    for (var i=0; i <routineKey.length; i++){
        var realRoutine = json.routine[routine[routineKey[i]].index]
        if (realRoutine.day.includes(weekday)) {
            if (routine[routineKey[i]].done == false) {
                document.querySelector('#routine ul').innerHTML += '<div id="routine'+i+'"><i class="bx bx-checkbox" onclick="checkboxOnOff(this,`'+realRoutine.title+'`,`routine`,'+i+');"></i> <span class="bold">'+routineKey[i]+'</span> <span class="code"></span>'+realRoutine.title +'</div>'
            } else {
                document.querySelector('#routine ul').innerHTML += '<div id="routine'+i+'"><i class="bx bx-checkbox-square" onclick="checkboxOnOff(this,`'+realRoutine.title+'`,`routine`,'+i+');"></i> <span class="bold">'+routineKey[i]+'</span> <span class="code"></span>'+realRoutine.title +'</div>'
            }
            document.querySelector('#time'+routineKey[i]).innerHTML += ' '+realRoutine.title
            for (var j=0; j <realRoutine.goal.length; j++){
                document.querySelector('#routine'+i+' .code').innerHTML += '<code>'+json.projects[realRoutine.goal[j].split(',')[0]].title+' - '+json.projects[realRoutine.goal[j].split(',')[0]].goal[realRoutine.goal[j].split(',')[1]].title+'</code> '
            }
        }
    }

    var todo = today.todo
    var reminder = today.reminder
    var newTodo = []

    document.querySelector('#reminder').innerHTML += '<ul></ul>'
    for (var j = 0; j<reminder.length; j++) {
        var realReminder = json.reminder[reminder[j].index]
        if (realReminder.due == year+'-'+month+'-'+date) {
            newTodo.push(realReminder)
        }
    }

    for (var j = 0; j<todo.length; j++) {
        newTodo.push(todo[j])
    }

    console.log(json)

    var projectList = []
    for (var i=0; i<json.projects.length; i++){
        if (new Date() >= new Date(json.projects[i].startYear.split('.')[0], parseInt(json.projects[i].startYear.split('.')[1])-1) && new Date() <= new Date(json.projects[i].goalYear.split('.')[0], parseInt(json.projects[i].goalYear.split('.')[1]-1)) ) {
            projectList[i] = json.projects[i].title
        }
    }

    var realTodo = []
    for (var j = 0; j<json.projects.length; j++) {
        realTodo.push([])
    }
    for (var i = 0; i<newTodo.length; i++) {
        if (Array.isArray(newTodo[i].goal)) {
            for (var k = 0; k < newTodo[i].goal.length; k++) {
                realTodo[newTodo[i].goal[k].split(',')[0]].push(newTodo[i])
            }
        } else {
            realTodo[json.reminder[newTodo[i].goal].goal[0].split(',')[0]].push(newTodo[i])
        }
    }

    for (var i = 0; i<realTodo.length; i++) {
        if (realTodo[i].length > 0) {
            document.querySelector('#todo').innerHTML += '<div id="category'+i+'"><div class="bold">'+json.projects[i].title+'</div><ul></ul></div>'
            for (var j = 0; j<realTodo[i].length; j++) {
                if (realTodo[i][j].done == false) {
                    if (!realTodo[i][j].due) {
                        document.querySelector('#category'+i+' ul').innerHTML += '<div id="todo'+i+'-'+j+'"><i class="bx bx-checkbox" onclick="checkboxOnOff(this,`'+realTodo[i][j].title+'`,`todo`,'+i+');"></i> <span class="bold">'+routineKey[i]+'</span> <span class="code"></span>'+ realTodo[i][j].title +'</div>'
                    } else {
                        document.querySelector('#category'+i+' ul').innerHTML += '<div id="todo'+i+'-'+j+'"><i class="bx bx-checkbox" onclick="checkboxOnOff(this,`'+realTodo[i][j].title+'`,`reminder`,'+i+');"></i> <span class="bold">'+routineKey[i]+'</span> <span class="code"></span>'+ realTodo[i][j].title +'</div>'
                    }
                } else {
                    if (!realTodo[i][j].due) {
                        document.querySelector('#category'+i+' ul').innerHTML += '<div id="todo'+i+'-'+j+'"><i class="bx bx-checkbox-square" onclick="checkboxOnOff(this,`'+realTodo[i][j].title+'`,`todo`,'+i+');"></i> <span class="bold">'+routineKey[i]+'</span> <span class="code"></span>'+ realTodo[i][j].title +'</div>'
                    } else {
                        document.querySelector('#category'+i+' ul').innerHTML += '<div id="todo'+i+'-'+j+'"><i class="bx bx-checkbox-square" onclick="checkboxOnOff(this,`'+realTodo[i][j].title+'`,`reminder`,'+i+');"></i> <span class="bold">'+routineKey[i]+'</span> <span class="code"></span>'+ realTodo[i][j].title +'</div>'
                    }
                }
                if (Array.isArray(realTodo[i][j].goal)) {
                    for (var k=0; k < realTodo[i][j].goal.length; k++){
                        document.querySelector('#todo'+i+'-'+j+' .code').innerHTML += '<code>'+json.projects[realTodo[i][j].goal[k].split(',')[0]].title+' - '+json.projects[realTodo[i][j].goal[k].split(',')[0]].goal[realTodo[i][j].goal[k].split(',')[1]].title+'</code> '
                    }
                } else {
                    for (var k=0; k < json.reminder[realTodo[i][j].goal].goal.length; k++) {
                        document.querySelector('#todo'+i+'-'+j+' .code').innerHTML += '<code>'+json.projects[json.reminder[realTodo[i][j].goal].goal[k].split(',')[0]].title+' - '+json.projects[json.reminder[realTodo[i][j].goal].goal[k].split(',')[0]].goal[json.reminder[realTodo[i][j].goal].goal[k].split(',')[1]].title+'</code> '
                    }
                }
                if (realTodo[i][j].time != '') {
                    document.querySelector('#todo'+i+'-'+j+' .bold').innerHTML = realTodo[i][j].time
                    document.querySelector('#time'+realTodo[i][j].time).innerHTML += ' '+realTodo[i][j].title
                } else {
                    document.querySelector('#todo'+i+'-'+j+' .bold').innerHTML = '종일'
                }
            }
        }
    }

    for (var j = 0; j<json.reminder.length; j++) {
        var realReminder = json.reminder[j]
        if (new Date(realReminder.due.split('-')[0], parseInt(realReminder.due.split('-')[1]) - 1, realReminder.due.split('-')[2]) > DATE) {
            document.querySelector('#reminder ul').innerHTML += '<div id="reminder'+j+'"><i class="bx bx-calendar-check" onclick="checkboxOnOff(this,`'+realReminder.title+'`,`reminder`,'+i+', '+j+');"></i> <span class="bold">'+realReminder.due+'</span> <span class="code"></span>'+realReminder.title+'</div>'
            for (var k=0; k <realReminder.goal.length; k++){
                document.querySelector('#reminder'+j+' .code').innerHTML += '<code>'+json.projects[realReminder.goal[k].split(',')[0]].title+' - '+json.projects[realReminder.goal[k].split(',')[0]].goal[realReminder.goal[k].split(',')[1]].title+'</code> '
            }
        }
    }
    
}

function refreshToday(Array) {
    for (var i=0; i<Array.length; i++) {
        localStorage.removeItem(Array[i])
    }
    location.reload(true);
}

function nothingHere() {
    document.querySelector('#viewer-content').innerHTML = '<div class="nothingHere"><div>이곳은 @'+MISSKEYUSER+'@'+MISSKEYHOST+' 의 작은 메모장입니다.</div><div>내용을 보시려면 로그인하셔야 해요.</div></div>'
}

if (!isLogin) {
    nothingHere()
}

if (isLogin) {
    if (!page && !note && !mode) {
        loadBackground(plannerjson)
    
        var today = new Date()
        document.querySelector('#viewer-content .columnTitle').innerHTML += ' '+today.getFullYear()+'년 '+(today.getMonth()+1)+'월 '+today.getDate()+'일 '+weekArray[today.getDay()]+'요일'
    
        document.querySelector('#viewer-content div').innerHTML += '<div id="controller"><div id="refreshToday" class="bold" onclick="refreshToday([`todo`, `routine`, `reminder`])">새로고침</div></div>'
        document.querySelector('#controller').innerHTML += '<a href="./?mode=edit"><div class="bold">'+LANG.ADDCONTENT+'</div></a>'
        document.querySelector('#viewer-content div').innerHTML += '<div id="focused"><h2>관심 프로젝트</h2><div class="overflowed-list"><div class="list"></div></div></div>'
        document.querySelector('#viewer-content div').innerHTML += '<div id="reminder"><h2>리마인더</h2></div>'
    
        document.querySelector('#viewer-content div').innerHTML += '<div id="todo"><h2>할일</h2></div>'
        document.querySelector('#viewer-content div').innerHTML += '<div id="routine"><h2>고정 일정</h2></div>'
        loadMainPage(plannerjson,today)
    }
}
