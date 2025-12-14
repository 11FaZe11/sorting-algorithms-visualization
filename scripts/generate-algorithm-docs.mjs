import { algorithmDetails } from "../lib/algorithm-details.ts"

console.log("\n" + "=".repeat(80))
console.log("SORTING ALGORITHMS DOCUMENTATION".padStart(50))
console.log("=".repeat(80) + "\n")

Object.entries(algorithmDetails).forEach(([key, algo]) => {
  console.log(`\n${"─".repeat(80)}`)
  console.log(`${algo.emoji} ${algo.name.toUpperCase()} (${key})`)
  console.log(`${"─".repeat(80)}\n`)

  console.log("📝 DESCRIPTION:")
  console.log(`   ${algo.description}\n`)

  console.log("⏱️  COMPLEXITY ANALYSIS:")
  console.log(`   • Time Complexity: ${algo.complexity.time}`)
  console.log(`   • Space Complexity: ${algo.complexity.space}`)
  console.log(`   • Best Case: ${algo.complexity.best}`)
  console.log(`   • Worst Case: ${algo.complexity.worst}\n`)

  console.log("💡 USE CASES:")
  console.log(`   ${algo.useCase}\n`)

  console.log("📄 PSEUDOCODE:")
  console.log("─".repeat(40))
  console.log(algo.pseudocode)
  console.log("─".repeat(40) + "\n")

  console.log("💻 CODE IMPLEMENTATION (JavaScript):")
  console.log("─".repeat(40))
  console.log(algo.codeImplementation)
  console.log("─".repeat(40) + "\n")
})

console.log("\n" + "=".repeat(80))
console.log("END OF DOCUMENTATION".padCenter(50))
console.log("=".repeat(80) + "\n")
