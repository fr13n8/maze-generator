import { CELL, MOUSE, MATRIX } from '../utils/types'
import animate from '../helpers/animate'
import Canvas from '../components/canvas'
import {moveBuldozer} from '../maze-algorithms/oldos-broder'
import {recursiveGenerator} from "../maze-algorithms/recursive-backtracker"
import {rerender} from '../helpers/rerender'

const BULDOZERS: Array < CELL > = []

let cell1: CELL = null!
let cell2: CELL = null!
let paths: Array < Array < null | boolean | number >> = []
let route: Array < CELL > = []

// Found route 

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

const getPath = (matrix: MATRIX , {
    x: x1,
    y: y1
}: CELL, {
    x: x2,
    y: y2
}: CELL): Array < Array < null | boolean | number >> => {

    for (let y = 0; y < matrix.length; y++) {
        const row: Array < null | boolean > = matrix[y].map((cell: boolean) => cell === false ? false : null)
        paths.push(row)
    }

    paths[y2][x2] = 0

    while (paths[y1][x1] === null) {

        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[y].length; x++) {
                if (paths[y][x] === false || paths[y][x] === null) {
                    continue
                }

                const count: number = Number(paths[y][x]) + 1

                if (y > 0 && paths[y - 1][x] !== false) {
                    if (paths[y - 1][x] !== null) {
                        paths[y - 1][x] = Math.min(Number(paths[y - 1][x]), count)
                    } else {
                        paths[y - 1][x] = count
                    }
                }
                if (y < matrix.length - 1 && paths[y + 1][x] !== false) {
                    if (paths[y + 1][x] !== null) {
                        paths[y + 1][x] = Math.min(Number(paths[y + 1][x]), count)
                    } else {
                        paths[y + 1][x] = count
                    }
                }
                if (x < matrix[0].length - 1 && paths[y][x + 1] !== false) {
                    if (paths[y][x + 1] !== null) {
                        paths[y][x + 1] = Math.min(Number(paths[y][x + 1]), count)
                    } else {
                        paths[y][x + 1] = count
                    }
                }
                if (x > 0 && paths[y][x - 1] !== false) {
                    if (paths[y][x - 1] !== null) {
                        paths[y][x - 1] = Math.min(Number(paths[y][x - 1]), count)
                    } else {
                        paths[y][x - 1] = count
                    }
                }
            }
        }
    }

    // let [x2, y2]: [number, number] = [y1, x1]
    let endRouteValue = Number(paths[y1][x1])
    route = []

    while (endRouteValue !== 1) {
        endRouteValue--
        console.log(y1, x1, endRouteValue)
        if (y1 > 0 && paths[y1 - 1][x1] === endRouteValue) {
            route.push({
                y: y1 - 1,
                x: x1
            })
            y1--
            continue
        }
        if (y1 < Canvas.ROWS_COUNT - 1 && paths[y1 + 1][x1] === endRouteValue) {
            route.push({
                y: y1 + 1,
                x: x1
            })
            y1++
            continue
        }
        if (x1 < Canvas.COLUMNS_COUNT - 1 && paths[y1][x1 + 1] === endRouteValue) {
            route.push({
                y: y1,
                x: x1 + 1
            })
            x1++
            continue
        }
        if (x1 > 0 && paths[y1][x1 - 1] === endRouteValue) {
            route.push({
                y: y1,
                x: x1 - 1
            })
            x1--
            continue
        }
    }
    return paths
}

const tick = async () => {
    requestAnimationFrame(tick)

    if (
        mouse.x < Canvas.PADDING ||
        mouse.y < Canvas.PADDING ||
        mouse.x > Canvas.canvasW - Canvas.PADDING ||
        mouse.y > Canvas.canvasH - Canvas.PADDING
    ) {
        return
    }

    const x: number = Math.floor((mouse.x - Canvas.PADDING) / Canvas.CELL_SIZE)
    const y: number = Math.floor((mouse.y - Canvas.PADDING) / Canvas.CELL_SIZE)

    if (mouse.left && !mouse.pLeft && Canvas.matrix[y][x]) {
        if (!cell1 || cell1.x != x || cell1.y != y) {
            cell2 = cell1
            cell1 = {
                x,
                y
            }

            Canvas.context.beginPath()
            Canvas.context.rect(
                Canvas.PADDING + x * Canvas.CELL_SIZE,
                Canvas.PADDING + y * Canvas.CELL_SIZE,
                Canvas.CELL_SIZE, Canvas.CELL_SIZE)
            Canvas.context.fillStyle = "rgba(200,10,0, 0.5)"
            Canvas.context.fill()
        }

        if (cell1 && cell2) {
            paths = getPath(Canvas.matrix, cell1, cell2)
        }

        if (paths) {
            for (let y = 0; y < paths.length; y++) {
                paths[y].map((item: boolean | null | number, x: number) => {
                    if (item !== null && item !== false) {
                        Canvas.context.fillStyle = "black"
                        Canvas.context.font = "12px serif"
                        Canvas.context.textAlign = "center"
                        Canvas.context.textBaseline = "middle"
                        Canvas.context.fillText(
                            paths[y][x].toString(),
                            Canvas.PADDING + x * Canvas.CELL_SIZE + Canvas.CELL_SIZE * 0.5,
                            Canvas.PADDING + y * Canvas.CELL_SIZE + Canvas.CELL_SIZE * 0.5
                        )
                    }
                })
            }
        }

        route.map(({
            x,
            y
        }: CELL) => {
            Canvas.context.beginPath()
            Canvas.context.rect(
                Canvas.PADDING + x * Canvas.CELL_SIZE,
                Canvas.PADDING + y * Canvas.CELL_SIZE,
                Canvas.CELL_SIZE, Canvas.CELL_SIZE)
            Canvas.context.fillStyle = "rgba(80,100,120, 0.5)"
            Canvas.context.fill()
        })
    }

    mouse.update()
}

const isComlpeted = (): boolean => {
    for (let y = 0; y < Canvas.COLUMNS_COUNT; y += 2) {
        for (let x = 0; x < Canvas.ROWS_COUNT; x += 2) {
            if (!Canvas.matrix[y][x]) return false
        }
    }
    return true
}

export const main = async () => {
    for (let i = 0; i < Canvas.BULDOZER_COUNTS; i++) {
        BULDOZERS.push({
            x: 0,
            y: 0
        })
    }
    switch (Canvas.algorithm) {
        case 0:
            while (!isComlpeted()) {
                for (const BULDOZER of BULDOZERS) {
                    moveBuldozer(BULDOZER)
                }
                await animate(Canvas.SHOW_ANIMATE, BULDOZERS,  Canvas.context)
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
    rerender()
    requestAnimationFrame(tick)
}