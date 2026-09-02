import type { Concept } from './model'

export function validateConceptGraph(concepts: Concept[]) {
  const ids = new Set(concepts.map((concept) => concept.id))
  const missing: string[] = []
  for (const concept of concepts) {
    for (const prerequisite of concept.prerequisites) {
      if (!ids.has(prerequisite)) missing.push(`${concept.id} -> ${prerequisite}`)
    }
  }

  const visiting = new Set<string>()
  const visited = new Set<string>()
  const cycles: string[][] = []
  const byId = Object.fromEntries(concepts.map((concept) => [concept.id, concept]))

  function visit(id: string, path: string[]) {
    if (visiting.has(id)) {
      const start = path.indexOf(id)
      cycles.push([...path.slice(start), id])
      return
    }
    if (visited.has(id)) return
    visiting.add(id)
    for (const prerequisite of byId[id]?.prerequisites ?? []) visit(prerequisite, [...path, id])
    visiting.delete(id)
    visited.add(id)
  }

  for (const concept of concepts) visit(concept.id, [])
  return { valid: missing.length === 0 && cycles.length === 0, missing, cycles }
}

export function isConceptAccessible(concept: Concept, mastered: string[]) {
  return concept.prerequisites.every((id) => mastered.includes(id))
}
