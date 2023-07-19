export const PROVIDER_NAMES = [
  'Ethereum Name Service',
  'Lens Protocol Profiles',
  'Unstoppable Domains',
  'Proof of Attendance Protocol',
  'Snapshot: Proposer'
] as const;

export type ProviderName = typeof PROVIDER_NAMES[number];

export type Provider = {
  name: ProviderName | string,
  symbol: string,
  result: boolean
}
