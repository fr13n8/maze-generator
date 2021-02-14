import 'bootstrap'
import './scss/app.scss'

import'./modules/color-picker'
import'./modules/control-panel'

import {main} from './generator/maze-generator'

const genButton = document.getElementById("generate")! as HTMLButtonElement
const genButtonClickHandler = (): void => {
    main()
}
genButton.addEventListener("click", genButtonClickHandler)