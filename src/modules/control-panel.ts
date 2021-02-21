import Canvas from '../components/canvas'

// Set count of creators
// const getBuldozersCount = document.getElementById("buldozers-count")! as HTMLInputElement
// const buldozersCountHandler = (): void => {
//     Canvas.setBuldozersCount(+getBuldozersCount.value)
// }
// getBuldozersCount.addEventListener("keyup", buldozersCountHandler)

// Choose Maze algorithm
const chooseMazeAlgorithm = document.querySelector("select[id=choose-maze-algorithm]")! as HTMLSelectElement
const selectMazeChangeHandler = (): void => {
    // getBuldozersCount.disabled = !!+chooseMazeAlgorithm.value
    Canvas.mazeAlgorithm = (+chooseMazeAlgorithm.value)
}
chooseMazeAlgorithm.addEventListener('change', selectMazeChangeHandler)

// Choose Path algorithm
const choosePathAlgorithm = document.querySelector("select[id=choose-path-algorithm]")! as HTMLSelectElement
const selectPathChangeHandler = (): void => {
    Canvas.pathAlgorithm = (+choosePathAlgorithm.value)
}
choosePathAlgorithm.addEventListener('change', selectPathChangeHandler)

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

const clearButton = document.getElementById("clear")! as HTMLButtonElement
const clearButtonClickHandler = (): void => {
    Canvas.clearALlCanvas()
}
clearButton.addEventListener("click", clearButtonClickHandler)