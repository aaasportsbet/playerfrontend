const baseSize=54
function setRem(){
  const scale=document.documentElement.clientWidth / 1080
  document.documentElement.style.fontSize=(baseSize * Math.min(scale,2)) + 'px'
}
setRem()
window.onresize = function(){
  setRem
}
