export function buildSiweMessage(address: string, nonce: string): string {
  return `LawIntel wants you to sign in with your wallet.\n\nNonce: ${nonce}`
}