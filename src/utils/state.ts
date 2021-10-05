export default class Settings{

    public COLUMNS_COUNT = 9 //71
    public ROWS_COUNT = 9  //29
    public CELL_SIZE = 20
    public WALL_COLOR = "#A69F9C"
    public FREE_COLOR = "white"
    public BULDOZER_COLOR = "#89DDFF"
    public DELAY_TIMEOUT = 0
    public SHOW_ANIMATE = true
    public BULDOZER_COUNTS = 1
    public _MAZE_ALGORITHM: number
    public _PATH_ALGORITHM: number

    get mazeAlgorithm(): number {
        return this._MAZE_ALGORITHM
    }

    set mazeAlgorithm(type: number) {
        this._MAZE_ALGORITHM = type
    }
    
    get pathAlgorithm(): number {
        return this._PATH_ALGORITHM
    }

    set pathAlgorithm(type: number) {
        this._PATH_ALGORITHM = type
    }

    changeColor(color: string): void {
        this.BULDOZER_COLOR = color
    }
    
    setBuldozersCount(count: number): void {
        this.BULDOZER_COUNTS = count
    }

    setShowAnimation(status: boolean): void {
        this.SHOW_ANIMATE = status
        console.log(this.SHOW_ANIMATE)
    }

    setAnimationDelay(delay: number): void {
        this.DELAY_TIMEOUT = delay
    }
}