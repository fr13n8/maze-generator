import { CELL, MOUSE, MATRIX } from '../utils/types'
import animate from '../helpers/animate'
import Canvas from '../components/canvas'
import {moveBuldozer, isComlpeted} from '../maze-algorithms/oldos-broder'
import {recursiveGenerator} from "../maze-algorithms/recursive-backtracker"
import {breadtFirstSearch} from '../path-algorithms/breadth-first-search'

const BULDOZERS: Array < CELL > = []

let cell1: CELL = null!
let cell2: CELL = null!

const createMouse = (element: HTMLCanvasElement) => {
    const mouse: MOUSE = {
        x: 0,
        y: 0,
        left: false,
        pLeft: false,
        over: false,

        update(): void {
            this.pLeft = this.left
        }
    }

    const mouseenterHandler = (): void => {
        mouse.over = true
    }
    const mouseleaveHandler = (): void => {
        mouse.over = false
    }
    const mousemoveHandler = (event: MouseEvent): void => {
        const rect: DOMRect = element.getBoundingClientRect()
        mouse.x = event.clientX - rect.left
        mouse.y = event.clientY - rect.top
    }
    const mousedownHandler = (): void => {
        mouse.left = true
    }
    const mouseupHandler = (): void => {
        mouse.left = false
    }

    element.addEventListener('mouseenter', mouseenterHandler)
    element.addEventListener('mouseleave', mouseleaveHandler)
    element.addEventListener('mousemove', mousemoveHandler)
    element.addEventListener('mousedown', mousedownHandler)
    element.addEventListener('mouseup', mouseupHandler)

    return mouse
}

const mouse: MOUSE = createMouse(Canvas.canvas)

const tick = async () => {
    requestAnimationFrame(tick)

    if (
        mouse.x < Canvas.CELL_SIZE ||
        mouse.y < Canvas.CELL_SIZE ||
        mouse.x > Canvas.canvasW - Canvas.CELL_SIZE ||
        mouse.y > Canvas.canvasH - Canvas.CELL_SIZE
    ) {
        return
    }

    const x: number = Math.floor((mouse.x - Canvas.CELL_SIZE) / Canvas.CELL_SIZE)
    const y: number = Math.floor((mouse.y - Canvas.CELL_SIZE) / Canvas.CELL_SIZE)

    if (mouse.left && !mouse.pLeft && Canvas.matrix[y][x]) {
        if (!cell1 || cell1.x != x || cell1.y != y) {
            cell2 = cell1
            cell1 = {
                x,
                y
            }

            Canvas.context.beginPath()
            Canvas.context.rect(
                Canvas.CELL_SIZE + x * Canvas.CELL_SIZE,
                Canvas.CELL_SIZE + y * Canvas.CELL_SIZE,
                Canvas.CELL_SIZE, Canvas.CELL_SIZE)
            Canvas.context.fillStyle = "rgba(200,10,0, 0.5)"
            Canvas.context.fill()
        }

        if (cell1 && cell2) {
            switch (Canvas.pathAlgorithm) {
                case 0:
                    await breadtFirstSearch(Canvas.matrix, cell1, cell2)
                    break
            
                default:
                    Canvas.rerender()
                    cell1 = null
                    cell2 = null
                    alert("Please choose searach path algorithm")
                    break
            }
        }

        // if (paths) {
        //     for (let y = 0; y < paths.length; y++) {
        //         paths[y].map((item: boolean | null | number, x: number) => {
        //             if (item !== null && item !== false) {
        //                 Canvas.context.fillStyle = "black"
        //                 Canvas.context.font = "12px serif"
        //                 Canvas.context.textAlign = "center"
        //                 Canvas.context.textBaseline = "middle"
        //                 Canvas.context.fillText(
        //                     paths[y][x].toString(),
        //                     Canvas.PADDING + x * Canvas.CELL_SIZE + Canvas.CELL_SIZE * 0.5,
        //                     Canvas.PADDING + y * Canvas.CELL_SIZE + Canvas.CELL_SIZE * 0.5
        //                 )
        //             }
        //         })
        //     }
        // }

        
        // route.map(async ({
        //     x,
        //     y
        // }: CELL) => {
        //     Canvas.context.beginPath()
        //     Canvas.context.rect(
        //         Canvas.PADDING + x * Canvas.CELL_SIZE,
        //         Canvas.PADDING + y * Canvas.CELL_SIZE,
        //         Canvas.CELL_SIZE, Canvas.CELL_SIZE)
        //     Canvas.context.fillStyle = "rgba(80,100,120, 0.5)"
        //     Canvas.context.fill()
        // })
    }

    mouse.update()
}

export const main = async () => {
    for (let i = 0; i < Canvas.BULDOZER_COUNTS; i++) {
        BULDOZERS.push({
            x: 0,
            y: 0
        })
    }
    switch (Canvas.mazeAlgorithm) {
        case 0:
            while (!isComlpeted()) {
                for (const BULDOZER of BULDOZERS) {
                    moveBuldozer(BULDOZER)
                }
                await animate(BULDOZERS)
            }
            break
    
        case 1:
            for (const BULDOZER of BULDOZERS) {
                recursiveGenerator(Canvas.matrix, BULDOZER)
            }
            break
        default:
            alert("Choose algorithm")
            return
    }
    Canvas.rerender()
    requestAnimationFrame(tick)
}