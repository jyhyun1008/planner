async function loadBackground(json) {
    document.querySelector('#time-content').innerHTML = '<div id="calendar-content"><div class="yearInput"></div><div class="calendar-days"><div class="day">S</div><div class="day">M</div><div class="day">T</div><div class="day">W</div><div class="day">T</div><div class="day">F</div><div class="day">S</div></div><div class="calendar-dates" id="calendarDates"></div></div><div id="timeline-content"></div>'

    var today = new Date();
    renderCalendar(today.getFullYear(), today.getMonth())

    document.querySelector('.yearInput').innerHTML += '<h1 class="columnTitle">'+LANG.CALENDAR+'</h1>'
    document.querySelector('.yearInput').innerHTML += '<div class="yearInput"><div class="bold">'+LANG.MOVETOYEAR+'</div> </div>'
    document.querySelector('.yearInput').innerHTML += '<div id="yearAndMonthText"><input id="yearTextInput" value="'+today.getFullYear()+'"></input> <input id="monthTextInput" value="'+(today.getMonth()+1)+'"></input> <span class="bold" id="yearChange">'+LANG.MOVE+'</span></div>'
    document.querySelector('#timeline-content').innerHTML += '<h1 class="columnTitle">'+LANG.TIMELINE+'</h1>'
    document.querySelector('#timeline-content').innerHTML += '<div class="timelinebox"></div>'
    document.querySelector('#project-content').innerHTML = '<div></div>'
    document.querySelector('#project-content div').innerHTML = '<h1 class="columnTitle">'+LANG.PROJECT+'</h1>'
    document.querySelector('#project-content div').innerHTML += '<div class="projectsname"></div>'
    document.querySelector('#project-content div').innerHTML += '<div class="projectslist"></div>'

    var cList = json.projects
    for (var i = 0; i < cList.length; i++) {
        if (today >= new Date(cList[i].startYear.split('.')[0], parseInt(cList[i].startYear.split('.')[1])-1) && today <= new Date(cList[i].goalYear.split('.')[0], parseInt(cList[i].goalYear.split('.')[1])-1) ) {
            document.querySelector('.projectslist').innerHTML += '<a href="./?page='+i+'"><div class="projectsitem" onmouseover="hoverCharacter('+i+')"><div><img src="'+cList[i].avatar+'" class="cavatar"></div><div class="ptitle">'+cList[i].title+'</div><div class="psummary">'+cList[i].summary+'</div></div></a>'
        }
    }
    document.querySelector('#viewer-content').innerHTML = '<div></div>'
    document.querySelector('#viewer-content div').innerHTML = '<h1 class="columnTitle">'+LANG.TODAY+'</h1>'

    document.querySelector('#timeline-content div').innerHTML += '<div class="timetables"></div>'

    var nowHour = today.getHours()
    for (var i=5; i<21; i++) {
        var hour = '0'+i
        if (hour.length > 2) {
            hour = hour[1]+hour[2]
        }
        document.querySelector('.timetables').innerHTML += '<div class="fullTime" id="fullTime'+i+'"><div><span class="bold">'+hour+'</span></div><div><div id="time'+hour+'00"></div><div id="time'+hour+'30"></div></div></div>'
        if (i == nowHour) {
            document.querySelector("#fullTime"+i).setAttribute("style", "background-color: var(--bgaccent);")
            var scrolly = document.querySelector("#fullTime"+nowHour).getBoundingClientRect().top
            document.querySelector(".timelinebox").scrollTo(0, scrolly);
        }
    }


}