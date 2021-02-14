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
    MOUSE   
}