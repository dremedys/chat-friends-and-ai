import { FC, PropsWithChildren } from 'react'
import { CustomFlowbiteTheme, Flowbite } from 'flowbite-react'

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return <Flowbite theme={{ theme: customTheme }}>{children}</Flowbite>
}

const customTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      default: 'bg-basic-purple hover:bg-purple-400 text-basic-white',
    },
  },
}
