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
        
let row = document.getElementsByClassName('interactive-row')
let categoryList = document.querySelectorAll('.category-header')

let counter = 0
let temporary = 0

fetch("./js/movies.json")
.then(content => {
    return content.json()
})
.then(data => {
    data.forEach( jsonobject => {
 
        let inter = jsonobject.interactive
        let stat = jsonobject.static
        
        if(inter){
        inter.forEach(element => {
            let urlCode = youtube.getIdFromUrl(element.Url)
        
        let title = element.Title
        let description = element.Description
        let thumbnail = youtube.generateThumbnailsUrl(urlCode)
        let index = Math.floor(counter / 3)
        counter++
        PopulateInteractiveGrid(thumbnail,title, description, index)

        });
    }
        if(stat) {
            
            stat.forEach(input => {


                let UrlId = youtube.getIdFromUrl(input.Url)
                let coverImage = youtube.generateThumbnailsUrl(UrlId)
                let category = input.Category
                
                let idx = Math.floor(temporary / 3)
                temporary++

                
                
                populateRankList(input.Id, coverImage, category , idx)
                
            })

            

        }
    
    })
})
.catch(err => {
    console.log(err)
})

async function PopulateInteractiveGrid(thumbnail,title,description, index){
    
    const thumb = await thumbnail
    const i = await index

    let interactiveElemnet = document.createElement('div')
    interactiveElemnet.classList.add('interactive-element')

    let imageContainer = document.createElement('div')
    imageContainer.classList.add('imageContainer')

    let textContent = document.createElement('div')
    textContent.classList.add('interactive-TextContent')

    let h3 = document.createElement('h3')
    let p = document.createElement('p')

    h3.textContent = title
    p.innerHTML = addNewlines(description)
    
    

    function addNewlines(str){
        let array = str.split(' ')
        let result = []
        let numberOfWords = 7
        for (let i = 0; i < array.length / numberOfWords; i++) {
            let temp = array.slice(i * numberOfWords, i * numberOfWords + numberOfWords)
            result.push(array.slice(i * numberOfWords, i * numberOfWords + numberOfWords))
           if(temp.length = numberOfWords) result.push('<br/>')
        }
        
        return [].concat.apply([], result).join(' ');

    }

    textContent.appendChild(h3)
    
    textContent.appendChild(p)

    interactiveElemnet.appendChild(textContent)
    interactiveElemnet.appendChild(imageContainer)
    
    imageContainer.style.backgroundImage = `radial-gradient( rgba(82, 82, 100, 0.1), rgba(0, 0, 0, 0.5)), url('${thumb}')`;

    interactiveElemnet.addEventListener('click', () => {
        let validUrl = title.replace(':', '')
        location.href= `${validUrl}.html`
    })
    row[i].appendChild(interactiveElemnet)
}



let currentChild = 1
async function populateRankList(ImdbId, thumbnail, category, elementIndex){
    const index = await ImdbId
    const thumb = await thumbnail
    const ctg = await category
    const elemIndex = await elementIndex
    const categories = categoryList.innerText;
    

    currentChild++
//#lists > div > ul:nth-child(1) > li:nth-child(2)
    if(categoryList[elementIndex].innerText == ctg) {
        //if movie category matches existing categories
        
        
        if(currentChild === 5){
            currentChild = 2
        }
        let currentParent = 1 + elementIndex
        let currentSelected = document.querySelector(`#lists > div > ul:nth-child(${currentParent}) > li:nth-child(${currentChild})`)
        
        currentSelected.style.backgroundImage = `url(${thumb})`

        currentSelected.addEventListener('click', () => {
            location.href= `https://www.imdb.com/title/${index}/?ref_=ttls_li_i`
        });


    }
    else
    {
        for(let e = 0; e < 4; e++){

            if(categoryList[e].innerText.match(ctg)) {
                //if category was out of order add objext to the corresponding category
            }
            else{
                //invalid category
                console.log(`Error!  ${ctg} is not a category name at ${index}!`)
            }    
        }
    }
    
}
