import { CELL } from '../utils/types'

export const rand = (array: Array < CELL > ): CELL => {
    const index: number = Math.floor(Math.random() * array.length)
    return array[index]
    // let k: number = Math.floor(Math.random() * (max - min) + min)
    // return (Math.round(k / Settings.CELL_SIZE) * Settings.CELL_SIZE)
}