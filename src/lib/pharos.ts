import { createPublicClient, http } from 'viem'
import { atlanticTestnet } from './chains'

/* ------------------------------------------------------------------ */
/*  Pharos Atlantic Testnet configuration (from your skill‑engine)     */
/* ------------------------------------------------------------------ */
const RPC_URL = 'https://atlantic.dplabs-internal.com'
const EXPLORER_API = 'https://api.socialscan.io/pharos-atlantic-testnet'

/* ------------------------------------------------------------------ */
/*  Public client – creation may fail, we handle it per‑call           */
/* ------------------------------------------------------------------ */
let publicClient: ReturnType<typeof createPublicClient> | null = null
try {
  publicClient = createPublicClient({
    chain: atlanticTestnet,
    transport: http(RPC_URL),
  })
} catch {
  // Client not available – all RPC calls will throw; we catch them individually
}

/* ------------------------------------------------------------------ */
/*  Public API                                                        */
/* ------------------------------------------------------------------ */

export async function getBalance(address: `0x${string}`) {
  if (!publicClient) {
    return { error: 'Pharos RPC unavailable' }
  }
  try {
    const balance = await publicClient.getBalance({ address })
    return { balance }
  } catch (e: any) {
    return { error: e.shortMessage || 'Balance check failed' }
  }
}

export async function simulateTransaction(tx: {
  from: `0x${string}`
  to: `0x${string}`
  data?: `0x${string}`
  value?: bigint
}) {
  if (!publicClient) {
    return { success: false, error: 'Pharos RPC unavailable' }
  }
  try {
    const result = await publicClient.call({
      account: tx.from,
      to: tx.to,
      data: tx.data || '0x',
      value: tx.value,
    })
    return { success: true, result, gasEstimate: '120000' }
  } catch (e: any) {
    return { success: false, error: e.shortMessage || 'Simulation failed' }
  }
}

/**
 * Analyse a contract on Pharos.
 * Checks explorer verification first, then falls back to on‑chain bytecode.
 * ALWAYS returns a risk score (0‑100) – if everything fails, risk score = 100.
 */
export async function analyzeContract(address: `0x${string}`) {
  let explorerError: string | null = null
  let rpcError: string | null = null

  // Try explorer verification API first
  try {
    const res = await fetch(
      `${EXPLORER_API}/api?module=contract&action=getabi&address=${address}`
    )
    if (res.ok) {
      const json = await res.json()
      if (json.status === '1' && json.result && json.result !== 'Contract source code not verified') {
        return {
          riskScore: 10,
          verified: true,
          warnings: ['Contract source code verified'],
          bytecodeSize: null,
          chainId: atlanticTestnet.id,
          explorerUrl: `https://atlantic.pharosscan.xyz/address/${address}`,
        }
      }
      // Explorer says not verified
      return {
        riskScore: 85,
        verified: false,
        warnings: ['Contract is NOT verified – source code is hidden'],
        bytecodeSize: null,
        chainId: atlanticTestnet.id,
        explorerUrl: `https://atlantic.pharosscan.xyz/address/${address}`,
      }
    }
    explorerError = `Explorer returned ${res.status}`
  } catch (e: any) {
    explorerError = e.message || 'Explorer unreachable'
  }

  // Explorer failed → try on‑chain bytecode check
  if (publicClient) {
    try {
      const code = await publicClient.getBytecode({ address })
      if (!code || code === '0x') {
        return {
          riskScore: 100,
          verified: false,
          warnings: ['No contract deployed at this address'],
          bytecodeSize: 0,
          chainId: atlanticTestnet.id,
          explorerUrl: `https://atlantic.pharosscan.xyz/address/${address}`,
        }
      }
      return {
        riskScore: 20,
        verified: false,
        warnings: ['Contract exists but verification status unknown (explorer unavailable)'],
        bytecodeSize: (code.length - 2) / 2,
        chainId: atlanticTestnet.id,
        explorerUrl: `https://atlantic.pharosscan.xyz/address/${address}`,
      }
    } catch (e: any) {
      rpcError = e.shortMessage || 'Bytecode check failed'
    }
  } else {
    rpcError = 'Pharos RPC unavailable'
  }

  // Both methods completely failed – return maximum risk with full error details
  const warnings = [
    `Explorer error: ${explorerError}`,
    `RPC error: ${rpcError}`,
  ]
  return {
    riskScore: 100,                       // highest possible risk
    verified: false,
    warnings,
    bytecodeSize: 0,
    chainId: atlanticTestnet.id,
    explorerUrl: `https://atlantic.pharosscan.xyz/address/${address}`,
  }
}

export { publicClient }