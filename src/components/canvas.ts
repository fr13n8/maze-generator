import Settings from '../utils/state'
import * as Types from '../utils/types'

export default new class Canvas extends Settings {
    public matrix: Types.MATRIX
    public canvas: HTMLCanvasElement
    public canvasW: number
    public canvasH: number
    public context: CanvasRenderingContext2D

    constructor(){
        super()
        
        this.matrix = this.createMatrix(this.COLUMNS_COUNT, this.ROWS_COUNT)

        this.canvas = document.createElement('canvas')
        this.canvas.width = this.PADDING * 2 + this.COLUMNS_COUNT * this.CELL_SIZE
        this.canvas.height = this.PADDING * 2 + this.ROWS_COUNT * this.CELL_SIZE
        this.canvasW = this.canvas.width
        this.canvasH = this.canvas.height
        this.context = this.canvas.getContext('2d')!

        this.context.fillStyle = this.WALL_COLOR
        this.context.fillRect(0, 0, this.canvasW, this.canvasH)

        document.getElementById("canvas-container")!.appendChild(this.canvas)
    }

    public generateMaze (): void {
        for (let y = 0; y < this.COLUMNS_COUNT; y++) {
            for (let x = 0; x < this.ROWS_COUNT; x++) {
                const color: string = this.matrix[y][x] ? this.FREE_COLOR : this.WALL_COLOR
    
                this.context.beginPath()
                this.context.rect(
                    this.PADDING + x * this.CELL_SIZE,
                    this.PADDING + y * this.CELL_SIZE,
                    this.CELL_SIZE, this.CELL_SIZE)
                this.context.fillStyle = color
                this.context.fill()
            }
        }
    }

    protected createMatrix (columns: number, rows: number): Types.MATRIX {
        const matrix: Types.MATRIX = []
        for (let y = 0; y < rows; y++) {
            const row: Array < boolean > = []
            for (let x = 0; x < columns; x++) {
                row.push(false)
            }
            matrix.push(row)
        }
        matrix[0][0] = true
        return matrix
    }
}