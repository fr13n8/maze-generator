type CELL = {
    x: number,
    y: number
}

type MOUSE = {
    x: number
    y: number
    left: boolean
    pLeft: boolean
    over: boolean

    update: VoidFunction
}

const COLUMNS_COUNT: number = 11
const ROWS_COUNT: number = 11
const PADDING: number = 50
const CELL_SIZE: number = 50
const WALL_COLOR: string = 'black'
const FREE_COLOR: string = 'white'
const BULDOZER_COLOR: string = 'green'
const DELAY_TIMEOUT: number = 0
const SHOW_ANIMATE: boolean = false

const BULDOZER_COUNTS: number = 1

const BULDOZERS: Array<CELL> = []

let cell1: [number, number] = null
let cell2: [number, number] = null
let paths: Array<Array<null | boolean | number>> = []
let route: Array<[number, number]> = []

for (let i: number = 0; i < BULDOZER_COUNTS; i++) {
    BULDOZERS.push(
        {
            x: 0,
            y: 0
        }
    )
}

const rand = (array: Array<[number, number]>): [number, number] => {
    const index: number = Math.floor(Math.random() * array.length)
    return array[index]
    // let k: number = Math.floor(Math.random() * (max - min) + min)
    // return (Math.round(k / CELL_SIZE) * CELL_SIZE)
}

const createMatrix = (columns: number, rows: number): Array < Array < boolean >> => {
    const matrix: Array < Array < boolean >> = []
    for (let y: number = 0; y < rows; y++) {
        const row: Array < boolean > = []
        for (let x: number = 0; x < columns; x++) {
            row.push(false)
        }
        matrix.push(row)
    }
    matrix[0][0] = true
    return matrix
}

const matrix: Array < Array < boolean >> = createMatrix(COLUMNS_COUNT, ROWS_COUNT)

console.log(matrix)

const canvas: HTMLCanvasElement = document.createElement('canvas')
canvas.width = PADDING * 2 + COLUMNS_COUNT * CELL_SIZE
canvas.height = PADDING * 2 + ROWS_COUNT * CELL_SIZE
const canvasW: number = canvas.width
const canvasH: number = canvas.height
const context: CanvasRenderingContext2D = canvas.getContext('2d')

context.fillStyle = "black";
context.fillRect(0, 0, canvas.width, canvas.height);

document.body.appendChild(canvas)

const generateMaze = (): void => {
    for (let y: number = 0; y < COLUMNS_COUNT; y++) {
        for (let x: number = 0; x < ROWS_COUNT; x++) {
            const color: string = matrix[y][x] ? FREE_COLOR : WALL_COLOR

            context.beginPath()
            context.rect(
                PADDING + x * CELL_SIZE, 
                PADDING + y * CELL_SIZE,
                CELL_SIZE, CELL_SIZE)
            context.fillStyle = color
            context.fill()
        }
    }
}

const drawBuldozer = (BULDOZER: CELL): void => {
    context.beginPath()
    context.rect(
        PADDING + BULDOZER.x * CELL_SIZE, 
        PADDING + BULDOZER.y * CELL_SIZE,
        CELL_SIZE, CELL_SIZE)
    context.fillStyle = BULDOZER_COLOR
    context.fill()
}

const moveBuldozer = (BULDOZER: CELL): void => {
    const directions: Array<[number, number]> = []

    if ( BULDOZER.x > 0 ) directions.push([-2 , 0])
    if ( BULDOZER.x < COLUMNS_COUNT - 1 ) directions.push([2, 0])
    if ( BULDOZER.y > 0 ) directions.push([0 , -2])
    if ( BULDOZER.y < ROWS_COUNT - 1 ) directions.push([0, 2])

    const [dirX, dirY]: [number, number] = rand(directions)

    BULDOZER.x += dirX
    BULDOZER.y += dirY

    if (!matrix[BULDOZER.y][BULDOZER.x]) {
        matrix[BULDOZER.y][BULDOZER.x] = true
        matrix[BULDOZER.y - dirY / 2][BULDOZER.x - dirX / 2] = true
    }
}

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
    const mousedownHandler = (event: MouseEvent) : void => {
        mouse.left = true
    }
    const mouseupHandler = (event: MouseEvent) : void => {
        mouse.left = false
    }

    element.addEventListener('mouseenter', mouseenterHandler)
    element.addEventListener('mouseleave', mouseleaveHandler)
    element.addEventListener('mousemove', mousemoveHandler)
    element.addEventListener('mousedown', mousedownHandler)
    element.addEventListener('mouseup', mouseupHandler)

    return mouse
}

const mouse: MOUSE = createMouse(canvas)

const getPath = (matrix: Array < Array < boolean >>, [x1, y1]: [number, number], [x2, y2] : [number, number]): Array<Array<null | boolean | number>> => {
    const paths: Array<Array<null | boolean | number>> = []

    for (let y: number = 0; y < matrix.length; y++) {
        const row: Array<null | boolean> = []
        for (let x: number = 0; x < matrix[y].length; x++) {
            row.push(matrix[y][x] === false ? false : null)
        }

        paths.push(row)
    }

    paths[y2][x2] = 0

    while(paths[y1][x1] === null){

        for (let y: number = 0; y < matrix.length; y++) {
            for (let x: number = 0; x < matrix[y].length; x++) {
                if(paths[y][x] === false || paths[y][x] === null) {
                    continue
                }

                const count: number = +paths[y][x] + 1

                if(y > 0 && paths[y - 1][x] !== false) {
                    if(paths[y - 1][x] !== null) {
                        paths[y - 1][x] = Math.min(+paths[y - 1][x], count)
                    } else {
                        paths[y - 1][x] = count
                    }
                }
                if(y < matrix.length - 1 && paths[y + 1][x] !== false) {
                    if(paths[y + 1][x] !== null) {
                        paths[y + 1][x] = Math.min(+paths[y + 1][x], count)
                    } else {
                        paths[y + 1][x] = count
                    }
                }
                if(x < matrix[0].length - 1 && paths[y][x + 1] !== false) {
                    if(paths[y][x + 1] !== null) {
                        paths[y][x + 1] = Math.min(+paths[y][x + 1], count)
                    } else {
                        paths[y][x + 1] = count
                    }
                }
                if(x > 0 && paths[y][x - 1] !== false) {
                    if(paths[y][x - 1] !== null) {
                        paths[y][x - 1] = Math.min(+paths[y][x - 1], count)
                    } else {
                        paths[y][x - 1] = count
                    }
                }
            }
        }
    }

    // let [x2, y2]: [number, number] = [y1, x1]
        let endRouteValue: number = +paths[y1][x1] 
        route = [[y1, x1]]

        while(endRouteValue !== 0) {
            endRouteValue--
            console.log(y1, x1, endRouteValue)
            if(y1 > 0 && paths[y1 - 1][x1] === endRouteValue) {
                route.push([y1 - 1, x1])
                y1--
                continue
            }
            if(y1 < ROWS_COUNT - 1 && paths[y1 + 1][x1] === endRouteValue) {
                route.push([y1 + 1, x1])
                y1++
                continue
            }
            if(x1 < COLUMNS_COUNT - 1 && paths[y1][x1 + 1] === endRouteValue) {
                route.push([y2, x1 + 1])
                x1++
                continue
            }
            if(x1 > 0 && paths[y1][x1 - 1] === endRouteValue) {
                route.push([y1, x1 - 1])
                x1--
                continue
            }
        }
    // console.log(paths)
    return paths
}

const tick = (): void => {
    requestAnimationFrame(tick)
    
    if (
        mouse.x < PADDING || 
        mouse.y < PADDING || 
        mouse.x > canvasW - PADDING || 
        mouse.y > canvasH - PADDING
        ) {
        return 
    }

    const x: number = Math.floor((mouse.x - PADDING) / CELL_SIZE)
    const y: number = Math.floor((mouse.y - PADDING) / CELL_SIZE)

    if(mouse.left && !mouse.pLeft && matrix[y][x]) {
        if(!cell1 || cell1[0] != x || cell1[1] != y) {
            cell2 = cell1
            cell1 = [x, y]
            console.log(cell1, cell2)
        }

        if(cell1 && cell2) {
            paths = getPath(matrix, cell1, cell2)
        }

        if(paths) {
            for(let y: number = 0; y < paths.length; y++) {
                paths[y].map((item: boolean | null | number, x: number) => {
                    
                    if( item !== null && item !== false) {
                        context.fillStyle = "red"
                        context.font = "30px serif"
                        context.textAlign = "center"
                        context.textBaseline = "middle"
                        context.fillText(
                            paths[y][x].toString(),
                            PADDING + x * CELL_SIZE + CELL_SIZE * 0.5,
                            PADDING + y * CELL_SIZE + CELL_SIZE * 0.5
                        )
                    }
                })
            }
        }
        console.log(paths)
        console.log(route)
        // route.map(([y, x]: [number, number]) => {
        //     context.beginPath()
        //     context.rect(
        //         PADDING + x * CELL_SIZE, 
        //         PADDING + y * CELL_SIZE,
        //         CELL_SIZE, CELL_SIZE)
        //     context.fillStyle = "blue"
        //     context.fill()
        // })

    }

    mouse.update()
}

const isComlpeted = (): boolean => {
    for (let y: number = 0; y < COLUMNS_COUNT; y += 2) {
        for(let x: number = 0; x < ROWS_COUNT; x += 2) {
            if (!matrix[y][x]) return false
        }
    }

    return true
}

const delay = (timeout: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, timeout))
}

const main = async () => {
    while(!isComlpeted()) {
        for (const BULDOZER of BULDOZERS) {
            moveBuldozer(BULDOZER)
        }
        if(SHOW_ANIMATE) {
            generateMaze()
            for (const BULDOZER of BULDOZERS) {
                drawBuldozer(BULDOZER)
            }
            await delay(DELAY_TIMEOUT)
        }
    }
    generateMaze()
    requestAnimationFrame(tick)
}

main()