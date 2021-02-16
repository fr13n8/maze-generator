export default class Settings{
    public COLUMNS_COUNT = 31
    public ROWS_COUNT = 31
    public PADDING = 20
    public CELL_SIZE = 20
    public WALL_COLOR = "black"
    public FREE_COLOR = "white"
    public BULDOZER_COLOR = "green"
    public DELAY_TIMEOUT = 0
    public SHOW_ANIMATE = true
    public BULDOZER_COUNTS = 1
    protected _ALGORITHM: number

    get algorithm(): number {
        return this._ALGORITHM
    }

    set algorithm(type: number) {
        this._ALGORITHM = type
    }
    
    changeColor(color: string): void {
        this.BULDOZER_COLOR = color
    }
    
    setBuldozersCount(count: number): void {
        this.BULDOZER_COUNTS = count
    }
}