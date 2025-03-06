
import {HeroUIProvider} from '@heroui/react'
import {ToastProvider} from "@heroui/toast";
import { ReactNode } from 'react';

interface Props {
  children: ReactNode
}

export default function Providers({children}: Props) {
  return (
    <HeroUIProvider>
      <ToastProvider />
      {children}
    </HeroUIProvider>
  )
}