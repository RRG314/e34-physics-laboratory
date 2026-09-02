import type { EvidenceStatus } from '../domain/model'

export function StatusBadge({ status }: { status: EvidenceStatus }) {
  return <span className={`status-badge status-${status.toLowerCase().replace('_', '-')}`}>{status.replace('_', ' ')}</span>
}
