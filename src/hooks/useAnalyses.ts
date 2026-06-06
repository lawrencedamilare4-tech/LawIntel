import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/authStore'

export function useAnalyses() {
  const user = useAuthStore((s) => s.user)
  return useQuery({
    queryKey: ['analyses', user?.wallet_address],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('analyses')
        .select('*, simulations(*)')
        .eq('wallet_address', user!.wallet_address)
        .order('created_at', { ascending: false })
      if (error) throw error
      return data
    },
    enabled: !!user,
  })
}