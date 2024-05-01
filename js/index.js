var LANG
if (LANGUAGE == 'ko-KR') {
    LANG = koKR
} else {
    LANG = koKR // Default Language
}

const weekArray = ['일', '월', '화', '수', '목', '금', '토']
const stackedit = new Stackedit();
var MISSKEYID = localStorage.getItem('misskeyId')

const token = localStorage.getItem("token")
const signedusername = localStorage.getItem("username")
const sessionId = localStorage.getItem("sessionId")
var jsonPageId = localStorage.getItem("jsonPageId")

var cssRoot = document.querySelector(':root');
cssRoot.style.setProperty('--accent', THEMECOLOR)
cssRoot.style.setProperty('--darkaccent', 'color-mix(in srgb, var(--accent) 70%, #470046)')
cssRoot.style.setProperty('--lightaccent', 'color-mix(in srgb, var(--accent) 70%, #fdffe0)')
cssRoot.style.setProperty('--opacityaccent', 'color-mix(in srgb, var(--accent), transparent 40%)')
cssRoot.style.setProperty('--bgaccent', 'color-mix(in srgb, var(--accent), transparent 20%)')

document.querySelector('#infonav').innerHTML += '<span>'+ LANG.INFO +'</span>'
document.querySelector('#refernav').innerHTML += '<span>'+ LANG.REFERENCE +'</span>'
document.querySelector('#collectionnav').innerHTML += '<span>'+ LANG.COLLECTION +'</span>'

var background = document.querySelector('#background');
background.style.backgroundImage = 'url('+BACKIMGURL+')'

var isLogin = false;
if (sessionId) {
    isLogin = true;
    if (location.href.includes('?')) {
        document.querySelector('.nav-box').innerHTML += '<div class="nav-list"><a href="'+location.href+'&mode=edit"><i class="bx bx-edit" ></i><span>'+LANG.EDIT+'</span></a></div>'
    } else {
        document.querySelector('.nav-box').innerHTML += '<div class="nav-list"><a href="./?mode=edit"><i class="bx bx-edit" ></i><span>'+LANG.EDIT+'</span></a></div>'
    }
}

var plannerjson
if (localStorage.getItem('plannerjson')) plannerjson = JSON.parse(localStorage.getItem('plannerjson'))
if (!plannerjson) plannerjson = example

document.querySelector("#title").innerHTML = '<a href="./">'+plannerjson.info.title+'</a>'
document.querySelector("#subtitle").innerHTML = plannerjson.info.subTitle

function getQueryStringObject() {
    var a = window.location.search.substr(1).split('&');
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i) {
        var p = a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
}

var qs = getQueryStringObject()
var page = qs.page
var year = qs.year
var category = qs.category
var note = qs.note
var mode = qs.mode
var qid = 0
var workqid = 0
var draftqid = 0
