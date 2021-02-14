const Pickr = require('@simonwep/pickr');

const pickr = Pickr.create({
    el: '#color-picker',
    theme: 'nano', // or 'monolith', or 'nano'
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
});

pickr.on('init', (instance: any) => {
    console.log('Event: "init"', instance);
}).on('hide', (instance: any) => {
    console.log('Event: "hide"', instance);
}).on('show', (color: string, instance: any) => {
    console.log('Event: "show"', color, instance);
}).on('save', (color: string, instance: any) => {
    console.log('Event: "save"', color, instance);
}).on('clear', (instance: any) => {
    console.log('Event: "clear"', instance);
}).on('change', (color: string, source: any, instance: any) => {
    console.log('Event: "change"', color, source, instance);
}).on('changestop', (source: any, instance: any) => {
    console.log('Event: "changestop"', source, instance);
}).on('cancel', (instance: any) => {
    console.log('Event: "cancel"', instance);
}).on('swatchselect', (color: string, instance: any) => {
    console.log('Event: "swatchselect"', color, instance);
});

export default pickr