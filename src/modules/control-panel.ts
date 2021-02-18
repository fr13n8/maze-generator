import Canvas from '../components/canvas'

// Choose algorithm
const chooseAlgorithm = document.querySelector("select[id=choose-algorithm]")! as HTMLSelectElement
const selectChangeHandler = (): void => {
    Canvas.algorithm = (+chooseAlgorithm.value)
}
chooseAlgorithm.addEventListener('change', selectChangeHandler)

// Set count of creators
const getBuldozersCount = document.getElementById("buldozers-count")! as HTMLInputElement
const buldozersCountHandler = (): void => {
    Canvas.setBuldozersCount(+getBuldozersCount.value)
}
getBuldozersCount.addEventListener("keyup", buldozersCountHandler)

// Switch show animation
const showAnimation = document.getElementById('show-animate')! as HTMLInputElement
const showAnimationSwitch = (): void => {
    Canvas.setShowAnimation(showAnimation.checked)
}
showAnimation.addEventListener('change', showAnimationSwitch)

// Animation speed
const animationDelay = document.getElementById('animation-delay')! as HTMLInputElement
const changeAnimationDelay = (): void => {
    Canvas.setAnimationDelay(+animationDelay.value)
}
animationDelay.addEventListener('change', changeAnimationDelay)