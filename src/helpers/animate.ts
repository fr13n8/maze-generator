
import { CELL } from '../utils/types'
import Canvas from '../components/canvas'

const drawBuldozer = (BULDOZER: CELL): void => {
    const context = Canvas.context
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

const animate = async (STACK: Array < CELL >) => {
    if (Canvas.SHOW_ANIMATE) {
        Canvas.rerender()
        for (const BULDOZER of STACK) {
            drawBuldozer(BULDOZER)
        }
        await delay(Canvas.DELAY_TIMEOUT)
    }
}

export default animate