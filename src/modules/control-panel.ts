import {changeAlgorithm, setBuldozersCount} from '../utils/state'

// Choose algorithm
const chooseAlgorithm = document.querySelector("select[id=choose-algorithm]")! as HTMLSelectElement
const selectChangeHandler = (): void => {
    changeAlgorithm(+chooseAlgorithm.value)
}
chooseAlgorithm.addEventListener('change', selectChangeHandler)

const getBuldozersCount = document.getElementById("buldozers-count")! as HTMLInputElement
const buldozersCountHandler = (): void => {
    setBuldozersCount(+getBuldozersCount.value)
}
getBuldozersCount.addEventListener("keyup", buldozersCountHandler)