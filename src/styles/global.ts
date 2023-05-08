import {globalCss} from '../styles'

export const globalStyles = globalCss({
    '*': {
        margin: 0,
        padding: 0,
    },

    body: {
        backgroundColor: '$primary',
        color: '$gray100',
        'webkit-font-smoothing': 'antialiased',
    },

    'body, input, textarea, button,': {
        fontFamily: 'Roboto',
        fontWeight: '400',
    }
})