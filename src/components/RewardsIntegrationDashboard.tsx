'use client';

import React, { useEffect, useState, Suspense } from 'react';
import dynamic from "next/dynamic";
const Avatar3D = dynamic(() => import("@/components/Avatar3D"), { ssr: false });


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import '@/styles/cyberpunk.css';



// Mock data
const fetchTokenBalances = async () => ({
  GreenPoints: 1200,
  CIVIQ: 350,
  USDC: 45.75,
});

const fetchNFTs = async () => [
  {
    id: '1',
    name: 'CitizenNFT #457',
    image: '/images/citizen457.png',
    type: 'Citizen',
  },
  {
    id: '2',
    name: 'StructureNFT #102',
    image: '/images/structure102.png',
    type: 'Structure',
  },
];

const fetchTransactionHistory = async () => [
  {
    id: 'tx1',
    date: '2025-04-15',
    type: 'Mint',
    token: 'GreenPoints',
    amount: 500,
    status: 'Confirmed',
  },
  {
    id: 'tx2',
    date: '2025-04-16',
    type: 'Bridge',
    token: 'USDC',
    amount: -10,
    status: 'Completed',
  },
];

export default function RewardsIntegrationDashboard() {
  const [balances, setBalances] = useState<Record<string, number>>({});
  const [nfts, setNfts] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [bridgeAsset, setBridgeAsset] = useState('GreenPoints');
  const [fromChain, setFromChain] = useState('Monad');
  const [toChain, setToChain] = useState('Base');

  useEffect(() => {
    async function loadData() {
      setBalances(await fetchTokenBalances());
      setNfts(await fetchNFTs());
      setTransactions(await fetchTransactionHistory());
    }
    loadData();
  }, []);

  const handleBridge = () => {
    alert(`Bridging ${bridgeAsset} from ${fromChain} to ${toChain}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white cyberpunk-cursor font-orbitron">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 p-6">

        {/* Leaderboard */}
        <motion.div
          className="md:col-span-1 tile glassmorph"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
        >
          <Card className="bg-black/40 border-l-4 border-emerald-400 shadow-emerald">
            <CardHeader>
              <CardTitle className="text-emerald-300 text-xl">🏆 Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>1. Aaryan (1500 pts)</li>
                <li>2. Neha (1320 pts)</li>
                <li>3. Zaid (1255 pts)</li>
                <li>4. Mira (1210 pts)</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Center section */}
        <div className="md:col-span-3 space-y-6">
          <motion.div
            className="text-4xl font-bold text-cyan-300 drop-shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Civic Quest: <span className="text-yellow-400">Rebuild the Future</span>
          </motion.div>

          {/* Token Wallet Summary */}
          <motion.div
            className="tile glassmorph"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 1.1 }}
          >
            <Card className="bg-black/40 border-l-4 border-fuchsia-500 shadow-fuchsia">
              <CardHeader>
                <CardTitle className="text-fuchsia-400">Token Wallet Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Token</TableHead>
                      <TableHead>Balance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(balances).map(([token, amount]) => (
                      <TableRow key={token}>
                        <TableCell>{token}</TableCell>
                        <TableCell>{amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Button className="mt-4 glow-btn">View Full Activity</Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* NFT Gallery */}
          <motion.div
            className="tile glassmorph"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1.2 }}
          >
            <Card className="bg-black/40 border-l-4 border-yellow-400 shadow-yellow">
              <CardHeader>
                <CardTitle className="text-yellow-300">NFT Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {nfts.map((nft) => (
                    <div key={nft.id} className="border border-yellow-500 p-2 rounded-xl bg-yellow-100/10">
                      <img src={nft.image} alt={nft.name} className="w-full h-32 object-cover rounded-lg" />
                      <h3 className="mt-2 font-semibold text-yellow-200">{nft.name}</h3>
                      <p className="text-sm text-yellow-300">Type: {nft.type}</p>
                      <Button size="sm" className="mt-2 glow-btn">Transfer</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Transaction History */}
          <motion.div
            className="tile glassmorph"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.2 }}
          >
            <Card className="bg-black/40 border-l-4 border-sky-400 shadow-sky">
              <CardHeader>
                <CardTitle className="text-sky-300">Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
            
                <Table className="mt-4">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Token</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((tx) => (
                      <TableRow key={tx.id}>
                        <TableCell>{tx.date}</TableCell>
                        <TableCell>{tx.type}</TableCell>
                        <TableCell>{tx.token}</TableCell>
                        <TableCell>{tx.amount}</TableCell>
                        <TableCell>{tx.status || '—'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right column: Avatar */}
        <motion.div
          className="md:col-span-1 tile glassmorph"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 1.1 }}
        >
          <Card className="bg-black/40 border-l-4 border-cyan-400 shadow-cyan">
            <CardHeader>
              <CardTitle className="text-cyan-300">Your Cyber Avatar</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <Suspense fallback={<p className="text-white">Loading Avatar...</p>}>
                <Avatar3D />
              </Suspense>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
