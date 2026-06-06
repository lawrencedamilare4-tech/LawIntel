# LawIntel

**AI‑powered onchain transaction intelligence for the Pharos network.**  
Simulate, analyze, and understand blockchain transactions before you sign — no code, no risk.

![License](https://img.shields.io/badge/license-MIT-blue)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

---

## ✨ Features

- 🔍 **Intent Parsing** – Describe a transaction in plain English; AI extracts the details (recipient, amount, token).
- 🛡️ **Risk Engine** – Detects unlimited approvals, unverified contracts, large transfers, and more.
- 📋 **Plain‑English Explanations** – Each simulation comes with a human‑readable risk report.
- 🔗 **Contract Analyzer** – Checks verification status, bytecode, and links to Pharosscan.
- 💰 **Wallet Dashboard** – View native PHRS/PROS and ERC‑20 token balances.
- 📊 **Batch Balance Checker** – Check balances for multiple addresses at once.
- 🪄 **Airdrop Simulation** – Test batch token transfers before executing.
- 📡 **Live Transaction Feed** – See recent transactions for your wallet.
- 📜 **Script Export** – Generate ready‑to‑run Web3 scripts (Viem) from your analysis.
- 🔐 **Wallet‑Based Authentication** – Connect your wallet and sign a message; no backend required.

---

## 🚀 Tech Stack

| Layer               | Technology                                      |
|---------------------|-------------------------------------------------|
| Frontend            | React 19, TypeScript, Vite                      |
| Styling             | Tailwind CSS (minimal, flat design)             |
| Blockchain          | Wagmi, Viem, RainbowKit                         |
| State Management    | Zustand                                         |
| Data Fetching       | React Query                                     |
| Database            | Supabase (Postgres)                             |
| AI                  | DeepSeek / Groq (llama‑3.1‑8b‑instant)         |
| Blockchain Data     | Pharos Skill Engine (RPC + Explorer API)        |

---

## 📋 Prerequisites

Before running the project, ensure you have:

- Node.js 18+ and npm/yarn
- A [Supabase](https://supabase.com) project (free tier works)
- A [Reown (WalletConnect)](https://cloud.reown.com) Project ID
- A [Groq](https://console.groq.com) API key (or DeepSeek) for AI features
- The Pharos network RPC and explorer endpoints (already configured)

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/lawintel.git
cd lawintel