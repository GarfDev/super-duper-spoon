import type { LoaderFunctionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { createSeverClient } from '~/supabase.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  if (code) {
    const { supabase, headers } = createSeverClient(request)
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      return redirect('/sign-in')
    }
    return redirect('/dashboard', {
      headers,
    })
  }
  return new Response('Authentication failed', {
    status: 400,
  })
}
