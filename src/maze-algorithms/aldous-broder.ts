import {CELL} from '../utils/types'
import Canvas from '../components/canvas'
import {rand} from '../helpers/random'

export const isComlpeted = (): boolean => {
    for (let y = 0; y < Canvas.ROWS_COUNT; y += 2) {
        for (let x = 0; x < Canvas.COLUMNS_COUNT; x += 2) {
            if (!Canvas.matrix[y][x]) return false
        }
    }
    return true
}

export const moveBuldozer = (BULDOZER: CELL): void => {
    const directions: Array < CELL > = []

    if (BULDOZER.x > 0) directions.push({
        x: -2,
        y: 0
    })
    if (BULDOZER.x < Canvas.COLUMNS_COUNT - 1) directions.push({
        x: 2,
        y: 0
    })
    if (BULDOZER.y > 0) directions.push({
        x: 0,
        y: -2
    })
    if (BULDOZER.y < Canvas.ROWS_COUNT - 1) directions.push({
        x: 0,
        y: 2
    })

    const {
        x,
        y
    }: CELL = rand(directions)

    BULDOZER.x += x
    BULDOZER.y += y

    if (!Canvas.matrix[BULDOZER.y][BULDOZER.x]) {
        Canvas.matrix[BULDOZER.y][BULDOZER.x] = true
        Canvas.matrix[BULDOZER.y - y / 2][BULDOZER.x - x / 2] = true
    }
}