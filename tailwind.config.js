/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{tsx,ts}"
  ],
  theme: {
    extend: {
      keyframes:{
        scroll:{
            '0%':{
              transform:"translateX(0px)",
            },
            '100%':{
              transform:"translateX(calc(-100px * 6))",
            }
        },
        smscroll:{
          '0%':{
            transform:"translateX(0px)",
          },
          '100%':{
            transform:"translateX(calc(-60px * 6))",
          }
        }
      },
      animation:{
        scroll:"scroll 12s linear infinite ",
        smscroll:"smscroll 12s linear infinite"
      }
    },
  },
  plugins: [],
}

