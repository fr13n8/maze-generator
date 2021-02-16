
import { CELL } from '../utils/types'
import Canvas from '../components/canvas'
import {rerender} from '../helpers/rerender'

const drawBuldozer = (BULDOZER: CELL, context: CanvasRenderingContext2D): void => {
    context.beginPath()
    context.rect(
        Canvas.PADDING + BULDOZER.x * Canvas.CELL_SIZE,
        Canvas.PADDING + BULDOZER.y * Canvas.CELL_SIZE,
        Canvas.CELL_SIZE, Canvas.CELL_SIZE)
    context.fillStyle = Canvas.BULDOZER_COLOR
    context.fill()
}

const delay = (timeout: number): Promise < void > => {
    return new Promise(resolve => setTimeout(resolve, timeout))
}

const animate = async (SHOW_ANIMATE: boolean, STACK: Array < CELL >, context: CanvasRenderingContext2D) => {
    if (SHOW_ANIMATE) {
        rerender()
        for (const BULDOZER of STACK) {
            drawBuldozer(BULDOZER, context)
        }
        await delay(Canvas.DELAY_TIMEOUT)
    }
}

export default animate