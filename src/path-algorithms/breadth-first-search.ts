import {MATRIX, CELL} from '../utils/types'
import Canvas from '../components/canvas'
import animate from '../helpers/animate'

const paths: Array < Array < null | boolean | number >> = []
const route: Array < CELL > = []

export const breadtFirstSearch = async (matrix: MATRIX , {
    x: x1,
    y: y1
}: CELL, {
    x: x2,
    y: y2
}: CELL): Promise<Array<CELL>> => {

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

                // await animate(stack)
            }
        }
        
    }

    // let [x2, y2]: [number, number] = [y1, x1]
    let endRouteValue = Number(paths[y1][x1])
    while (endRouteValue !== 1) {
        await animate(route)
        
        endRouteValue--
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

    // Canvas.rerender()
    // route.map(({
    //     x,
    //     y
    // }: CELL) => {
    //     Canvas.context.beginPath()
    //     Canvas.context.rect(
    //         Canvas.CELL_SIZE + x * Canvas.CELL_SIZE,
    //         Canvas.CELL_SIZE + y * Canvas.CELL_SIZE,
    //         Canvas.CELL_SIZE, Canvas.CELL_SIZE)
    //     Canvas.context.fillStyle = "rgba(80,100,120, 0.5)"
    //     Canvas.context.fill()
    // })
    return route
}