const cols = document.querySelectorAll('.col')

document.addEventListener('keydown', (event) => {
    event.preventDefault()
  if (event.code.toLowerCase() == 'space') {
    setColors()
    console.log(event.code)
  }
});

document.addEventListener('click', (event) => {
    const type = event.target.dataset.type;

    if (type == 'lock') {
        const node = event.target.tagName.toLowerCase() == 'i'
        ? event.target
        : event.target.children[0]

        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    } else if (type == 'copy') {
        copyText(event.target.textContent)
    }
})

function generateRandomColor() {
    const hexCode = '0123456789ABCDEF'
    let color = ''
    for (let i = 0; i < 6; i++){
        color += hexCode[Math.floor(Math.random() * hexCode.length)]
    }
    return '#' + color    
}

function copyText(text) {
  return  navigator.clipboard.writeText(text)
}

function setColors(isInit) {
    const colors = isInit ? getColorsFromHash() : []
    
    cols.forEach((col, index) => {
        const isLock = col.querySelector('i').classList.contains('fa-lock');
        const text = col.querySelector('h2');
        const button = col.querySelector('button');
        
        if(isLock){
            colors.push(text.textContent)
            return
        }

        const color = isInit 
        ? colors[index] 
         ? colors[index]
          : chroma.random()
        : chroma.random()

        if (!isInit){
            colors.push(color)
        }
             
        text.textContent = color;
        col.style.background = color;
        
        setTextColor(text, color)
        setTextColor(button, color)
    })

    updateLocationHash(colors)
}

function setTextColor(text, color) {
  const lumin =  chroma(color).luminance()
  text.style.color = lumin > 0.5 ? 'black' : 'white'
}

function updateLocationHash(colors = []) {
    document.location.hash = colors.map((col) =>  {
        
       return col.toString().substring(1)
    })
       .join('-')  
}

function getColorsFromHash() {
    if (document.location.hash.length > 1){
       return document.location.hash.substring(1).split('-').map(color => '#' + color)
    }
    return []
}
 
setColors(true)