type MATRIX = Array < Array < boolean >>

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

export {
    CELL,
    MOUSE,
    MATRIX
}