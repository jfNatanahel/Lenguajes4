import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
/*
Cuando deployás en GitHub Pages, tu proyecto no se carga desde la raíz (/), sino desde una subcarpeta con el nombre de tu repo.
Por eso hay que agregar la propiedad base.
*/
export default defineConfig({
  plugins: [react()],
  base: '/Lenguajes4/',
})
