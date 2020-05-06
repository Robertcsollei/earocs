
let youtube = {

    getIdFromUrl: (videoUrlOrId) => {

        if(videoUrlOrId.indexOf('http') === 0) return videoUrlOrId.split('v=')[1]
        return videoUrlOrId
    },

    generateThumbnailsUrl: (videoUrlOrId) => {
        return `https://img.youtube.com/vi/${videoUrlOrId}/hqdefault.jpg`
    },

    getVideoEmbed: (videoUrlOrId) => {
        return `https://youtube.com/embed/${videoUrlOrId}`

    }
}
let PageTitle = document.querySelector('title')

PageTitle.textContent = ''

let canvas = document.getElementById('canvas')
let modal = document.getElementsByClassName('sideOf')
let button = document.getElementsByClassName('playButton').item(0)
let videoFrame = document.getElementById('videoPlayer')
let holder = document.getElementById('videoHolder')
let movieTitle = document.getElementById('MovieTitle')
let movieDesc = document.getElementById('MovieDesc')
let close = document.getElementById('close')
let meta = document.querySelector('[name="id"]')
let imdbRating = document.getElementById('movieRating')

console.log(meta)

let CurrentPage = ''
let CurrentDescription = ''
let target = modal.item(0);
hidden = false




fetch("./js/movies.json")
.then(content => {
    return content.json()
})
.then(data => {
    data.forEach( jsonobject => { 
        let interactive = jsonobject.interactive
        if(interactive) {
            
            interactive.forEach(input => {

                let urlmine = youtube.getIdFromUrl(input.Url)
                let video = youtube.getVideoEmbed(urlmine) + '?autoplay=1&mute=1&enablejsapi=1'



                var path = window.location.pathname;
                var page = path.split("/").pop();
                page = page.replace(/%20/g, ' ')
                
                if(page.indexOf(' ') >= 0){
                    let special = page.split(' ')
                    if(special[0] == "Star" && special[1] == 'Wars'){
                        
                        special.splice(1, 1, `${special[1]}:`)
                        console.log(special)
                       page = special.join(' ')
                    }
                }
                
                console.log(input.Title, page.split('.')[0])
                if(input.Title == page.split('.')[0]){
                    console.log(input.Title, page.split('.')[0])
                    videoFrame.setAttribute('src', video)
                }
                let newUrl = `https://www.omdbapi.com/?i=${input.Id}&apikey=789d41d5`
                
                
                getElements(newUrl)
            })
        }
    })
})
.catch(err => {
    console.log(err)
})


function getElements(url) {

    fetch(url)
    .then(response => {
        return response.json()
    })
    .then(data => {
        
        var path = window.location.pathname;
        var page = path.split("/").pop();
        page = page.replace(/%20/g, ' ')

        if(page.indexOf(' ') >= 0){
            let special = page.split(' ')
            if(special[0] == "Star" && special[1] == 'Wars'){
                
                special.splice(1, 1, `${special[1]}:`)
                
               page = special.join(' ')
            }
        }

        if(data.Title.toUpperCase() == page.split('.')[0].toUpperCase()){
            console.log(data.Title)
            PopulateModal(data.Title, data.Plot, data.imdbRating, data.Year)
        }
        

    })
    .catch(err =>{
        const errorMessage = document.createElement('marquee')
        console.log(err)
        
    })
}


function PopulateModal(title, desc, imdbID, year) {
    movieTitle.textContent=  title
    movieDesc.textContent = CurrentDescription = desc 
    PageTitle.textContent = title 
    

    imdbRating.innerHTML = `IMDB Rating: ${imdbID} &#11088; The movie is ${new Date().getFullYear() - year} years old`
   // videoFrame.setAttribute('src', `${}?autoplay=1&mute=1&enablejsapi=1`)
    movieTitle.style.transform= 'rotate(0deg)'; 
}

    


function show(){
    target.animate([
        {width: '50%'},
        {width: '3%'}
    ], {
        easing: 'ease-in-out',
        duration: 1000
    })
    target.style.width = '3%'
   
    buttonFade()
    videoToScreen(videoFrame)
    movieTitle.style.display = 'none'
    movieDesc.style.display = 'none'
    close.style.display = 'block'

}

function showModal(){
    target.animate([
        {width: '3%'},
        {width: '50%'}
    ], {
        easing: 'ease-in-out',
        duration: 1000
    })
    target.style.width = '50%'

    

}

function buttonFade() {
    if (button.style.display === "none") {
        button.style.display = "block";
      } else {
        button.style.display = "none";
        hidden = true
      }
}

canvas.addEventListener("click", ()=> {
    if(!hidden && target.style.width != '50%' ){
        videoFrame.style.zIndex = '-2'
        canvas.appendChild(holder)
        canvas.appendChild(target)
        buttonFade()   
        showModal()
        movieTitle.style.display = 'block'
        movieDesc.style.display = 'block'
        close.style.display = 'none'
        

    }else{
        canvas.addEventListener("click", () => {
           hidden=false
           
        })
        
    }
})



function videoToScreen(videoFrame){
    //videoFrame.style.width = window.width /2
    

    videoFrame.setAttribute('width', '97%')
    holder.setAttribute('left', '3%')
    videoFrame.style.zIndex = '1';
    holder.appendChild(videoFrame)
}







