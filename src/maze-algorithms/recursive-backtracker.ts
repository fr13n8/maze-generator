import { CELL, MATRIX } from '../utils/types'
import Canvas from '../components/canvas'
import { rand } from '../helpers/random'
import animate from '../helpers/animate'
// import {rerender} from '../helpers/rerender'

export const recursiveGenerator = (matrix: MATRIX): void => {
    const stack: Array < CELL > = [{
        x: 0,
        y: 0
    }]
    const recursiveGenerate = async (nextCell: CELL) => {
        console.log([...stack])
        if (stack.length === 0) {
            Canvas.rerender()
            return
        }
        await animate(stack)
        
        const directions: Array < CELL > = []
        if (nextCell.x > 0) directions.push({
            x: -2,
            y: 0
        })
        if (nextCell.x < Canvas.COLUMNS_COUNT - 1) directions.push({
            x: 2,
            y: 0
        })
        if (nextCell.y > 0) directions.push({
            x: 0,
            y: -2
        })
        if (nextCell.y < Canvas.ROWS_COUNT - 1) directions.push({
            x: 0,
            y: 2
        })
    
        const dirs: Array < CELL > = directions.filter(({
            x,
            y
        }: CELL) => {
            return !matrix[nextCell.y + y][nextCell.x + x]
        })
        if (dirs.length > 0) {
            const {
                x,
                y
            }: CELL = rand(dirs)
            nextCell.x += x
            nextCell.y += y
            matrix[nextCell.y][nextCell.x] = true
            matrix[nextCell.y - y / 2][nextCell.x - x / 2] = true
            stack.push({
                x: nextCell.x - x / 2,
                y: nextCell.y - y / 2
            })
            stack.push({
                x: nextCell.x,
                y: nextCell.y
            })
            // debugger
            console.log(nextCell, {x, y})
            recursiveGenerate({...nextCell})
        } else {
            stack.splice(-2)
            recursiveGenerate({...stack[stack.length - 1]})
        }
    }
    recursiveGenerate({x: 0, y: 0})
}