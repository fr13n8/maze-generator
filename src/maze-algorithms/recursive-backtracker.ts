import { CELL, MATRIX } from '../utils/types'
import Canvas from '../components/canvas'
import { rand } from '../helpers/random'
import animate from '../helpers/animate'

export const recursiveGenerator = (matrix: MATRIX, BULDOZER: CELL) => {
    const stack: Array < CELL > = [{
        x: 0,
        y: 0
    }]
    const recursiveGenerate = async (BULDOZER: CELL) => {
        await animate(Canvas.SHOW_ANIMATE, stack,   Canvas.context)
        if (stack.length === 0) return
    
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
    
        const dirs: Array < CELL > = directions.filter(({
            x,
            y
        }: CELL) => {
            return !matrix[BULDOZER.y + y][BULDOZER.x + x]
        })
        if (dirs.length > 0) {
            const {
                x,
                y
            }: CELL = rand(dirs)
            BULDOZER.x += x
            BULDOZER.y += y
            matrix[BULDOZER.y][BULDOZER.x] = true
            matrix[BULDOZER.y - y / 2][BULDOZER.x - x / 2] = true
            stack.push({
                x: BULDOZER.x - x / 2,
                y: BULDOZER.y - y / 2
            })
            stack.push({
                x: BULDOZER.x,
                y: BULDOZER.y
            })
            recursiveGenerate(BULDOZER)
        } else {
            stack.splice(stack.length - 2, stack.length)
            recursiveGenerate(stack[stack.length - 1])
        }
    }
    recursiveGenerate(stack[0])
}