let btn = document.getElementById(`play`);
let song = document.getElementById(`song`);
let progress = document.getElementById(`progress`);
let theme = document.querySelector(`.img-theme img`);
let background = document.querySelector(`.background img`);
let next = document.getElementById(`next`);
let prev = document.getElementById(`prev`);
let slider = document.querySelector(`.slider-playlist`);
let menu = document.getElementById(`menu`);
let up = document.querySelector(`.up-arrow`);
let back = document.getElementById(`back`);
let counter2 = document.getElementById(`counter1`);
let counter1 = document.getElementById(`counter2`);
let songname = document.querySelector(`.title h3`);
let singer = document.querySelector(`.title h4`);
let icon = document.querySelector(`#play i`)

let index = 1;
let play = true;

btn.addEventListener("click",()=>[
  songplay()
])

function songplay(){
    if(play === true){
      icon.classList.remove("fa-play");
      icon.classList.add("fa-pause");
        song.play();
        play = false;
    }else{
      icon.classList.add("fa-play");
      icon.classList.remove("fa-pause");
        song.pause();
        play = true;
    }
}

song.addEventListener("loadedmetadata",()=>{
    progress.max = song.duration
    progress.value = song.currentTime;
})

window.addEventListener("load",()=>{
     loader();
     list();
})

function loader(){
    theme.src = allmusic[index-1].img;
    song.src = allmusic[index-1].song;
    background.src = allmusic[index-1].img;
    songname.innerHTML = allmusic[index-1].name;
    singer.innerHTML = allmusic[index-1].singer;

    setInterval(() => {
     progress.value = song.currentTime;

     let min = Math.floor(song.duration / 60);
     let sec = Math.floor(song.duration % 60);
     let strmin = Math.floor(song.currentTime / 60);
     let strsec = Math.floor(song.currentTime % 60);
     if(strsec < 10){
       counter2.innerText = strmin+":"+"0"+strsec;
     }else{
       counter2.innerText = strmin+":"+strsec;
     }
     if(sec < 10){
       counter1.innerText = min+":"+"0"+sec;
     }else{
       counter1.innerText = min+":"+sec;
     }
   }, 500);

}

song.addEventListener("ended",()=>{
  index++
  loader(index);
  song.play()
  play = false;
 })

progress.addEventListener ('click',()=>{
    song.currentTime = progress.value;
    song.play();
    play = false;
    icon.classList.remove("fa-play");
    icon.classList.add("fa-pause");
  })

  next.addEventListener("click",()=>{
    index++;
   if(index > allmusic.length){
      index = 1;
   }else{
    index = index;
   }
   loader(index);
    song.play();
    play = false;
    icon.classList.remove("fa-play");
    icon.classList.add("fa-pause");
  })

  prev.addEventListener("click",()=>{
    index--;
    if(index <= 0){
      index = allmusic.length;
    }else{
      index = index;
    }
    loader(index);
    song.play();
    play = false;
    icon.classList.remove("fa-play");
    icon.classList.add("fa-pause");
  })
  
  
  back.addEventListener("click",()=>{
    index = 1;
    song.pause();
    play = true;
    theme.src = allmusic[index-1].img;
    song.src = allmusic[index-1].song;
    background.src = allmusic[index-1].img;
    songname.innerHTML = allmusic[index-1].name;
    singer.innerHTML = allmusic[index-1].singer;
    slider.classList.remove("slider-cut");
    icon.classList.add("fa-play");
    icon.classList.remove("fa-pause");
    })
  up.addEventListener("click",()=>{
    slider.classList.toggle("slider-cut");
  })
  
  menu.addEventListener("click",()=>{
       slider.classList.toggle("slider-cut");
  })

  function list(){
    allmusic.forEach((item,i) => {
     
      let li = document.createElement(`li`);
      let img = document.createElement(`img`);
      let h3 = document.createElement(`h3`);
      let p = document.createElement(`p`);
      let h4 = document.createElement(`h4`)

      img.src = item.img
      h3.innerHTML = item.name;
      p.innerHTML = item.singer;
      h4.innerText = item.time
      
      slider.appendChild(li);
      li.appendChild(img);
      li.appendChild(h3);
      li.appendChild(h4);
      h3.appendChild(p);
      
      li.addEventListener("click",()=>{
        index = i;
        song.src = allmusic[index].song;
        theme.src = allmusic[index].img;
        background.src = allmusic[index].img;
        songname.innerHTML = allmusic[index].name;
        singer.innerHTML = allmusic[index].singer;
        song.play();
        play = false;
        icon.classList.remove("fa-play");
        icon.classList.add("fa-pause");
    });
   
    });

  }