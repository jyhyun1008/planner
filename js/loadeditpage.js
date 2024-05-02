var temporaryTodo = {
    count: 0
}

var projectList = []
var goalList = []
var reminderList = []
for (var i=0; i<plannerjson.projects.length; i++){
    projectList.push(plannerjson.projects[i].title)
    goalList.push([])
    for (var j=0; j<plannerjson.projects[i].goal.length; j++){
        goalList[i].push(plannerjson.projects[i].goal[j].title)
    }
}
for (var i=0; i<plannerjson.reminder.length; i++){
    reminderList.push(plannerjson.reminder[i].title)
}

function checkOnOff(e) {
    var cList = Array.from(e.classList)
    if (cList.includes('bx-checkbox')) {
        e.classList.remove("bx-checkbox")
        e.classList.add("bx-checkbox-square")
    } else if (cList.includes('bx-checkbox-square')) {
        e.classList.remove("bx-checkbox-square")
        e.classList.add("bx-checkbox")
    }
}

function changeGoal(e, project) {
    var catList = []
    for (var i=0; i<plannerjson.projects[project].goal.length; i++){
        catList.push(plannerjson.projects[project].goal[i].title)
    }
    var nextCat = catList[(catList.indexOf(e.innerText)+1)%catList.length]
    e.innerHTML = nextCat
}

function changeProject(e, goalEl) {
    var catList = []
    for (var i=0; i<plannerjson.projects.length; i++){
        if (new Date() >= new Date(plannerjson.projects[i].startYear.split('.')[0], parseInt(plannerjson.projects[i].startYear.split('.')[1])-1) && new Date() <= new Date(plannerjson.projects[i].goalYear.split('.')[0], parseInt(plannerjson.projects[i].goalYear.split('.')[1]-1)) ) {
            catList.push(plannerjson.projects[i].title)
        }
    }
    var nextCat = catList[(catList.indexOf(e.innerText)+1)%catList.length]
    e.innerHTML = nextCat

    changeGoal(goalEl, (catList.indexOf(nextCat)))
    goalEl.setAttribute('onclick', `changeGoal(this, `+catList.indexOf(nextCat)+`);`)
}

async function loadEditPage(json, DATE) {

    var year = DATE.getFullYear()
    var month = DATE.getMonth() + 1
    var weekday = DATE.getDay()
    var date = DATE.getDate()

    var today = json.today

    var routine = today.routine
    var todo = today.todo
    var reminder = today.reminder

    var routineKey = Object.keys(routine)
    routineKey.sort()
    document.querySelector('#routine').innerHTML += '<ul></ul>'
    for (var i=0; i <routineKey.length; i++){
        var realRoutine = json.routine[routine[routineKey[i]].index]
        if (realRoutine.day.includes(weekday)) {
            document.querySelector('#routine ul').innerHTML += '<div id="routine'+i+'"><i class="bx bx-calendar-check" onclick="checkboxOnOff(this,`'+realRoutine.title+'`,`routine`,'+i+');"></i> <span class="bold">'+routineKey[i]+'</span> <span class="code"></span>'+realRoutine.title +'</div>'
            document.querySelector('#time'+routineKey[i]).innerHTML += ' '+realRoutine.title
            for (var j=0; j <realRoutine.goal.length; j++){
                document.querySelector('#routine'+i+' .code').innerHTML += '<code>'+json.projects[realRoutine.goal[j].split(',')[0]].title+' - '+json.projects[realRoutine.goal[j].split(',')[0]].goal[realRoutine.goal[j].split(',')[1]].title+'</code> '
            }
        }
    }

        for (var j = 0; j<reminder.length; j++) {
            if (reminder[j].due == year+'-'+month+'-'+date) {
                if (reminder[j].time != '') {
                    document.querySelector('#time'+reminder[j].time).innerHTML += ' '+reminder[j].title
                }
            }
        }
    
            for (var j = 0; j<todo.length; j++) {
                if (todo[j].time != '') {
                    document.querySelector('#time'+todo[j].time).innerHTML += ' '+todo[j].title
                }
            }


    //관심 프로젝트
    document.querySelector('#focusedInputDiv').innerHTML = '<ul class="focusedCheckbox"></ul>'
    for (var i=0; i<today.priority.length; i++) {
        if (DATE >= new Date(json.projects[i].startYear.split('.')[0], parseInt(json.projects[i].startYear.split('.')[1])-1) && DATE <= new Date(json.projects[i].goalYear.split('.')[0], parseInt(json.projects[i].goalYear.split('.')[1]-1)) ) {
            if (today.priority[i] == 0) {
                document.querySelector('.focusedCheckbox').innerHTML += '<div><i onclick="checkOnOff(this);" class="bx bx-checkbox"></i><code>'+json.info.category[json.projects[i].category]+'</code> '+json.projects[i].title+' - '+json.projects[i].summary+'</div>'
            } else {
                document.querySelector('.focusedCheckbox').innerHTML += '<div><i onclick="checkOnOff(this);" class="bx bx-checkbox-square"></i><code>'+json.info.category[json.projects[i].category]+'</code> '+json.projects[i].title+' - '+json.projects[i].summary+'</div>'
            }
        }
    }

    //할일
    
    document.querySelector('#todoInputDiv').innerHTML = '<ul class="todoCheckbox"></ul>'
    temporaryTodo.count = todo.length
    for (var i=0; i<todo.length; i++) {
        if (todo[i].done) {
            document.querySelector('.todoCheckbox').innerHTML += '<div id="todo'+i+'" class="todoInput"><i onclick="checkOnOff(this);" class="bx bx-calendar-check"></i><input id="todoInput'+i+'" value="'+todo[i].title+'" /><ul><div><i class="bx bx-category" ></i>: <span class="code"></span> <code>+</code> <code>-</code></div><div><i class="bx bx-timer" ></i>: <input id="todoTimeInput'+i+'" value="'+todo[i].time+'" /></div><div><i class="bx bx-clipboard" ></i>: <input id="todoSummaryInput'+i+'" value="'+todo[i].summary+'" /></div><div><i class="bx bx-link" ></i>: <span id="todoDescriptionInput'+i+'">'+todo[i].description+'</span></div></ul></div>'
            if (Array.isArray(todo[i].goal)) {
                for (var k=0; k <todo[i].goal.length; k++){
                    document.querySelector('#todo'+i+' .code').innerHTML += '<code><span id="todoCat'+i+'-'+k+'" class="category" onclick="changeProject(this, document.querySelector(`#todo'+i+'-'+k+'`));">'+json.projects[todo[i].goal[k].split(',')[0]].title+'</span> - <span class="goal" id="todo'+i+'-'+k+'" onclick="changeGoal(this, '+todo[i].goal[k].split(',')[0]+');">'+json.projects[todo[i].goal[k].split(',')[0]].goal[todo[i].goal[k].split(',')[1]].title+'</span></code> '
                }
            } else {
                for (var k=0; k <json.reminder[todo[i].goal].goal.length; k++){
                    realGoal = json.reminder[todo[i].goal].goal[k]
                    document.querySelector('#todo'+i+' .code').innerHTML += '<code><span class="category" onclick="changeProject(this, document.querySelector(`#todo'+i+'-'+k+'`));">'+json.projects[realGoal.split(',')[0]].title+'</span> - <span class="goal" id="todo'+i+'-'+k+'" onclick="changeGoal(this, '+realGoal.split(',')[0]+');">'+json.projects[realGoal.split(',')[0]].goal[realGoal.split(',')[1]].title+'</span></code> '
                }
            }
        } else {
            document.querySelector('.todoCheckbox').innerHTML += '<div id="todo'+i+'" class="todoInput"><i onclick="checkOnOff(this);" class="bx bx-calendar-alt"></i><input id="todoInput'+i+'" value="'+todo[i].title+'" /><ul><div><i class="bx bx-category" ></i>: <span class="code"></span> <span id="controller'+i+'"><code>+</code> <code>-</code> <code>s</code></span></div><div><i class="bx bx-timer" ></i>: <input id="todoTimeInput'+i+'" value="'+todo[i].time+'" /></div><div><i class="bx bx-clipboard" ></i>: <input id="todoSummaryInput'+i+'" value="'+todo[i].summary+'" /></div><div><i class="bx bx-link" ></i>: <span id="todoDescriptionInput'+i+'">'+todo[i].description+'</span></div></ul></div>'
            if (Array.isArray(todo[i].goal)) {
                for (var k=0; k <todo[i].goal.length; k++){
                    document.querySelector('#todo'+i+' .code').innerHTML += '<code><span id="todoCat'+i+'-'+k+'" class="category" onclick="changeProject(this, document.querySelector(`#todo'+i+'-'+k+'`));">'+json.projects[todo[i].goal[k].split(',')[0]].title+'</span> - <span class="goal" id="todo'+i+'-'+k+'" onclick="changeGoal(this, '+todo[i].goal[k].split(',')[0]+');">'+json.projects[todo[i].goal[k].split(',')[0]].goal[todo[i].goal[k].split(',')[1]].title+'</span></code> '
                }
            } else {
                document.querySelector('#controller'+i).innerHTML = '<code>s</code>'
                realGoal = json.reminder[todo[i].goal]
                document.querySelector('#todo'+i+' .code').innerHTML += '<code><span class="category">'+realGoal.title+'</span>'
            }
        }
    }

    //고정일정
    document.querySelector('#reminder').innerHTML += '<ul></ul>'
    for (var j = 0; j<json.reminder.length; j++) {
        var realReminder = json.reminder[j]
        if (new Date(realReminder.due.split('-')[0], parseInt(realReminder.due.split('-')[1]) - 1, parseInt(realReminder.due.split('-')[2])+1) > DATE) {
            document.querySelector('#reminder ul').innerHTML += '<div id="reminder'+j+'"><i class="bx bx-calendar-check" onclick="checkboxOnOff(this,`'+realReminder.title+'`,`reminder`,'+i+', '+j+');"></i> <span class="bold">'+realReminder.due+'</span> <span class="code"></span>'+realReminder.title+'</div>'
            for (var k=0; k <realReminder.goal.length; k++){
                document.querySelector('#reminder'+j+' .code').innerHTML += '<code>'+json.projects[realReminder.goal[k].split(',')[0]].title+' - '+json.projects[realReminder.goal[k].split(',')[0]].goal[realReminder.goal[k].split(',')[1]].title+'</code> '
            }
        }
    }

    //이벤트리스너
    document.querySelector('#addTodoContent').addEventListener("click", (e) => {
        var count = temporaryTodo.count
        document.querySelector('.todoCheckbox').innerHTML += '<div id="todo'+count+'" class="todoInput"><i onclick="checkOnOff(this);" class="bx bx-calendar-alt"></i><input id="todoInput'+count+'" value="새로운 할일" /><ul><div><i class="bx bx-category" ></i>: <span class="code"></span> <code>+</code> <code>-</code></div><div><i class="bx bx-timer" ></i>: <input id="todoTimeInput'+count+'" value="0000" /></div><div><i class="bx bx-clipboard" ></i>: <input id="todoSummaryInput'+count+'" value="요약" /></div><div><i class="bx bx-link" ></i>: <span id="todoDescriptionInput'+count+'"></span></div></ul></div>'
        temporaryTodo.count += 1
    })

    document.querySelector('#deleteTodoContent').addEventListener("click", (e) => {
        if (temporaryTodo.count > 0) {
            temporaryTodo.count -= 1
            document.querySelector('#todo'+temporaryTodo.count).remove()
        }
    })

    //확인
    document.querySelector('#confirm').addEventListener("click", (e) => {
        var tTodo = []
        for (var j=0; j < document.querySelectorAll('.todoInput').length; j++) {
            var title = document.querySelector('#todoInput'+j).value.replace(/\/g, '')
            var category
            if (document.querySelector('#todo'+j+' code').innerText.includes('-')) {
                category = []
                for (var k=0; k<document.querySelectorAll('#todo'+j+' .code code').length; k++) {
                    projectIndex = projectList.indexOf(document.querySelector('#todoCat'+j+'-'+k).innerText.replace(/\/g, ''))
                    goalIndex = goalList[projectIndex].indexOf(document.querySelector('#todo'+j+'-'+k).innerText.replace(/\/g, ''))
                    category.push(projectIndex + ',' + goalIndex)
                }
            } else {
                category = reminderList.indexOf(document.querySelector('#todo'+j+' .category').innerText)
            }
            var done
            if (Array.from(document.querySelector('#todo'+j+' .bx').classList).includes('bx-calendar-alt')) {
                done = false
            } else if(Array.from(document.querySelector('#todo'+j+' .bx').classList).includes('bx-calendar-check')) {
                done = true
            }
            var time = document.querySelector('#todoTimeInput'+j).value.replace(/\/g, '')
            var summary = document.querySelector('#todoSummaryInput'+j).value.replace(/\/g, '')
            var description = document.querySelector('#todoDescriptionInput'+j).innerText.replace(/\/g, '')
            tTodo[j] = {
                "title": title,
                "time": time,
                "goal": category,
                "summary": summary,
                "description": description,
                "done": done,
            }
        }
        today.todo = tTodo
        localStorage.setItem('plannerjson', JSON.stringify(json))
        updateJSON(json, jsonInfoUrl)
    })
}

if (!isLogin) {
    if (!page && !note && mode == 'edit') {
        loadBackground(plannerjson)

        var today = new Date()
        document.querySelector('#viewer-content .columnTitle').innerHTML += ' '+today.getFullYear()+'년 '+(today.getMonth()+1)+'월 '+today.getDate()+'일 '+weekArray[today.getDay()]+'요일 - 편집하기'
        
        document.querySelector('#viewer-content div').innerHTML += '<div id="focused"><h2>관심 프로젝트</h2><div id="focusedInputDiv"></div></div>'
        document.querySelector('#viewer-content div').innerHTML += '<div id="reminder"><h2>리마인더</h2><div id="reminderInputDiv"></div></div>'

        document.querySelector('#viewer-content div').innerHTML += '<div id="todo"><h2>할일</h2><div id="controller"><div class="bold" id="addTodoContent">'+LANG.ADDCONTENT+'</div><div class="bold" id="deleteTodoContent">한 줄 삭제</div></div><div id="todoInputDiv"></div></div>'
        document.querySelector('#viewer-content div').innerHTML += '<div id="routine"><h2>고정 일정</h2><div id="routineInputDiv"></div></div>'

        document.querySelector('#viewer-content div').innerHTML += '<div class="confirm"><span class="bold" id="confirm">'+LANG.CONFIRM+'</span> <span class="bold" id="cancel">취소</span></div>'

        loadEditPage(plannerjson,today)
    }
}