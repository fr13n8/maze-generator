const COLUMNS_COUNT = 31
const ROWS_COUNT = 31
const PADDING = 20
const CELL_SIZE = 20
const WALL_COLOR = 'black'
const FREE_COLOR = 'white'
let BULDOZER_COLOR = 'green'
const DELAY_TIMEOUT = 0
const SHOW_ANIMATE = true
let BULDOZER_COUNTS = 1
let ALGORITHM: number

const changeAlgorithm = (type: number): void => {
    ALGORITHM = type
}

const changeColor = (color: string): void => {
    BULDOZER_COLOR = color
}

const setBuldozersCount = (count: number): void => {
    BULDOZER_COUNTS = count
}

export {
    COLUMNS_COUNT,
    ROWS_COUNT,
    PADDING,
    CELL_SIZE,
    WALL_COLOR,
    FREE_COLOR,
    BULDOZER_COUNTS,
    BULDOZER_COLOR,
    DELAY_TIMEOUT,
    SHOW_ANIMATE,
    ALGORITHM,
    changeAlgorithm,
    changeColor,
    setBuldozersCount
}