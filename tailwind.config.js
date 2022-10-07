const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',

    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                brand: {
                    100: '#5271FF', // Bright Purple
                    200: '#CE4A4A', // Red
                    300: '#07B7AE', // Aqua
                    400: '#07B756', // Green
                    500: '#363537', // Dark
                    600: '#C9C9C9', // Gray
                    700: '#E1E5F2', // Light Gray
                }
            },
            animation: {
                ring: 'ring 1.5s infinite',
            },
            keyframes: {
                ring: {
                    '10%': {
                        transform: 'rotate(10deg)',
                    },
                    '20%': {
                        transform: 'rotate(-10deg)',
                    },
                    '30%': {
                        transform: 'rotate(15deg)',
                    },
                    '40%': {
                        transform: 'rotate(-15deg)',
                    },
                    '50%': {
                        transform: 'rotate(18deg)',
                    },
                    '60%': {
                        transform: 'rotate(-18deg)',
                    },
                    '70%': {
                        transform: 'rotate(12deg)',
                    },
                    '80%': {
                        transform: 'rotate(-12deg)',
                    },
                    '90%': {
                        transform: 'rotate(2deg)',
                    },
                    '100%': {
                        transform: 'rotate(-2deg)',
                    },
                },
            },
        },
    },

    variants: {
        extends: {
            alignContent: ['responsive'],
            alignItems: ['responsive'],
            animation: ['responsive'],
            appearance: ['responsive'],
            backgroundColor: ['responsive', 'dark', 'group-hover', 'focus-within', 'hover', 'focus'],
            backgroundImage: ['responsive'],
            backgroundOpacity: ['responsive', 'group-hover', 'focus-within', 'hover', 'focus'],
            backgroundPosition: ['responsive'],
            backgroundRepeat: ['responsive'],
            backgroundSize: ['responsive'],
            borderCollapse: ['responsive'],
            borderColor: ['responsive', 'dark', 'group-hover', 'focus-within', 'hover', 'focus'],
            borderOpacity: ['responsive', 'group-hover', 'focus-within', 'hover', 'focus'],
            borderRadius: ['responsive', 'dark', 'focus', 'hover'],
            borderStyle: ['responsive', 'dark', 'focus', 'hover'],
            borderWidth: ['responsive', 'dark', 'focus', 'hover'],
            boxShadow: ['responsive', 'group-hover', 'focus-within', 'hover', 'focus'],
            boxSizing: ['responsive'],
            clear: ['responsive'],
            container: ['responsive'],
            cursor: ['responsive'],
            display: ['responsive'],
            divideColor: ['responsive', 'dark'],
            divideOpacity: ['responsive'],
            divideStyle: ['responsive'],
            divideWidth: ['responsive'],
            fill: ['responsive'],
            flex: ['responsive'],
            flexDirection: ['responsive'],
            flexGrow: ['responsive'],
            flexShrink: ['responsive'],
            flexWrap: ['responsive'],
            float: ['responsive'],
            fontFamily: ['responsive'],
            fontSize: ['responsive'],
            fontSmoothing: ['responsive'],
            fontStyle: ['responsive', 'hover'],
            fontVariantNumeric: ['responsive'],
            fontWeight: ['responsive'],
            gap: ['responsive'],
            gradientColorStops: ['responsive', 'dark', 'hover', 'focus'],
            gridAutoColumns: ['responsive'],
            gridAutoFlow: ['responsive'],
            gridAutoRows: ['responsive'],
            gridColumn: ['responsive'],
            gridColumnEnd: ['responsive'],
            gridColumnStart: ['responsive'],
            gridRow: ['responsive'],
            gridRowEnd: ['responsive'],
            gridRowStart: ['responsive'],
            gridTemplateColumns: ['responsive'],
            gridTemplateRows: ['responsive'],
            height: ['responsive'],
            inset: ['responsive'],
            justifyContent: ['responsive'],
            justifyItems: ['responsive'],
            justifySelf: ['responsive'],
            letterSpacing: ['responsive'],
            lineHeight: ['responsive'],
            listStylePosition: ['responsive'],
            listStyleType: ['responsive'],
            margin: ['responsive'],
            maxHeight: ['responsive'],
            maxWidth: ['responsive'],
            minHeight: ['responsive'],
            minWidth: ['responsive'],
            objectFit: ['responsive'],
            objectPosition: ['responsive'],
            opacity: ['responsive', 'group-hover', 'focus-within', 'hover', 'focus'],
            order: ['responsive'],
            outline: ['responsive', 'focus-within', 'focus'],
            overflow: ['responsive'],
            overscrollBehavior: ['responsive'],
            padding: ['responsive'],
            placeContent: ['responsive'],
            placeItems: ['responsive'],
            placeSelf: ['responsive'],
            placeholderColor: ['responsive', 'dark', 'focus'],
            placeholderOpacity: ['responsive', 'focus'],
            pointerEvents: ['responsive'],
            position: ['responsive'],
            resize: ['responsive'],
            ringColor: ['responsive', 'dark', 'focus-within', 'focus'],
            ringOffsetColor: ['responsive', 'dark', 'focus-within', 'focus'],
            ringOffsetWidth: ['responsive', 'focus-within', 'focus'],
            ringOpacity: ['responsive', 'focus-within', 'focus'],
            ringWidth: ['responsive', 'focus-within', 'focus'],
            rotate: ['responsive', 'hover', 'focus'],
            scale: ['responsive', 'hover', 'focus'],
            skew: ['responsive', 'hover', 'focus'],
            space: ['responsive'],
            stroke: ['responsive'],
            strokeWidth: ['responsive'],
            tableLayout: ['responsive'],
            textAlign: ['responsive'],
            textColor: ['responsive', 'dark', 'group-hover', 'focus-within', 'hover', 'focus'],
            textDecoration: ['responsive', 'group-hover', 'focus-within', 'hover', 'focus'],
            textOpacity: ['responsive', 'group-hover', 'focus-within', 'hover', 'focus'],
            textOverflow: ['responsive'],
            textTransform: ['responsive'],
            transform: ['responsive'],
            transformOrigin: ['responsive'],
            transitionDelay: ['responsive'],
            transitionDuration: ['responsive'],
            transitionProperty: ['responsive'],
            transitionTimingFunction: ['responsive'],
            translate: ['responsive', 'hover', 'focus'],
            userSelect: ['responsive'],
            verticalAlign: ['responsive'],
            visibility: ['responsive'],
            whitespace: ['responsive'],
            width: ['responsive'],
            wordBreak: ['responsive'],
            zIndex: ['responsive', 'focus-within', 'focus'],
        }
    },

    plugins: [require('@tailwindcss/forms')],
};
