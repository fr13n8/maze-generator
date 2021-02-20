import Canvas from '../components/canvas'
const Pickr = require('@simonwep/pickr')!
// import * as Pickr from '@simonwep/pickr';

const pickr = Pickr.create({
    el: '#color-picker',
    theme: 'nano', // or 'monolith', or 'nano',
    default: Canvas.BULDOZER_COLOR,
    components: {

        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
            hex: true,
            input: true,
            clear: true,
            save: true
        }
    }
})

pickr.on('save', (color: any, instance: any) => {
    console.log('Event: "save"', color, instance)
    Canvas.changeColor(color.toHEXA())
})

export default pickr