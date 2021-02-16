import Canvas from '../components/canvas'

export const rerender = (): void => {
    for (let y = 0; y < Canvas.COLUMNS_COUNT; y++) {
        for (let x = 0; x < Canvas.ROWS_COUNT; x++) {
            const color: string = Canvas.matrix[y][x] ? Canvas.FREE_COLOR : Canvas.WALL_COLOR

            Canvas.context.beginPath()
            Canvas.context.rect(
                Canvas.PADDING + x * Canvas.CELL_SIZE,
                Canvas.PADDING + y * Canvas.CELL_SIZE,
                Canvas.CELL_SIZE, Canvas.CELL_SIZE)
            Canvas.context.fillStyle = color
            Canvas.context.fill()
        }
    }
}