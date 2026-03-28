
//upload hover
const load = document.getElementById('load')
const upload = document.querySelector('.upload')

let showId
load.addEventListener('mouseenter', () => {
  upload.style.display = 'block'
})

load.addEventListener('mouseleave', () => {
  showId = setTimeout(() => upload.style.display = 'none', 500)
})

upload.addEventListener('mouseenter', () => {
  if (showId) {
    clearTimeout(showId)
  }
  upload.style.display = 'block'
})

upload.addEventListener('mouseleave', () => {
  upload.style.display = 'none'
})

//clint hover
const client = document.getElementById('client')
const client_hover = document.querySelector('.clientDropdown')

let client_showId

client.addEventListener('mouseenter', () => {
  client_hover.style.display = 'block'
})

client.addEventListener('mouseleave', () => {
  client_showId = setTimeout(() => client_hover.style.display = 'none', 500)
})

client_hover.addEventListener('mouseenter', () => {
  if (client_showId) {
    clearTimeout(client_showId)
  }
  client_hover.style.display = 'block'
})

client_hover.addEventListener('mouseleave', () => {
  client_hover.style.display = 'none'
})



function mouseenter(svgid){
  let path = document.getElementById(svgid).getElementsByTagName('path')
  for(let i=0;i<path.length;i++){
    path[i].setAttribute('fill', '#f19308') 
  }
}
function mouseleave(svgid){
  let path = document.getElementById(svgid).getElementsByTagName('path')
  for(let i=0;i<path.length;i++){
    path[i].setAttribute('fill', '#dbdbdb')
  }
}

function span_mouseenter(liid){
  let tit = document.getElementById(liid).getElementsByClassName('tit')[0]
  tit.style.color = '#f19308'
}
function span_mouseleave(liid){
  let tit = document.getElementById(liid).getElementsByClassName('tit')[0]
  tit.style.color = '#72727b'
}
function change_mouseenter(svgid){
  let path = document.getElementById(svgid).getElementsByTagName('path')
  for(let i=0;i<path.length;i++){
    path[i].setAttribute('fill', '#f19308') 
  }
}
function change_mouseleave(svgid){
  let path = document.getElementById(svgid).getElementsByTagName('path') 
  for(let i=0;i<path.length;i++){
    path[i].setAttribute('fill', '#2c2c2c')
  }
}


const navLinks = document.querySelectorAll('.nav-item');
const slider = document.querySelector('.slider');
const nav = document.querySelector('.nav');

// 设置默认滑块位置
function setDefaultSliderPosition() {
    const firstLink = navLinks[0];
    const navRect = nav.getBoundingClientRect();
    const linkRect = firstLink.getBoundingClientRect();
    const left = ((linkRect.left - navRect.left) / navRect.width) * 100;
    const width = (linkRect.width / navRect.width) * 100;
    slider.style.left = `${left}%`;
    slider.style.width = `${width}%`;
}
function slider_mouseleave(){
  setDefaultSliderPosition();
}

// 鼠标悬浮时移动滑块
navLinks.forEach(link => {
    link.addEventListener('mouseover', () => {
        const navRect = nav.getBoundingClientRect();
        const linkRect = link.getBoundingClientRect();
        const left = ((linkRect.left - navRect.left) / navRect.width) * 100;
        const width = (linkRect.width / navRect.width) * 100;
        slider.style.left = `${left}%`;
        slider.style.width = `${width}%`;
    });
});

// 页面加载时设置默认位置
window.addEventListener('load', setDefaultSliderPosition);

// 窗口大小改变时重新设置滑块位置
window.addEventListener('resize', setDefaultSliderPosition);

//保存当前状态不变
let currentType = localStorage.getItem("currentType")

// 页面加载时执行的函数
const loadPage = async () => {
  loadGuesslike()
  if(currentType == null || currentType == undefined || currentType == ""){
    currentType = "toutuoyuan"
  }
  loadYoushengshu(currentType)
  loadranking("ranking")
}

const loadGuesslike = async () => {
  loadData("guesslike").then((data)=>{
    console.log(data)
    exaggerateGuesslike(data)
  })
}

const loadYoushengshu = async (type) => {
  currentType = type
  localStorage.setItem("currentType",currentType)
  loadData("audiobook").then((data)=>{
    exaggerateYoushengshu(data[type])
  })
}

const loadranking = async () => {
  loadData("ranking").then((data)=>{
    console.log(data)
    exaggerateRanking(data)
  }) 
}
//点击换一批更换
let max = 5
let min = 0
function huanyipi(){
  if(max == 10){
    max = 5
    min = 0 
  } else {
    max = max + 5
    min = min + 5 
  }
  loadGuesslike()
}

const exaggerateGuesslike = (data)=>{
  const guesslikeul = document.getElementById("guesslikeul")
  guesslikeul.innerHTML = ""
  for (let index = 0; index < data.length; index++) {
    let audioPath = data[index].audio
    data[index].audio = "http://localhost:3000"+audioPath.replace(".mpg",".mp3")
  }
  
  for (let index = min; index < max; index++) {
    const element = data[index];
    let li = document.createElement("li")
    const listen_count = element.times / 100000;
    li.onclick = function(){
      audioContainer.innerHTML = "<audio src='"+element.audio+"' controls autoplay loop></audio"
    }
    if(element.vip==0){
          li.innerHTML = `<a href="#" class="album-item">`+
                            `<div class="album-item-box">`+
                                `<img class="img" src="${element.img}" alt="" />`+
                                `<p class="listen-count _hW"><span class="_hW"><img src="./image/headphones.png" class = "listen-count-img">${listen_count.toFixed(1)}万</span></p>`+
                            `</div>`+
                            `<p class="album-item-tit">${element.title}</p>`+
                            `<p class="album-item-aut">${element.author}</p>`+
                            `</a>`
    }else{
      li.innerHTML = `<a href="#" class="album-item">`+
      `<div class="album-item-box">`+
          `<img class="img" src="${element.img}" alt="" />`+
          `<p class="listen-count _hW"><span class="_hW"><img src="./image/headphones.png" class = "listen-count-img">${listen_count.toFixed(1)}万</span></p>`+
          `<img src="./image/vip.png" class = "corner-img _hW">`+
      `</div>`+
      `<p class="album-item-tit">${element.title}</p>`+
      `<p class="album-item-aut">${element.author}</p>`+
      `</a>`
    }

    guesslikeul.appendChild(li)
  }
}

const exaggerateYoushengshu = (data)=>{
  const youshengshuul = document.getElementById("youshengshuul")

  youshengshuul.innerHTML = ""
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    let li = document.createElement("li")
    const listen_count = element.times / 100000;
    if(element.vip==0){
          li.innerHTML = `<a href="#" class="album-item">`+
                            `<div class="album-item-box">`+
                                `<img class="img" src="${element.img}" alt="" />`+
                                `<p class="listen-count _hW"><span class="_hW"><i class="icon-earphone xuicon xuicon-erji _hW"><img src="./image/headphones.png" class = "listen-count-img"></i>${listen_count.toFixed(1)}万</span></p>`+
                            `</div>`+
                            `<p class="album-item-tit">${element.text}</p>`+
                            `<p class="album-item-aut">${element.author}</p>`+
                            `</a>`
    }else{
      li.innerHTML = `<a href="#" class="album-item">`+
      `<div class="album-item-box">`+
          `<img class="img" src="${element.img}" alt="" />`+
          `<p class="listen-count _hW"><span class="_hW"><i class="icon-earphone xuicon xuicon-erji _hW"><img src="./image/headphones.png" class = "listen-count-img"></i>${listen_count.toFixed(1)}万</span></p>`+
          `<img src="./image/vip.png" class = "corner-img _hW">`+
      `</div>`+
      `<p class="album-item-tit">${element.text}</p>`+
      `<p class="album-item-aut">${element.author}</p>`+
      `</a>`
    }

    youshengshuul.appendChild(li)
  }
}

const exaggerateRanking = (data)=>{
  const rankingul = document.getElementById("rankingul")

  rankingul.innerHTML = ""
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    let li = document.createElement("li")
    if(element.img != null){
    li.innerHTML = `<a href="#" class="list-items">
      <div class="list-items-img">
        <img class="img" src="${element.img}" alt="" />
      </div>
      <div class="list-items-txt">
        <div class="list-items-tit">${element.desc}</div>
        <div class="list-items-aut">${element.author}</div>
      </div>
    </a>`
    rankingul.appendChild(li)
    }
    else{
        li.innerHTML = `<a href="#" class="list-items">
        <div class="list-items-text">
          <div class="list-items-tit"><span class="num">${index+1}</span>${element.desc}</div>
        </div>
      </a>`;
        rankingul.appendChild(li)
      }
    }

  }


const loadData = async (tag) => {
  const response = await fetch("http://localhost:3000/api?tag="+tag,{method: "get"})
  const result = await response.json()
  return result.data
}

loadPage()
