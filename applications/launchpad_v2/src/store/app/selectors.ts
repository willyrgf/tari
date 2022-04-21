import { RootState } from '..'
import themes from '../../styles/themes'

export const selectExpertView = ({ app }: RootState) => app.expertView

export const selectView = ({ app }: RootState) => app.view

export const selectTheme = ({ app }: RootState) => app.theme

export const selectThemeConfig = ({ app }: RootState) => {
  return themes[app.theme]
}
