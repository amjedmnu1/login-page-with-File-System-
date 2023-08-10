
let random=Math.floor(Math.random()*10)

function changeImage(n){
    document.body.style.backgroundImage = `url(image/${n}.jpg)`
}
changeImage(random)


