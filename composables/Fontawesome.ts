import { library, IconDefinition } from '@fortawesome/fontawesome-svg-core'

export const fontawesome = (icons: IconDefinition[]) => {
  icons.forEach(icon => library.add(icon))
}
