let saturate = document.getElementById('saturate');
let contrast = document.getElementById('contrast');
let brightness = document.getElementById('brightness');
let sepia = document.getElementById('sepia');
let grayScale = document.getElementById('grayscale');
let blur = document.getElementById('blur');
let hue = document.getElementById('huerotate');

let upload = document.getElementById('upload')
let img = document.getElementById('img');

let download = document.getElementById('download')
let reset = document.getElementById('reset');

let canvas = document.getElementById('canvas');
const gtx = canvas.getContext('2d');
function resetValue(){
    gtx.filter = 'none';
    saturate.value = '100';
    contrast.value = '100';
    brightness.value = '100';
    sepia.value = '0';
    grayScale.value = '0';
    blur.value = '0';
    hue.value = '0';
    gtx.drawImage(img,0,0,canvas.width,canvas.height)

}

window.onload = function(){
    
    download.style.display = 'none';
    reset.style.display = 'none';
    img.style.display = 'none';
}
upload.onchange = function(){
    download.style.display = 'block';
    reset.style.display = 'block';
    img.style.display = 'block';
    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
    file.onload = function(){
        img.src = file.result;
        resetValue()
    }
    img.onload = function(){
        canvas.width = img.width;
        canvas.height = img.height;
        gtx.drawImage(img,0,0,canvas.width,canvas.height)
        img.style.display = 'none';
    }
}

let filters = document.querySelectorAll('.settings div input');

filters.forEach(filter  => {
    filter.addEventListener('input',function(){
        gtx.filter = `
            saturate(${saturate.value}%)
            contrast(${contrast.value}%)
            brightness(${brightness.value}%)
            sepia(${sepia.value}%)
            grayscale(${grayScale.value})
            blur(${blur.value}px)
            hue-rotate(${hue.value}deg)
            `
            gtx.drawImage(img,0,0,canvas.width,canvas.height)
    })
})

download.onclick = function(){
    download.href = canvas.toDataURL('');
}