const inbox = document.querySelector('.inbox')
let last_pressed

function check_boxes(a, b) {
  for (let i = a+1; i < b; i++) {
    inbox.children[i].children[0].click()
    console.log(i, inbox.children[i])
  }
}

for (let i = 0; i < inbox.children.length; i++) {
  let child = inbox.children[i].children[0]
  child.addEventListener('click', (event) => {
    if (event.shiftKey) {
      console.log("A")
      if (i === last_pressed) return
      let little = Math.min(i, last_pressed)
      let big = Math.max(i, last_pressed)
      check_boxes(little, big)
    }
    last_pressed = i
  })
}
