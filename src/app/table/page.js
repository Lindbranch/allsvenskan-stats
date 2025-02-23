import Image from "next/image";
import * as React from "react";
import Link from 'next/link';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"



async function fetchTable() {
  const res = await fetch('https://allsvenskan.se/data-endpoint/statistics/standings/2024/total');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const response = await res.json();
  return response;
}

export default async function Home() {
  const table = await fetchTable();

  return (
    <div className="flex justify-center">
      <div className="w-full md:w-1/2">
        <Table className="text-white shadow-lg shadow-yellow-500/50">
          <TableHeader>
            <TableRow className="bg-black">
              <TableHead></TableHead>
              <TableHead>Namn</TableHead>
              <TableHead>GP</TableHead>
              <TableHead>W</TableHead>
              <TableHead>T</TableHead>
              <TableHead>L</TableHead>
              <TableHead>GF</TableHead>
              <TableHead>GA</TableHead>
              <TableHead>GD</TableHead>
              <TableHead>P</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(table).map(([key, team]) => (
              <TableRow
                key={key}
                className={`
                ${team.position === 1 ? 'bg-custom-gray-1' : ''}
                ${team.position === 2 ? 'bg-custom-gray-2' : ''}
                ${team.position === 3 ? 'bg-custom-gray-3' : ''}
                ${team.position === 14 ? 'bg-custom-red-1' : ''}
                ${team.position >= 15 ? 'bg-custom-red-2' : ''}
              `}
              >
                <TableCell>{team.position}</TableCell>
                <TableCell>{team.teamAbbrv}</TableCell>
                {team.stats?.map((stat) => (
                  <TableCell key={stat.name}>{stat.value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>

  );
}
