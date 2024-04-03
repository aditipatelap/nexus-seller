/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.js'],
  theme: {
    screens: {
      'xs': {'min': '0px', 'max': '320px'},
      // => @media smallest

      'sm': {'min': '321px', 'max': '600px'},
      // => @media mobile

      'md': {'min': '601px', 'max': '768px'},
      // => @media tablet

      'lg': {'min': '769px', 'max': '1024px'},
      // => @media laptop

      'xl': {'min': '1025px', 'max': '1440px'},
      // => @media laptop larger

      '2xl': {'min': '1441px'},
      // => @media largest
      
    },
  },
  plugins: [],
}